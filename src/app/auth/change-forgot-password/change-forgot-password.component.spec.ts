import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeForgotPasswordComponent } from './change-forgot-password.component';

describe('ChangeForgotPasswordComponent', () => {
  let component: ChangeForgotPasswordComponent;
  let fixture: ComponentFixture<ChangeForgotPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeForgotPasswordComponent]
    });
    fixture = TestBed.createComponent(ChangeForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
