import { ApplyLeavesComponent } from './../leave/apply-leaves/apply-leaves.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUpdateEmployeeComponent } from './create-update-employee/create-update-employee.component';
import { DisplayEmployeeDetailsComponent } from './display-employee-details/display-employee-details.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { LeaveModule } from '../leave/leave.module';
import { MatPaginatorModule } from  '@angular/material/paginator';
import { DisplayLeavesComponent } from '../leave/display-leaves/display-leaves.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthModule } from '../auth/auth.module';
import { ViewUpdateEmployeeComponent } from './view-update-employee/view-update-employee.component';
import { AppModule } from '../app.module';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RefreshTokenComponent } from '../auth/refresh-token/refresh-token.component';



@NgModule({
  declarations: [
    CreateUpdateEmployeeComponent,
    DisplayEmployeeDetailsComponent,
    DisplayLeavesComponent,
    ApplyLeavesComponent,
    ViewUpdateEmployeeComponent,
    HeaderComponent
  ],
  imports: [
    AuthModule,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    LeaveModule,
    MatTooltipModule,
  ],
  providers:[

  ]
})
export class EmployeeModule { }
