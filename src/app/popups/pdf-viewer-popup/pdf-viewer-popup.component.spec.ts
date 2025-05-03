import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfViewerPopupComponent } from './pdf-viewer-popup.component';

describe('PdfViewerPopupComponent', () => {
  let component: PdfViewerPopupComponent;
  let fixture: ComponentFixture<PdfViewerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfViewerPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfViewerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
