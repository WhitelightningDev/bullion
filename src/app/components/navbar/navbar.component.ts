import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  Renderer2,
  AfterViewInit,
  OnInit,
  DestroyRef,
  inject
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterpopupComponent } from '../../popups/registerpopup/registerpopup.component';
import { LanguageCode, LanguageService } from '../../services/language.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit, OnInit {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  @ViewChild('languageDropdownButton') languageDropdownButton!: ElementRef<HTMLButtonElement>;

  showFloatingRegister = false;
  currentLang: LanguageCode = 'en';

  flagMap = {
    en: 'flags/gb.png',
    af: 'flags/za.png'
  };

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private renderer: Renderer2,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.currentLang = this.languageService.getCurrentLanguage();

    this.languageService.currentLang$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lang) => (this.currentLang = lang));
  }

  ngAfterViewInit(): void {
    if (!this.navbarCollapse) return;

    const collapseEl = this.navbarCollapse.nativeElement;

    // Collapse on nav-link click (but skip dropdown toggles)
    const navLinks = collapseEl.querySelectorAll('.nav-link');
    navLinks.forEach((link: HTMLElement) => {
      this.renderer.listen(link, 'click', () => {
        const isDropdownToggle = link.classList.contains('dropdown-toggle');
        if (!isDropdownToggle) {
          this.closeNavbar();
        }
      });
    });

    // Collapse when dropdown-item is clicked
    const dropdownItems = collapseEl.querySelectorAll('.dropdown-item');
    dropdownItems.forEach((item: HTMLElement) => {
      this.renderer.listen(item, 'click', () => this.closeNavbar());
    });
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    if (!this.navbarCollapse) return;

    const collapseEl = this.navbarCollapse.nativeElement;
    const clickedInside = collapseEl.contains(event.target);
    const isExpanded = collapseEl.classList.contains('show');

    if (isExpanded && !clickedInside) {
      this.closeNavbar();
    }
  }

  closeNavbar() {
    if (!this.navbarCollapse) return;

    const collapseEl = this.navbarCollapse.nativeElement;
    if (collapseEl.classList.contains('show')) {
      const collapse = new bootstrap.Collapse(collapseEl);
      collapse.hide();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showFloatingRegister = scrollTop > 150;
  }

  openRegisterPopup() {
    const popup = document.querySelector('app-registerpopup') as any;
    if (popup?.open) {
      popup.open();
    }
  }

  switchLang(lang: 'en' | 'af') {
    this.languageService.setLanguage(lang);
    this.closeLanguageDropdown();
  }

  private closeLanguageDropdown(): void {
    try {
      const btn = this.languageDropdownButton?.nativeElement;
      if (!btn) return;
      const dropdown = bootstrap.Dropdown.getInstance(btn) ?? bootstrap.Dropdown.getOrCreateInstance(btn);
      dropdown?.hide?.();
    } catch {
      // no-op: bootstrap might not be available in some test environments
    }
  }
}
