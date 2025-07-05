import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CookieConsentComponent } from "./components/cookie-consent/cookie-consent.component";
import { CommonModule } from '@angular/common';
import { LanguageService } from './services/language.service';
import { environment } from '../environments/environment.prod';
import { SwUpdate } from '@angular/service-worker';

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
  maintenanceMode = environment.maintenanceMode;
  private updates = inject(SwUpdate);

  prepareRoute = (outlet: RouterOutlet) => outlet?.activatedRouteData?.['animation'];

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {
    // Handle install prompt
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
      this.deferredPrompt = event;

      if (!this.isAppInstalled()) {
        this.showInstallBanner = true;
      }
    });

    // Mark app as installed
    window.addEventListener('appinstalled', () => {
      localStorage.setItem('pwaInstalled', 'true');
    });
  }

  ngOnInit(): void {
    // ✅ Maintenance mode redirect (for PWA installs or direct hits)
    if (this.maintenanceMode && this.router.url !== '/maintenance') {
      this.router.navigate(['/maintenance']);
      return;
    }

    // ✅ PWA version update prompt
    if (this.updates.isEnabled) {
      this.updates.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
          if (confirm('🔄 A new version is available. Reload to update?')) {
            this.updates.activateUpdate().then(() => document.location.reload());
          }
        }
      });
    }

    // 🌐 Load preferred language
    const lang = localStorage.getItem('lang');
    if (lang) {
      this.languageService.useLanguage(lang);
    }

    // 🧹 Clean old install flag if app is no longer installed
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
