import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrimAnalyticsSliderComponent } from './otrim-analytics-slider.component';

describe('OtrimAnalyticsSliderComponent', () => {
  let component: OtrimAnalyticsSliderComponent;
  let fixture: ComponentFixture<OtrimAnalyticsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtrimAnalyticsSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrimAnalyticsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
