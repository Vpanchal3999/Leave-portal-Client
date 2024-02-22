import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUpdateEmployeeComponent } from './view-update-employee.component';

describe('ViewUpdateEmployeeComponent', () => {
  let component: ViewUpdateEmployeeComponent;
  let fixture: ComponentFixture<ViewUpdateEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUpdateEmployeeComponent]
    });
    fixture = TestBed.createComponent(ViewUpdateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
