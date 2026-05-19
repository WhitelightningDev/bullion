import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { catchError, finalize, take } from 'rxjs/operators';

export const SUPPORTED_LANGS = ['en', 'af'] as const;
export type LanguageCode = (typeof SUPPORTED_LANGS)[number];

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly defaultLang: LanguageCode = 'en';
  private readonly storageKey = 'lang';
  private readonly legacyStorageKeys = ['preferredLang'] as const;

  private readonly currentLangSubject = new BehaviorSubject<LanguageCode>(this.defaultLang);
  readonly currentLang$ = this.currentLangSubject.asObservable();

  private isPrefetching = false;

  constructor(private translate: TranslateService) {
    this.translate.addLangs([...SUPPORTED_LANGS]);
    this.translate.setDefaultLang(this.defaultLang);

    const storedLang = this.getStoredLanguage();
    const browserLang = this.translate.getBrowserLang();

    const selectedLang =
      storedLang ??
      (this.isSupportedLanguage(browserLang) ? (browserLang as LanguageCode) : this.defaultLang);

    this.setLanguage(selectedLang);
  }

  setLanguage(lang: LanguageCode): void {
    if (!this.isSupportedLanguage(lang)) {
      lang = this.defaultLang;
    }

    const alreadyActive = this.translate.currentLang === lang;
    this.currentLangSubject.next(lang);
    this.persistLanguage(lang);
    this.setDocumentLanguage(lang);

    if (alreadyActive) {
      this.prefetchOtherLanguages(lang);
      return;
    }

    this.translate
      .use(lang)
      .pipe(take(1))
      .subscribe({
        next: () => this.prefetchOtherLanguages(lang),
        error: (err) => console.error(`Failed to load language '${lang}':`, err)
      });
  }

  getCurrentLanguage(): LanguageCode {
    const current = this.translate.currentLang;
    if (this.isSupportedLanguage(current)) return current;
    return this.currentLangSubject.value || this.defaultLang;
  }

  private isSupportedLanguage(lang?: string | null): lang is LanguageCode {
    return !!lang && (SUPPORTED_LANGS as readonly string[]).includes(lang);
  }

  private getStoredLanguage(): LanguageCode | null {
    const value = localStorage.getItem(this.storageKey);
    if (this.isSupportedLanguage(value)) return value;

    for (const legacyKey of this.legacyStorageKeys) {
      const legacyValue = localStorage.getItem(legacyKey);
      if (this.isSupportedLanguage(legacyValue)) {
        localStorage.setItem(this.storageKey, legacyValue);
        localStorage.removeItem(legacyKey);
        return legacyValue;
      }
    }

    return null;
  }

  private persistLanguage(lang: LanguageCode): void {
    localStorage.setItem(this.storageKey, lang);
  }

  private setDocumentLanguage(lang: LanguageCode): void {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang;
  }

  private prefetchOtherLanguages(current: LanguageCode): void {
    if (this.isPrefetching) return;

    const others = SUPPORTED_LANGS.filter((l) => l !== current);
    if (others.length === 0) return;

    this.isPrefetching = true;
    forkJoin(
      others.map((lang) =>
        this.translate.getTranslation(lang).pipe(
          take(1),
          catchError(() => of(null))
        )
      )
    )
      .pipe(finalize(() => (this.isPrefetching = false)))
      .subscribe();
  }
}
