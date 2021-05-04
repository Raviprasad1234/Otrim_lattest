import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrimUserChartsComponent } from './otrim-user-charts.component';

describe('OtrimUserChartsComponent', () => {
  let component: OtrimUserChartsComponent;
  let fixture: ComponentFixture<OtrimUserChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtrimUserChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrimUserChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
