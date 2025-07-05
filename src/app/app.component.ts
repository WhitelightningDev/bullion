import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CookieConsentComponent } from "./components/cookie-consent/cookie-consent.component";
import { CommonModule } from '@angular/common';
import { LanguageService } from './services/language.service';
import { environment } from './environments/environment';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, CookieConsentComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bullion';
  deferredPrompt: any = null;
  showInstallBanner = false;

  prepareRoute = (outlet: RouterOutlet) => outlet?.activatedRouteData?.['animation'];

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {
    // Handle PWA install prompt
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
      this.deferredPrompt = event;

      if (!this.isAppInstalled()) {
        this.showInstallBanner = true;
      }
    });

    // Handle PWA installed event
    window.addEventListener('appinstalled', () => {
      localStorage.setItem('pwaInstalled', 'true');
    });
  }

  ngOnInit(): void {
    // 🔁 Redirect if site is in maintenance mode
    if (environment.maintenanceMode && this.router.url !== '/maintenance') {
      this.router.navigate(['/maintenance']);
      return;
    }

    // 🌐 Persisted language preference
    const lang = localStorage.getItem('lang');
    if (lang) {
      this.languageService.useLanguage(lang);
    }

    // Clean up stale install flag
    if (!this.isAppInstalled() && localStorage.getItem('pwaInstalled') === 'true') {
      localStorage.removeItem('pwaInstalled');
    }
  }

  installPWA() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        localStorage.setItem('pwaInstalled', 'true');
        this.showInstallBanner = false;
      }
      this.deferredPrompt = null;
    });
  }

  dismissInstallBanner() {
    this.showInstallBanner = false;
  }

  private isAppInstalled(): boolean {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIosStandalone = (window.navigator as any).standalone === true;
    const localFlag = localStorage.getItem('pwaInstalled') === 'true';
    return (isStandalone || isIosStandalone) && localFlag;
  }
}
