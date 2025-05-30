import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent {
  showBanner = false;

  constructor() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      this.showBanner = true;
    }
  }

  acceptCookies(): void {
    localStorage.setItem('cookieConsent', 'accepted');
    this.showBanner = false;
    // Load non-essential cookies (analytics, etc.) here if needed
  }

  declineCookies(): void {
    localStorage.setItem('cookieConsent', 'declined');
    this.showBanner = false;
  }
}
