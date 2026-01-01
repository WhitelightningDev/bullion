import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CookieConsentComponent } from "./components/cookie-consent/cookie-consent.component";
import { CommonModule } from '@angular/common';
import { LanguageService } from './services/language.service';
import { environment } from '../environments/environment.prod';
import { SwUpdate } from '@angular/service-worker';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, CookieConsentComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bullion';
  deferredPrompt: BeforeInstallPromptEvent | null = null;
  showInstallBanner = false;
  maintenanceMode = environment.maintenanceMode;
  private readonly installFlagKey = 'pwaInstalled';
  private updates = inject(SwUpdate);

  prepareRoute = (outlet: RouterOutlet) => outlet?.activatedRouteData?.['animation'];

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {
    this.syncInstallState();

    // Handle install prompt
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      if (this.isAppInstalled()) return;

      event.preventDefault();
      this.deferredPrompt = event as BeforeInstallPromptEvent;
      localStorage.removeItem(this.installFlagKey);
      this.showInstallBanner = true;
    });

    // Mark app as installed
    window.addEventListener('appinstalled', () => {
      this.markAsInstalled();
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

    this.syncInstallState();
  }

  installPWA() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        this.markAsInstalled();
      }
      this.deferredPrompt = null;
    });
  }

  dismissInstallBanner() {
    this.showInstallBanner = false;
  }

  private isAppInstalled(): boolean {
    return this.isRunningStandalone() || localStorage.getItem(this.installFlagKey) === 'true';
  }

  private isRunningStandalone(): boolean {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
    const isMinimalUi = window.matchMedia('(display-mode: minimal-ui)').matches;
    const isIosStandalone = (window.navigator as any).standalone === true;
    return isStandalone || isFullscreen || isMinimalUi || isIosStandalone;
  }

  private syncInstallState() {
    if (this.isRunningStandalone()) {
      this.markAsInstalled();
    }
  }

  private markAsInstalled() {
    localStorage.setItem(this.installFlagKey, 'true');
    this.showInstallBanner = false;
    this.deferredPrompt = null;
  }
}
