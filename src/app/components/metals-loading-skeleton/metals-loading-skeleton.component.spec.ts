import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalsLoadingSkeletonComponent } from './metals-loading-skeleton.component';

describe('MetalsLoadingSkeletonComponent', () => {
  let component: MetalsLoadingSkeletonComponent;
  let fixture: ComponentFixture<MetalsLoadingSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetalsLoadingSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetalsLoadingSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
