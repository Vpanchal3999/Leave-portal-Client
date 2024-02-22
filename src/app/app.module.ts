import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { LeaveModule } from './leave/leave.module';
import { EmployeeModule } from './employee/employee.module';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import {MatSelectModule} from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExampleInterceptor } from './example-interceptor.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChangeForgotPasswordComponent } from './auth/change-forgot-password/change-forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent
  ],
  imports: [
    EmployeeModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatStepperModule,
    MatSelectModule,
    ReactiveFormsModule,
    LeaveModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot()
  ],
  exports:[
    // HeaderComponent
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS, useClass: ExampleInterceptor, multi:true
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
