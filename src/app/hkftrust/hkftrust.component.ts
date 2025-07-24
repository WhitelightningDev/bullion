import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hkftrust',
  imports: [ TranslateModule],
  templateUrl: './hkftrust.component.html',
  styleUrl: './hkftrust.component.css'
})
export class HkftrustComponent {
confirmRedirect(): void {
    const userConfirmed = confirm(
      'You are about to leave this site and go to the Hong Kong Trust registration page. Do you want to continue?'
    );

    if (userConfirmed) {
      window.open('https://hongkongtrust.vercel.app/', '_blank');
    }
  }

}
