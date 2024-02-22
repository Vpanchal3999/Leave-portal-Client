import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ChangeForgotPasswordComponent } from '../auth/change-forgot-password/change-forgot-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showChangePassword:boolean=false;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppComponent) {
  }

  ngOnInit(): void {
   
  }
  goToChangePassword() {
    this.showChangePassword = true
    var oposityMainPage = document.getElementById('card-body');
    if (oposityMainPage != null) {
      oposityMainPage.style.opacity = '0.6';
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
