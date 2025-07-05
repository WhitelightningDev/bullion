import { Component } from '@angular/core';
import { PdfViewerPopupComponent } from '../popups/pdf-viewer-popup/pdf-viewer-popup.component';
import { RegisterModalComponent } from '../popups/register-modal/register-modal.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [PdfViewerPopupComponent, RegisterModalComponent, TranslateModule],
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent {
  showModal: boolean = false;
  pdfPath: string = '';

  openModal(filePath: string): void {
    this.pdfPath = filePath;
    this.showModal = true;
  }

  openCipcDocument(): void {
    this.openModal('assets/downloads/BULLIONBEPERK-COOP11CPIC.pdf');
  }

  openConstitutionDocument(): void {
    this.openModal('assets/downloads/BULLIONFINANCIALCO-OPCONSTITUTION.pdf');
  }

  openBullionProfileDocument(): void {
    this.openModal('assets/downloads/BULLIONPROFILE-V2.pdf');
  }

  closeModal(): void {
    this.showModal = false;
  }
}
