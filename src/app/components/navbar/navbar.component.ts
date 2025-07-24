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

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RegisterpopupComponent, CommonModule, TranslateModule],
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
    // Initialize language from saved or default
    const savedLang = localStorage.getItem('preferredLang') as 'en' | 'af' | null;
    this.currentLang = savedLang ?? 'en';
    this.translate.use(this.currentLang);
  }

  ngAfterViewInit(): void {
  if (!this.navbarCollapse) return;

  const navLinks = this.navbarCollapse.nativeElement.querySelectorAll('.nav-link');
  navLinks.forEach((link: HTMLElement) => {
    this.renderer.listen(link, 'click', () => this.closeNavbar());
  });
}


  @HostListener('document:click', ['$event'])
 handleDocumentClick(event: Event) {
  if (!this.navbarCollapse) return;

  const clickedInside = this.navbarCollapse.nativeElement.contains(event.target);
  const isExpanded = this.navbarCollapse.nativeElement.classList.contains('show');

  if (isExpanded && !clickedInside) {
    this.closeNavbar();
  }
}

  closeNavbar() {
  if (!this.navbarCollapse) return;

  const collapseEl = this.navbarCollapse.nativeElement;
  if (collapseEl.classList.contains('show')) {
    const collapse = new (window as any).bootstrap.Collapse(collapseEl);
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
