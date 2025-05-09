import { Component } from '@angular/core';
import { PdfViewerPopupComponent } from '../popups/pdf-viewer-popup/pdf-viewer-popup.component';
import { RegisterModalComponent } from "../popups/register-modal/register-modal.component";

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [PdfViewerPopupComponent, RegisterModalComponent],
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent {
  showModal: boolean = false;
  pdfPath = 'assets/downloads/bullion-cipc-document.pdf';

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
