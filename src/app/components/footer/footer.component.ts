import { Component } from '@angular/core';
import { CookieSettingsComponent } from "../cookie-settings/cookie-settings.component";

@Component({
  selector: 'app-footer',
  imports: [CookieSettingsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
