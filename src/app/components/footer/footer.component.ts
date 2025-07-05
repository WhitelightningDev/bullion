import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookieSettingsComponent } from "../cookie-settings/cookie-settings.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CookieSettingsComponent, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private translate: TranslateService) {}

  switchLang(lang: 'en' | 'af') {
    this.translate.use(lang);
  }
}
