import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CreateUpdateEmployeeComponent } from './employee/create-update-employee/create-update-employee.component';
import { ChangeForgotPasswordComponent } from './auth/change-forgot-password/change-forgot-password.component';
import { DisplayEmployeeDetailsComponent } from './employee/display-employee-details/display-employee-details.component';
import { ViewUpdateEmployeeComponent } from './employee/view-update-employee/view-update-employee.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin/employees', component: DisplayEmployeeDetailsComponent},
  {path: 'admin/registration', component: CreateUpdateEmployeeComponent},
  {path: 'admin/updateEmployee/:empCode', component: CreateUpdateEmployeeComponent},
  {path: 'changePassword',component: ChangeForgotPasswordComponent},
  {path: 'forgotPassword',component: LoginComponent},
  {path:'employee/details/:empCode',component:ViewUpdateEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
