import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayLeavesComponent } from './display-leaves/display-leaves.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ApplyLeavesComponent } from './apply-leaves/apply-leaves.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
  ]
})
export class LeaveModule { }
