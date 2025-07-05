import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-settings.component.html'
})
export class CookieSettingsComponent {
  currentStatus: string | null = localStorage.getItem('cookieConsent');

  acceptCookies(): void {
    localStorage.setItem('cookieConsent', 'accepted');
    this.currentStatus = 'accepted';
    alert('You accepted cookies.');
  }

  declineCookies(): void {
    localStorage.setItem('cookieConsent', 'declined');
    this.currentStatus = 'declined';
    alert('You declined cookies.');
  }

  resetCookies(): void {
    localStorage.removeItem('cookieConsent');
    this.currentStatus = null;
    alert('Your cookie preference has been reset. Reload the page.');
  }
}
