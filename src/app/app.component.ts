import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { slideInAnimation } from './route-animations';
import { DownloadsComponent } from './downloads/downloads.component';
import { CookieConsentComponent } from "./components/cookie-consent/cookie-consent.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent, CookieConsentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bullion';

  prepareRoute = (outlet: RouterOutlet) => {
    return outlet?.activatedRouteData?.['animation'];
  };
}
