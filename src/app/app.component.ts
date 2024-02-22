import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ChangeForgotPasswordComponent } from './auth/change-forgot-password/change-forgot-password.component';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  showHeader:boolean = true;

  constructor(private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    
  }
  public hideHeader(){
    if(this.router.url.includes("/forgotPassword")){
    this.showHeader = false;
  } else if(this.router.url.includes("/login")) {
    this.showHeader = false;
  } else if (this.router.url.includes("/changePassword")){
    this.showHeader = false;
  } else {
    this.showHeader = true;
  }
}

  public showToaster(msg: any, msgCode: any) {
    console.log("Toster msg",msg);
    if ((msgCode === 200 || msgCode === 201)) {
      this.toastr.success(msg,msgCode,{
        timeOut: 1000
      });
    } else {
      this.toastr.error(msg,msgCode,{
        timeOut: 2000
      });
    }
  }

  clearLocalStorage(){
    localStorage.removeItem('designationDetails');
    localStorage.removeItem('listOfEmployeesLeave');
    localStorage.removeItem('loginToken');
    localStorage.removeItem('LoginUser');
  }
}
