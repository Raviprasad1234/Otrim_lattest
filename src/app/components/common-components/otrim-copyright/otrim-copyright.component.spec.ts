import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrimCopyrightComponent } from './otrim-copyright.component';

describe('OtrimCopyrightComponent', () => {
  let component: OtrimCopyrightComponent;
  let fixture: ComponentFixture<OtrimCopyrightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtrimCopyrightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrimCopyrightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
