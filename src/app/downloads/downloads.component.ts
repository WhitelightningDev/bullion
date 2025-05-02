import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import "primeicons/primeicons.css";

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [CardModule, ButtonModule, ChipModule],
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent {
  openFileInNewTab() {
    const url = 'https://rbkam-my.sharepoint.com/personal/willem_rbkam_onmicrosoft_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fwillem%5Frbkam%5Fonmicrosoft%5Fcom%2FDocuments%2FCompanies%2FMy%20Co%2Dop%2FMy%20Coop%20ASPNET%2FInformation%20for%20users%2FRegistration%20Guide%20on%20My%20Coop%2Epdf&parent=%2Fpersonal%2Fwillem%5Frbkam%5Fonmicrosoft%5Fcom%2FDocuments%2FCompanies%2FMy%20Co%2Dop%2FMy%20Coop%20ASPNET%2FInformation%20for%20users&ga=1';
    window.open(url, '_blank');  // This opens the link in a new tab
  }
}
