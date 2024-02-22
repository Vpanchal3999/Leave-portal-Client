import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ChangeForgotPasswordComponent } from './change-forgot-password/change-forgot-password.component';
import { AppModule } from '../app.module';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { EmployeeModule } from '../employee/employee.module';
import { MatStepperModule } from '@angular/material/stepper';
import { RefreshTokenComponent } from './refresh-token/refresh-token.component';
import { HeaderComponent } from '../header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [
    LoginComponent,
    ChangeForgotPasswordComponent,
    RefreshTokenComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports:[
    RefreshTokenComponent,
    ChangeForgotPasswordComponent,
  ]
})
export class AuthModule { }
