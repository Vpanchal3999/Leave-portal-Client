import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-refresh-token',
  templateUrl: './refresh-token.component.html',
  styleUrls: ['./refresh-token.component.css']
})
export class RefreshTokenComponent implements OnInit {
  @Output() refreshed = new EventEmitter<boolean>()

  refreshPasswordform!: FormGroup;
  note:string = "Do you want to continue this session then please press 'YES' otherwise 'No'."
  tokenIsRefresh:boolean = false;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private appService: AppComponent) {
  }
  ngOnInit(): void {
     
  }

  refreshToken() {
    this.authService.refreshToken(true)
      .subscribe((data: any) => {
        // this.hide('refresh-popup');
        console.log("Refresh Data :",data)
        localStorage.setItem('loginToken',data.data);
        this.tokenIsRefresh = true;
        this.printTosterMsg(data.responseMessage,data.responseCode);
        // window.location.reload();
        this.refreshed.emit(this.tokenIsRefresh);
      },
      error => {
        console.log("Error", error);
        this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
      });
  }
  close(){
    console.log("Hid pop-up");
    var displayPopupHide = document.getElementById('refresh-popup');
      if (displayPopupHide != null) {
        displayPopupHide.style.display = 'none' ;
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
