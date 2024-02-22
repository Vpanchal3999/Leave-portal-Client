import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLeavesComponent } from './apply-leaves.component';

describe('ApplyLeavesComponent', () => {
  let component: ApplyLeavesComponent;
  let fixture: ComponentFixture<ApplyLeavesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyLeavesComponent]
    });
    fixture = TestBed.createComponent(ApplyLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
