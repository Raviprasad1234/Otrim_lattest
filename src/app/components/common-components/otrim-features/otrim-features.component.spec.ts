import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrimFeaturesComponent } from './otrim-features.component';

describe('OtrimFeaturesComponent', () => {
  let component: OtrimFeaturesComponent;
  let fixture: ComponentFixture<OtrimFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtrimFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrimFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
