import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeResponse } from '../models/employee.dto';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveResponse } from 'src/app/leave/models/leave';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.services';
import { AppComponent } from 'src/app/app.component';
import { MatSort } from '@angular/material/sort';
import { LeaveService } from 'src/app/services/leave-service';
import { PageResponseVo, pageRequest } from 'src/app/utility/pageRequest';
import { SortingOrder } from 'src/app/utility/constant';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-display-employee-details',
  templateUrl: './display-employee-details.component.html',
  styleUrls: ['./display-employee-details.component.css']
})
export class DisplayEmployeeDetailsComponent implements OnInit {

  @ViewChild('paginator') paginatorSize!: MatPaginator;
  @ViewChild('empDetailsSort') empDetailsSort = new MatSort();

  isLinear = false;
  showMessage = true;
  statusMessage: string | undefined;
  refreshIt: boolean = false;
  employees: EmployeeResponse[] = [];
  paginationResponse: PageResponseVo = {}
  showActive: boolean = false;
  dataSourceEmployee = new MatTableDataSource<EmployeeResponse>(this.employees);
  personalDetails: EmployeeResponse = new EmployeeResponse();
  leaveResponse: LeaveResponse[] = [];
  showDetailsOnSecond: boolean = false;
  showDetailsOnFirst: boolean = true;
  paginationRequest: pageRequest = new pageRequest();
  employeeDetailsColumns: any[] = ['employeeCode', 'departmentName', 'designationName', 'email', 'action'];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private appService: AppComponent,) {
  }


  ngOnInit(): void {
    this.paginationRequest.itemPerPage = 3
    this.paginationRequest.pageNumber = 0
    this.paginationRequest.sortingField = "employeeCode"
    this.paginationRequest.sortingOrder = SortingOrder.ASC
    this.getEmployeeAllList();
  }
  ngAfterViewInit() {
    this.empDetailsSort.disableClear = true;
    this.dataSourceEmployee.sort = this.empDetailsSort;
    this.dataSourceEmployee.paginator = this.paginatorSize;
    console.log("Pagination after init: ",this.paginatorSize);
  }

  tabClick(tab: any) {
    console.log("TabName :", tab);
    if (tab.index === 1) {
      this.showDetailsOnSecond = true;
    } else {
      this.showDetailsOnSecond = false;
    }
  }
  onChangePage(page: PageEvent) {
    console.log("Page changes : ", page)
    this.paginationRequest.itemPerPage = page.pageSize
    this.paginationRequest.pageNumber = page.pageIndex
    this.getEmployeeAllList();
  }
  sortChange(field: any) {
    console.log("Sort change", field);
    this.paginationRequest.sortingField = field.active
    if (field.direction === 'desc') {
      this.paginationRequest.sortingOrder = SortingOrder.DEC
    } else {
      this.paginationRequest.sortingOrder = SortingOrder.ASC
    }
    this.getEmployeeAllList()
  }

  getEmployeeAllList() {
    console.log("Pagination Req ", this.paginationRequest);
    this.employeeService.getAllEmployeeDetails(this.paginationRequest)
      .subscribe(data => {
        console.log("Employee Details", data.data);
        this.employees = data?.data.pages;
        this.dataSourceEmployee = data.data.pages;
        this.showActive = data.data.pages.active;
        this.paginatorSize.length = data.data.totalItem;
        localStorage.setItem('listOfEmployeesLeave', JSON.stringify(this.employees));
      },
        error => {
          console.log("Error", error);
          this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
          if (error.error.responseCode === 401) {
            this.refreshToken();
          }
        });
  }

  showPersonalDetailsOnFirst(event: any) {
    console.log("value :", event.target.id);
    var obj = this.employees.find(i => i.employeeCode === event.target.id);
    this.personalDetails.firstName = obj?.firstName;
    this.personalDetails.lastName = obj?.lastName;
    this.personalDetails.addressLine1 = obj?.addressLine1;
    this.personalDetails.addressLine2 = obj?.addressLine2;
    this.personalDetails.addressLine3 = obj?.addressLine3;
    this.personalDetails.age = obj?.age;
    this.personalDetails.contactNumber = obj?.contactNumber;
    var oposityMainPage = document.getElementById('card-body');
    if (oposityMainPage != null) {
      oposityMainPage.style.opacity = '0.6'
      this.showDetailsOnFirst = false;
    }
  }

  addemployee() {
    this.router.navigate(['admin/registration']);
  }
  updateEmployee(empCode?: string) {
    this.router.navigate(['admin/updateEmployee', empCode]);
  }
  deleteEmployee(id?: string) {
    this.employeeService.deActiveEmployeeDetails(id)
      .subscribe(data => {
        console.log("Delete success", data);
        this.printTosterMsg(data.responseMessage, data.responseCode);
        this.getEmployeeAllList();
      },
        error => {
          console.log("Error", error);
          this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
          if (error.error.responseCode === 401) {
            this.refreshToken();
          }
        });
  }

  activeEmloyee(id: string) {
    this.employeeService.activeEmployeDetails(id, true)
      .subscribe(data => {
        console.log("active success", data);
        this.printTosterMsg(data.responseMessage, data.responseCode);
        this.getEmployeeAllList();
      },
        error => {
          console.log("Error", error);
          this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
          if (error.error.responseCode === 401) {
            this.refreshToken();
          }
        });
  }

  hidePopup(id: any) {
    console.log("Hide :", id);
    this.showDetailsOnFirst = true;
    var oposityMainPage = document.getElementById('card-body');
    if (oposityMainPage != null) {
      oposityMainPage.style.opacity = '1'
    }
  }

  goToChangePassword() {
    var displayPopupHide = document.getElementById('popup-change-pwd');
    if (displayPopupHide != null) {
      displayPopupHide.style.display = 'block';
    }

  }

  printTosterMsg(msg: any, msgCode: any) {
    this.appService.showToaster(msg, msgCode);
  }
  refreshToken() {
    this.refreshIt = true;
    var oposityMainPage = document.getElementById('card-body');
    if (oposityMainPage != null) {
      oposityMainPage.style.opacity = '0.6'
    }
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
