import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerPopupComponent } from '../popups/pdf-viewer-popup/pdf-viewer-popup.component';
import { RegisterModalComponent } from '../popups/register-modal/register-modal.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [CommonModule, PdfViewerPopupComponent, RegisterModalComponent, TranslateModule],
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent {
  showModal: boolean = false;
  pdfPath: string = '';

  readonly documents = [
    {
      id: 'cipc',
      iconClass: 'bi-building-check',
      imageSrc: 'bullion-beperk-image.png',
      titleKey: 'DOWNLOADS.CIPC_TITLE',
      descriptionKey: 'DOWNLOADS.CIPC_DESCRIPTION',
      cardTitleKey: 'DOWNLOADS.CIPC_TITLE',
      cardDescriptionKey: 'DOWNLOADS.CIPC_DESCRIPTION',
      pdfSrc: 'assets/downloads/BULLIONBEPERK-COOP11CPIC.pdf',
      downloadHref: 'assets/downloads/BULLIONBEPERK-COOP11CPIC.pdf'
    },
    {
      id: 'constitution',
      iconClass: 'bi-journal-text',
      imageSrc: 'constitution.png',
      titleKey: 'DOWNLOADS.CONSTITUTION_TITLE',
      descriptionKey: 'DOWNLOADS.CONSTITUTION_DESCRIPTION',
      cardTitleKey: 'DOWNLOADS.CONSTITUTION_TITLE',
      cardDescriptionKey: 'DOWNLOADS.CONSTITUTION_DESCRIPTION',
      pdfSrc: 'assets/downloads/BULLIONFINANCIALCO-OPCONSTITUTION.pdf',
      downloadHref: 'assets/downloads/BULLIONFINANCIALCO-OPCONSTITUTION.pdf'
    },
    {
      id: 'fractal',
      iconClass: 'bi-file-earmark-text',
      imageSrc: '/FractalAccount.png',
      titleKey: 'DOWNLOADS.FRACTAL_TITLE',
      descriptionKey: 'DOWNLOADS.FRACTAL_DESCRIPTION',
      cardTitleKey: 'DOWNLOADS.FRACTAL_CARD_TITLE',
      cardDescriptionKey: 'DOWNLOADS.FRACTAL_CARD_DESCRIPTION',
      pdfSrc: 'assets/downloads/BULLIONPROFILE-V2.pdf',
      downloadHref: 'assets/downloads/BULLIONPROFILE-V2.pdf'
    }
  ] as const;

  openModal(filePath: string): void {
    this.pdfPath = filePath;
    this.showModal = true;
  }

  openDocument(filePath: string): void {
    this.openModal(filePath);
  }

  closeModal(): void {
    this.showModal = false;
  }
}
