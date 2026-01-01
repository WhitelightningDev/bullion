import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-hkftrust',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './hkftrust.component.html',
  styleUrl: './hkftrust.component.css'
})
export class HkftrustComponent {
  constructor(
    public translate: TranslateService,
    private languageService: LanguageService // if needed elsewhere
  ) {}

  confirmRedirect(): void {
    const userConfirmed = confirm(
      this.translate.instant('REDIRECT_CONFIRM') ||
      'You are about to leave this site and go to the Hong Kong Trust registration page. Do you want to continue?'
    );

    if (userConfirmed) {
      window.open('https://hongkongtrust.vercel.app/', '_blank');
    }
  }

  get heroImage(): string {
    return this.translate.currentLang === 'af' ? 'hkftafimage.png' : 'hkftimage.png';
  }
}
