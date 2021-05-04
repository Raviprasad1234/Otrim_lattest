import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GHomeCompComponent } from './g-home-comp.component';

describe('GHomeCompComponent', () => {
  let component: GHomeCompComponent;
  let fixture: ComponentFixture<GHomeCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GHomeCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GHomeCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
