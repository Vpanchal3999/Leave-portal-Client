import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Designation, EmployeeRegistrationRequest, EmployeeResponse } from '../models/employee.dto';
import { EmployeeService } from '../../services/employee.services';
import { AppComponent } from 'src/app/app.component';
import { rolesArray } from 'src/app/utility/roles';
import { flush } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-update-employee',
  templateUrl: './create-update-employee.component.html',
  styleUrls: ['./create-update-employee.component.css']
})
export class CreateUpdateEmployeeComponent implements OnInit {
  @ViewChild('designationSelect') designationSelect !: ElementRef;
  @ViewChild('rolesGrp') roleGroup !: ElementRef;

  registrationForm!: FormGroup;
  employee: EmployeeRegistrationRequest = new EmployeeRegistrationRequest();
  employeeById: EmployeeResponse = new EmployeeResponse();
  submitted = false;
  inValideValue = false;
  error?: string;
  roleList = rolesArray;
  designations: Designation[] = [];
  updateForm: boolean = false;
  refreshIt: boolean = false;
  empCode!: string;
  selectedDesignation?: string;
  selectedRole?: string;
  roleId?: number;
  designationId?: number;
  title?: string;


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private appService: AppComponent) {
      this.createForm();
  }

  ngOnInit(): void {
    this.roleList;
    this.designations;
    this.isUpdateForm();
  }
  createForm() {
    this.registrationForm = this.formBuilder.group({
      id: [''],
      departmentCode: [''],
      departmentName: [''],
      token: [''],
      employeeCode: ['', [Validators.required,Validators.pattern("^[A-Z]+[0-9]+"),Validators.maxLength(5)]],
      firstName: ['',[Validators.required,Validators.pattern("^[A-Za-z]*"),Validators.maxLength(15)]],
      lastName: ['', [Validators.required,Validators.pattern("^[A-Za-z]*"),Validators.maxLength(15)]],
      addressLine1: ['', !Validators.required],
      addressLine2: ['', !Validators.required],
      addressLine3: ['', !Validators.required],
      designationName: ['', Validators.required],
      roles: ['', Validators.required],
      contactNumber: ['', Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      age: ['', Validators.pattern("[0-9]{0,3}")],
      email: ['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),Validators.maxLength(20)]],
      createdAt: [],
      createdBy: [],
      modifyAt: [],
      modifyBy: [],
      active: [],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

  changeRoles(e: any) {
    console.log("change Designation", e);
    this.roleId = this.roleList.find(i => i.roleName === e.value)?.id;
  }

  isUpdateForm() {
    this.getDesignations()
    if (this.router.url.includes("/admin/updateEmployee/")) {
      this.updateForm = true;
      this.title = "Update Employee"
      this.empCode = this.route.snapshot.params['empCode'];
      this.getEmployeeById()
      console.log("Update Form work: ", this.updateForm);
    } else {
      this.title = "Registration"
      console.log("Update Form does't work: ", this.updateForm);
    }
  }

  changeDesignation(e: any) {
    console.log("change Designation", e);
    this.designationId = this.designations.find((i: { designationName: any; }) => i.designationName === e.value)?.id;
  }

  saveEmployee() {
    this.employee = this.registrationForm.value;
    this.employee.roleId = this.roleId;
    this.employee.designationId = this.designationId;
    this.employee.password = "test@123";
    console.log("EmployeeData After: ", this.employee);
    this.employeeService.registerEmployee(this.employee)
      .subscribe((data: any) => {
        console.log("Request data :", data);
        this.router.navigate(['admin/employees']);
        this.submitted = false;
        this.printTosterMsg(data.responseMessage, data.responseCode);
      },
        error => {
          console.log("Error", error);
          this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
          if (error.error.responseCode === 401) {
            this.refreshToken();
          }
        });

    this.gotoList();
  }
  updateEmployeeById() {
    this.employeeById = this.registrationForm.value;
    this.employeeService.updateEmployeeDetails(this.empCode, this.employeeById)
      .subscribe((data: any) => {
        console.log("Updated details", data);
        this.printTosterMsg(data.responseMessage, data.responseCode);
        this.submitted = false;
        this.router.navigate(['admin/employees']);
      },
        error => {
          console.log("Error", error);
          this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
          if (error.error.responseCode === 401) {
            this.refreshToken();
          }
        });
  }

  getDesignations() {
    this.employeeService.getDesignations().subscribe(data => {
      console.log("Result", data);
      this.designations = data.data;
      localStorage.setItem('designationDetails', JSON.stringify(this.designations));
    },
      error => {
        console.log("Error", error);
        this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
        if (error.error.responseCode === 401) {
          this.refreshToken();
        }
      });

  }

  onSubmit() {
    this.submitted = true;
    if(this.registrationForm.valid){
    if (this.router.url.includes("/admin/updateEmployee/")) {
      this.updateEmployeeById();
    } else {
      this.saveEmployee();
    }
  }
}

onChangeForm(e : any){
  console.log("change form : ",e);
  if(e.target.value === '' || e.target.value === undefined){
    this.inValideValue = true;
  } else {
    this.inValideValue = false;
  }
}

  getEmployeeById() {
    this.employeeService.getEmployeeDetailsById(this.empCode)
      .subscribe((data: any) => {
        console.log("Get employee by id : ", data)
        this.employeeById = data.data;
        this.registrationForm.setValue(this.employeeById);
        this.registrationForm.controls['employeeCode'].disable();
        this.selectRolesAndDesignations(data.data);
      },
        error => {
          console.log("Error", error);
          this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
          if (error.error.responseCode === 401) {
            this.refreshToken();
          }
        });
  }

  selectRolesAndDesignations(data: any) {
    this.designations = JSON.parse(localStorage.getItem('designationDetails') || '{}');
    this.selectedDesignation = this.designations.find((i: { designationName: any; }) => i.designationName === data.designationName)?.designationName;
    this.selectedRole = this.roleList.find((i: { roleName: any; }) => i.roleName === data.roles.roleName)?.roleName;
    this.registrationForm.controls['designationName'].setValue(this.selectedDesignation);
    this.registrationForm.controls['roles'].setValue(this.selectedRole);
    this.registrationForm.controls['designationName'].disable();
    this.registrationForm.controls['roles'].disable();
  }

  gotoList() {
    this.router.navigate(['admin/employees']);
  }
  goToChangePassword() {
    var displayPopupHide = document.getElementById('popup-change-pwd');
    if (displayPopupHide != null) {
      displayPopupHide.style.display = 'block';
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
  tokenRefresh(e:any){
    console.log("tokenRefresh : ",e);
    if(e === true){
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
