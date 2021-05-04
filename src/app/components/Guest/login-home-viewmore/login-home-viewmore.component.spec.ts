import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHomeViewmoreComponent } from './login-home-viewmore.component';

describe('LoginHomeViewmoreComponent', () => {
  let component: LoginHomeViewmoreComponent;
  let fixture: ComponentFixture<LoginHomeViewmoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginHomeViewmoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginHomeViewmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
