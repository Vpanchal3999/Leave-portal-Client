import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { AuthDTO, DialogData } from '../model/auth.dto';
import { Location } from '@angular/common'

@Component({
  selector: 'app-change-forgot-password',
  templateUrl: './change-forgot-password.component.html',
  styleUrls: ['./change-forgot-password.component.css']
})
export class ChangeForgotPasswordComponent implements OnInit {
  // @Output() urls = new EventEmitter<String>()

  changePasswordForm!: FormGroup;
  submitted: boolean = false;
  title: string | undefined;
  isForgotPopUp: Boolean = false;
  authRequest: AuthDTO = {};

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private appService: AppComponent,
    private location: Location
  ) {
   
  }

  ngOnInit(): void {

    this.changePasswordForm = this.formBuilder.group({
      employeeCode: ['', Validators.required],
      password: ['', Validators.required],
      oldPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]

    });

    console.log("Chang-Login details", this.authRequest);
    // this.changeContainerTitle();
  }

  get f() { return this.changePasswordForm.controls; }

  changePasswordSubmit() {
    this.submitted = true;
    this.authRequest = this.changePasswordForm.value;
    if (this.changePasswordForm.valid) {
      this.authRequest.employeeCode = this.changePasswordForm.controls['employeeCode'].value;
      if (this.changePasswordForm.valid) {
        this.authService.changePassword(this.authRequest)
          .subscribe((data: any) => {
            console.log(data)
            this.printTosterMsg(data.responseMessage, data.responseCode);
          }, error => {
            console.log("Error", error);
            this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
          });
        window.location.reload();
      }
    }
  }

  close() {
    console.log("Hide change password modal");
    var displayPopupHide = document.getElementById('change-popup');
    if (displayPopupHide != null) {
      displayPopupHide.style.display = 'none';
    }
    window.location.reload();
  }

  // changeContainerTitle() {
  //   this.title = "CHANGE PASSWORD";
  //   // localStorage.getItem('LoginUser') || ''
  //   this.changePasswordForm.get('employeeCode')?.setValue('E004');
  //   this.changePasswordForm.controls['employeeCode'].disable();
  //   this.isForgotPopUp = false;
  // }

  onSubmit() {
      this.submitted = true;
      this.changePasswordSubmit();
  }

  hide(id: any) {
    var displayPopupHide = document.getElementById(id);
    if (displayPopupHide != null) {
      displayPopupHide.style.display = 'none';
    }
  }
  printTosterMsg(msg: any, msgCode: any) {
    this.appService.showToaster(msg, msgCode);
  }
  logOut() {
    this.appService.clearLocalStorage();
    this.router.navigate(['login']);
  }

}
