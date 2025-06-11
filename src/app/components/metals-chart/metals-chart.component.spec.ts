import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalsChartComponent } from './metals-chart.component';

describe('MetalsChartComponent', () => {
  let component: MetalsChartComponent;
  let fixture: ComponentFixture<MetalsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetalsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetalsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
