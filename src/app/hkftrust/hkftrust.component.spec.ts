import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HkftrustComponent } from './hkftrust.component';

describe('HkftrustComponent', () => {
  let component: HkftrustComponent;
  let fixture: ComponentFixture<HkftrustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HkftrustComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HkftrustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
