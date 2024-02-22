import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.services';
import { LeaveService } from 'src/app/services/leave-service';
import { AppComponent } from 'src/app/app.component';
import { MatStepper } from '@angular/material/stepper';
import { EmployeeResponse } from '../models/employee.dto';
import { UsernameValidator } from 'src/app/utility/validation';

@Component({
  selector: 'app-view-update-employee',
  templateUrl: './view-update-employee.component.html',
  styleUrls: ['./view-update-employee.component.css']
})
export class ViewUpdateEmployeeComponent implements OnInit {

  updateEmployeeForm!: FormGroup;
  personalDetailsForm!: FormGroup;
  employeeById: EmployeeResponse = new EmployeeResponse();
  updateForm: boolean = false;
  refreshIt: boolean = false;
  empCode!: string;
  showSecondTab: boolean = false;
  submitted = false;
  isLinear = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private appService: AppComponent) {
  }

  ngOnInit(): void {
    this.empCode = this.route.snapshot.params['empCode'];

    this.updateEmployeeFormValues();
    this.updateEmployeeForm.controls['employeeCode'].disable();
    this.updateEmployeeForm.controls['departmentName'].disable();
    this.updateEmployeeForm.controls['designationName'].disable();
    this.getEmployeeById();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.updateEmployeeForm.controls;
  }

  updateEmployeeFormValues() {
    this.updateEmployeeForm = this.formBuilder.group({
      id: [],
      firstName: ['', [Validators.required, Validators.pattern("^[A-Za-z]*"), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.pattern("^[A-Za-z]*"), Validators.maxLength(15)]],
      age: ['', [Validators.required, Validators.pattern("^[0-9]{0,3}$")]],
      employeeCode: [],
      departmentName: [],
      departmentCode: [],
      designationName: [],
      roles: [],
      token: [],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      addressLine3: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      // [0-9]{0-10}
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.maxLength(20)]],
      createdAt: [],
      createdBy: [],
      modifyAt: [],
      modifyBy: [],
      active: [],
    });
  }

  onNext(stepper: MatStepper) {

    stepper.next();
  }
  onPrev(stepper: MatStepper) {
    stepper.previous();
  }

  tabClick(tab: any) {
    console.log("TabName :", tab);
    if (tab.index === 1) {
      this.showSecondTab = true;
    }
  }

  onSubmit() {
    this.submitted = true;
    this.updateEmployeeById()
  }

  getEmployeeById() {
    this.employeeService.getEmployeeDetailsById(this.empCode)
      .subscribe((data: any) => {
        console.log("Get employee by id : ", data)
        this.employeeById = data.data;
        this.updateEmployeeForm.setValue(this.employeeById);
      },
        error => {
          console.log("Error", error);
          this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
          if (error.error.responseCode === 401) {
            this.refreshToken();
          }
        });

  }


  updateEmployeeById() {
    this.employeeById = this.updateEmployeeForm.value;
    if (this.updateEmployeeForm.valid) {
      this.employeeService.updateEmployeeDetails(this.empCode, this.employeeById)
        .subscribe((data: any) => {
          console.log("Updated details", data);
          this.printTosterMsg(data.responseMessage, data.responseCode);
        },
          error => {
            console.log("Error", error);
            this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
            if (error.error.responseCode === 401) {
              this.refreshToken();
            }
          });
    }
  }
  refreshToken() {
    this.refreshIt = true;
    var oposityMainPage = document.getElementById('card-body');
    if (oposityMainPage != null) {
      oposityMainPage.style.opacity = '0.6'
    }
  }
  printTosterMsg(msg: any, msgCode: any) {
    this.appService.showToaster(msg, msgCode);
  }
  tokenRefresh(e: any) {
    console.log("tokenRefresh : ", e);
    if (e === true) {
      var displayPopupHide = document.getElementById('refresh-popup');
      if (displayPopupHide != null) {
        displayPopupHide.style.display = 'block';
      }

      window.location.reload();
    }
  }
  logOut() {
    this.appService.clearLocalStorage();
    this.router.navigate(['login']);
  }
}
