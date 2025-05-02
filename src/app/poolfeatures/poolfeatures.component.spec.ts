import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolfeaturesComponent } from './poolfeatures.component';

describe('PoolfeaturesComponent', () => {
  let component: PoolfeaturesComponent;
  let fixture: ComponentFixture<PoolfeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoolfeaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolfeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
