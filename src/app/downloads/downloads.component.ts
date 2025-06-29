import { Component } from '@angular/core';
import { PdfViewerPopupComponent } from '../popups/pdf-viewer-popup/pdf-viewer-popup.component';
import { RegisterModalComponent } from '../popups/register-modal/register-modal.component';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [PdfViewerPopupComponent, RegisterModalComponent],
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent {
  showModal: boolean = false;
  pdfPath: string = '';

  // Generic method
  openModal(filePath: string): void {
    this.pdfPath = filePath;
    this.showModal = true;
  }

  // Specific to CIPC document
  openCipcDocument(): void {
    this.openModal('assets/downloads/BULLIONBEPERK-COOP11CPIC.pdf');
  }

  // Specific to Constitution document
  openConstitutionDocument(): void {
    this.openModal('assets/downloads/BULLIONFINANCIALCO-OPCONSTITUTION.pdf');
  }

  openBullionProfileDocument() {
  this.pdfPath = 'assets/downloads/BULLIONPROFILE-V2.pdf';
  this.showModal = true;
}


  closeModal(): void {
    this.showModal = false;
  }
}
