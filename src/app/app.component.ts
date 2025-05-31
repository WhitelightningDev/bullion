import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CookieConsentComponent } from "./components/cookie-consent/cookie-consent.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent, CookieConsentComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // note: styleUrls (plural) instead of styleUrl
})
export class AppComponent {
  title = 'bullion';

  deferredPrompt: any = null; // to store the beforeinstallprompt event
  showInstallButton = false;  // control button visibility

  prepareRoute = (outlet: RouterOutlet) => {
    return outlet?.activatedRouteData?.['animation'];
  };

  constructor() {
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
      this.deferredPrompt = event;
      this.showInstallButton = true;
    });
  }

  installPWA() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      this.deferredPrompt = null;
      this.showInstallButton = false;
    });
  }
}
