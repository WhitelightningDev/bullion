import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CookieConsentComponent } from "./components/cookie-consent/cookie-consent.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, CookieConsentComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bullion';

  deferredPrompt: any = null; // store the beforeinstallprompt event
  showInstallBanner = false;  // show/hide the install banner

  prepareRoute = (outlet: RouterOutlet) => outlet?.activatedRouteData?.['animation'];

  constructor() {
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
      this.deferredPrompt = event;

      if (!this.isAppInstalled()) {
        this.showInstallBanner = true;
      }
    });

    // If app is installed, update localStorage
    window.addEventListener('appinstalled', () => {
      console.log('PWA installed');
      localStorage.setItem('pwaInstalled', 'true');
    });
  }

  ngOnInit(): void {
    // On load, check if the app is no longer installed but localStorage says it is
    if (!this.isAppInstalled() && localStorage.getItem('pwaInstalled') === 'true') {
      localStorage.removeItem('pwaInstalled');
    }
  }

  installPWA() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        localStorage.setItem('pwaInstalled', 'true');
        this.showInstallBanner = false;
      } else {
        console.log('User dismissed the install prompt');
        // Still show banner if user dismisses
      }
      this.deferredPrompt = null;
    });
  }

  dismissInstallBanner() {
    this.showInstallBanner = false; // User manually dismissed the banner
  }

  private isAppInstalled(): boolean {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIosStandalone = (window.navigator as any).standalone === true;
    const localFlag = localStorage.getItem('pwaInstalled') === 'true';
    return (isStandalone || isIosStandalone) && localFlag;
  }
}
