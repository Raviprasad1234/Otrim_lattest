import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GHomeShowallCompComponent } from './g-home-showall-comp.component';

describe('GHomeShowallCompComponent', () => {
  let component: GHomeShowallCompComponent;
  let fixture: ComponentFixture<GHomeShowallCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GHomeShowallCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GHomeShowallCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
