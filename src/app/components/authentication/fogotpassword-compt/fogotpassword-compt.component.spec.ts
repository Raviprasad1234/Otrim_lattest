import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogotpasswordComptComponent } from './fogotpassword-compt.component';

describe('FogotpasswordComptComponent', () => {
  let component: FogotpasswordComptComponent;
  let fixture: ComponentFixture<FogotpasswordComptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FogotpasswordComptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FogotpasswordComptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
