import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterguidepopupComponent } from './registerguidepopup.component';

describe('RegisterguidepopupComponent', () => {
  let component: RegisterguidepopupComponent;
  let fixture: ComponentFixture<RegisterguidepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterguidepopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterguidepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
