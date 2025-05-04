import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterpopupComponent } from './registerpopup.component';

describe('RegisterpopupComponent', () => {
  let component: RegisterpopupComponent;
  let fixture: ComponentFixture<RegisterpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterpopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
