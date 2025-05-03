import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer-popup',
  standalone: true,
  imports: [NgIf, PdfViewerModule],
  templateUrl: './pdf-viewer-popup.component.html',
  styleUrls: ['./pdf-viewer-popup.component.css']
})
export class PdfViewerPopupComponent {
  @Input() show = false;
  @Input() pdfSrc = '';

  close() {
    this.show = false;
  }
}
