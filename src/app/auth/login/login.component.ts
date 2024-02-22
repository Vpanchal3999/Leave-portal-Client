import { Component, ViewChild } from '@angular/core';
import { AuthDTO } from '../model/auth.dto';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roles } from 'src/app/utility/roles';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { ChangeForgotPasswordComponent } from '../change-forgot-password/change-forgot-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form!: FormGroup;
  title!: string;
  linkName!: string;
  subTitle!: string;
  buttonName!: string;
  changeType!: string;
  isForgotPassword: boolean = false;
  forgotPasswordForm!: FormGroup;
  submitted = false;
  changes = false;
  token: string | undefined;
  showChangePassword: boolean = false;
  authDto: AuthDTO = new AuthDTO();
  currentRole: Roles = {
    id: 0,
    roleName: ''
  };
  isRefresh: Boolean = true;
  forgotApp: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private appService: AppComponent,
    private dialog: MatDialog) {
  }
  get f() { return this.form.controls; }

  ngOnInit() {
    this.appService.hideHeader();
    this.changeType = "password";
    console.log("Dialog :", this.dialog)
    this.form = this.formBuilder.group({
      employeeCode: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginText();
  }

  onSubmit(event: any) {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    } else {
      this.submitted = false;
    }
    if (this.isForgotPassword) {
      this.forgotPasswordSubmit()
    } else {
      this.loginCallBack();
    }
  }

  forgotPasswordSubmit() {
    this.authDto.employeeCode = this.form.value.employeeCode;
    this.authDto.password = this.form.value.password;
    this.authService.forgotPassword(this.authDto)
      .subscribe((data: any) => {
        console.log(data)
        this.printTosterMsg(data.responseMessage, data.responseCode);
        this.router.navigate(["login"]);
      }, error => {
        console.log("Error", error);
        this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
      });
  }

  loginCallBack() {
    this.authDto.employeeCode = this.form.value.employeeCode;
    this.authDto.password = this.form.value.password;
    if (this.form.valid) {
      this.authService.logIn(this.authDto)
        .subscribe(data => {
          console.log("Result of login :", data)
          this.currentRole.id = data.data.roles.id;
          this.currentRole.roleName = data.data.roles.roleName;
          this.token = data.data.token;
          localStorage.setItem('LoginUser', data.data.employeeCode);
          localStorage.setItem('loginToken', data.data.token);
          this.goToList();
          this.printTosterMsg(data.responseMessage, data.responseCode)
        }, error => {
          console.log("Error", error);
          this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
        }
        );
    }
  }

  showPassword(e: any) {
    console.log("Show Passwrod :", e);
    let showEyesBtn = document.getElementById('togglePassword');
    let inputType = document.getElementById('password');
    if (e.target.className === "fa fa-eye-slash") {
      if (showEyesBtn != null && inputType != null) {
        const type = inputType.getAttribute('type') === 'password' ? 'text' : 'password';
        console.log("Type if:", type);
        inputType.setAttribute('type', type);
        this.changeType = 'text'
        showEyesBtn.classList.remove('fa-eye-slash');
        showEyesBtn.classList.add('fa-eye');
      }
    } else {
      if (showEyesBtn != null && inputType != null) {
        const type = inputType.getAttribute('type') === 'text' ? 'password' : 'text';
        console.log("Type else:", type);
        inputType.setAttribute('type', type);
        this.changeType = 'password'
        showEyesBtn.classList.remove('fa-eye');
        showEyesBtn.classList.add('fa-eye-slash')
      }
    }
  }

  goToList() {
    console.log("currentRole", this.currentRole);
    if (this.currentRole != undefined) {
      if (this.currentRole.roleName.toLowerCase() === 'Super-admin'.toLowerCase() || this.currentRole.roleName.toLowerCase() === 'Admin'.toLowerCase()) {
        this.router.navigate(['admin/employees']);
      } else {
        this.router.navigate(['employee/details', this.form.value.employeeCode]);
      }
    } else {
      console.log("Error");
    }
  }

  onClickForgotPassword(e: string) {
    console.log("Link name :", e);
    if (e === "Login") {
      this.forgotText();
    } else {
      this.loginText();
    }

    console.log("showChangePassword", this.showChangePassword);
  }

  forgotText() {
    this.showChangePassword = true;
    this.title = "Forgot Password"
    this.subTitle = "Please enter reset your password!.."
    this.buttonName = "Submit"
    this.linkName = "Sign In?"
    this.isForgotPassword = true;
  }

  loginText() {
    this.title = "Login";
    this.subTitle = "Please enter your Emp-code and password!"
    this.buttonName = "Login"
    this.linkName = "Forgot password?"
    this.isForgotPassword = false;
  }

  printTosterMsg(msg: any, msgCode: any) {
    this.appService.showToaster(msg, msgCode);
  }

}
