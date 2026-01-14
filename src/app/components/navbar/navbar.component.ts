import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  Renderer2,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RegisterpopupComponent } from '../../popups/registerpopup/registerpopup.component';

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

  showFloatingRegister = false;
  currentLang: 'en' | 'af' = 'en';

  flagMap = {
    en: 'https://flagcdn.com/16x12/gb.png',
    af: 'https://flagcdn.com/16x12/za.png'
  };

  constructor(
    private renderer: Renderer2,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    const savedLang = localStorage.getItem('preferredLang') as 'en' | 'af' | null;
    this.currentLang = savedLang ?? 'en';
    this.translate.use(this.currentLang);
  }

  ngAfterViewInit(): void {
    if (!this.navbarCollapse) return;

    const collapseEl = this.navbarCollapse.nativeElement;

    // Initialize dropdowns manually
    const dropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');
    dropdownToggles.forEach((toggle) => {
      new bootstrap.Dropdown(toggle);
    });

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
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('preferredLang', lang);
  }
}
