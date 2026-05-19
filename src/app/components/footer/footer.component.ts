import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CookieSettingsComponent } from "../cookie-settings/cookie-settings.component";
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CookieSettingsComponent, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();

  constructor(private languageService: LanguageService) {}

  switchLang(lang: 'en' | 'af') {
    this.languageService.setLanguage(lang);
  }
}
