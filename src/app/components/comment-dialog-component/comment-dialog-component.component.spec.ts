import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDialogComponentComponent } from './comment-dialog-component.component';

describe('CommentDialogComponentComponent', () => {
  let component: CommentDialogComponentComponent;
  let fixture: ComponentFixture<CommentDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
