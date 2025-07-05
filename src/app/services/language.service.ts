import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private defaultLang = 'en';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'af']);
    const storedLang = localStorage.getItem('lang');
    const browserLang = this.translate.getBrowserLang();

    const selectedLang = storedLang || (browserLang?.match(/en|af/) ? browserLang : this.defaultLang);
    this.useLanguage(selectedLang);
  }

  useLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.defaultLang;
  }
}
