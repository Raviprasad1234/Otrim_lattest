import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrimFooterComponent } from './otrim-footer.component';

describe('OtrimFooterComponent', () => {
  let component: OtrimFooterComponent;
  let fixture: ComponentFixture<OtrimFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtrimFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrimFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
