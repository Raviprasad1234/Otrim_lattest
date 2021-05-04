import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrimBannerComponent } from './otrim-banner.component';

describe('OtrimBannerComponent', () => {
  let component: OtrimBannerComponent;
  let fixture: ComponentFixture<OtrimBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtrimBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrimBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
