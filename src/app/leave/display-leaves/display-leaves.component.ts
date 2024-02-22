import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeResponse } from 'src/app/employee/models/employee.dto';
import { LeaveRejectRequest, LeaveRequest, LeaveResponse, LeaveType } from '../models/leave';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from '../../services/leave-service';
import { AppComponent } from 'src/app/app.component';
import { MatSort } from '@angular/material/sort';
import { pageRequest } from 'src/app/utility/pageRequest';
import { LeaveTypeConstant, SortingOrder } from 'src/app/utility/constant';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EmployeeService } from 'src/app/services/employee.services';

@Component({
  selector: 'app-display-leaves',
  templateUrl: './display-leaves.component.html',
  styleUrls: ['./display-leaves.component.css']
})
export class DisplayLeavesComponent implements OnInit {

  @ViewChild('paginator') leavePaginatorSize!: MatPaginator;
  // @ViewChild('paginator') paginatorSize!: MatPaginator;
  @ViewChild('leaveDetailsSort') leaveDetailsSort = new MatSort();

  rejectMsgForm!: FormGroup;
  employeeCode!: string;
  leaveId!: number;
  pageSizeOptionsArray: number[] = [];
  pageLength: number = 0;
  showRejectionInput: boolean = true;
  personalDetails: EmployeeResponse = new EmployeeResponse();
  leaveRequest: LeaveRejectRequest = {};
  leaveResponse: LeaveResponse[] = [];
  dataSourceLeaveResponse = new MatTableDataSource<LeaveResponse>(this.leaveResponse);
  paginationRequest: pageRequest = new pageRequest();
  isLinear = false;
  showDetailsOnSecond: boolean = true;
  showDetailsOnFirst: boolean = true;
  showMessage = true;
  leaveResponseColums: any[] = ['employee', 'employeeName', 'designationName', 'leaveType', 'fromDate', 'toDate', 'remark', 'status', 'action'];
  leaveType: LeaveType[] = [{ id: 1, leaveTypeName: LeaveTypeConstant.SICK_LEAVE, leaveTypeValue: "SICK_LEAVE" }, { id: 2, leaveTypeName: LeaveTypeConstant.CASUAL_LEAVE, leaveTypeValue: "CASUAL_LEAVE" }, { id: 3, leaveTypeName: LeaveTypeConstant.PRIVILEGE_LEAVE, leaveTypeValue: "PRIVILEGE_LEAVE" }];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private adminService: LeaveService,
    private appService: AppComponent,
    private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.paginationRequest.itemPerPage = 3
    this.paginationRequest.pageNumber = 0
    this.paginationRequest.sortingField = "employee"
    this.paginationRequest.sortingOrder = SortingOrder.ASC
    this.getListOfEmployeeOnLeave();
    this.rejectMsgForm = this.formBuilder.group({
      rejectionMessage: ['', Validators.required]
    });
  }
  ngAfterViewInit() {
    this.leaveDetailsSort.disableClear = true;
    this.dataSourceLeaveResponse.sort = this.leaveDetailsSort;
  }

  sortChange(field: any) {
    console.log("Sort change", field);
    this.paginationRequest.sortingField = field.active
    if (field.direction === 'desc') {
      this.paginationRequest.sortingOrder = SortingOrder.DEC
    } else {
      this.paginationRequest.sortingOrder = SortingOrder.ASC
    }
    this.getListOfEmployeeOnLeave()
  }

  onChangeLeavePage(page: PageEvent) {
    console.log("Page changes : ", page)
    this.paginationRequest.itemPerPage = page.pageSize
    this.paginationRequest.pageNumber = page.pageIndex
    this.getListOfEmployeeOnLeave();
  }

  getListOfEmployeeOnLeave() {
    console.log("Leave Pagination Req ", this.paginationRequest);
    this.adminService.listOfAllEmployeesLeave(this.paginationRequest)
      .subscribe({
        next: (data) => {
          this.leavePaginatorSize.length = data.data.totalItem;
          this.leaveResponse = [];
          var result = data.data.pages.forEach((element: any) => {
            element.leaveType = this.leaveType.find(i => i.leaveTypeValue === element?.leaveType)?.leaveTypeName;
            if (element.status === 'APPROVED') {
              element.statusMessage = "Leave Approved"
              element.messageShow = false
            }
            else if (element.status === 'REJECTED') {
              element.statusMessage = "Leave Rejected"
              element.messageShow = false
            }
            else {
              element.statusMessage = "";
              element.messageShow = true;
            }
          });
          this.dataSourceLeaveResponse = data.data.pages;
        },
        error: (error) => {
          console.log("Error", error);
          this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
        },
        complete: () => {
          this.dataSourceLeaveResponse.paginator = this.leavePaginatorSize;
        }
      });
  }

  showPersonalDetailsOnFirst(event: any) {
    console.log("value :", event.target.id);
    this.getEmployeeById(event.target.id);
  }

  getEmployeeById(empCode: string) {
    this.employeeService.getEmployeeDetailsById(empCode)
      .subscribe((data: any) => {
        console.log("Get employee by id : ", data)
        this.personalDetails = data.data;
        this.showDetailsOnFirst = false;
        this.showRejectionInput = true;
        var oposityMainPage = document.getElementById('card-body');
        if (oposityMainPage != null) {
          oposityMainPage.style.opacity = '0.6'
          this.showDetailsOnFirst = false;
        }
      },
        error => {
          console.log("Error", error);
          this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
        });
  }

  approveLeave(id: any, empCode: any) {
    var oposityMainPage = document.getElementById('card-body');
    if (oposityMainPage != null) {
      oposityMainPage.style.opacity = '0.6'
      this.showDetailsOnFirst = false;
    }
    this.leaveRequest.leaveId = id;
    this.leaveRequest.employeeCode = empCode;
    this.leaveRequest.status = "APPROVED";
    this.updateLeaveStatus(this.leaveRequest);
  }
  rejectLeave(id: any, empCode: any) {
    var oposityMainPage = document.getElementById('card-body');
    if (oposityMainPage != null) {
      oposityMainPage.style.opacity = '0.6'
      this.showDetailsOnFirst = false;
    }
    var displayModal = document.getElementById('show-pr-details');
    if (displayModal != null) {
      displayModal.style.display = 'none';
      this.showRejectionInput = false;
    }
    this.employeeCode = empCode;
    this.leaveId = id;
  }
  onSubmitRejectionMsg() {
    if (this.rejectMsgForm.valid) {
      this.leaveRequest.leaveId = this.leaveId;
      this.leaveRequest.employeeCode = this.employeeCode;
      this.leaveRequest.status = "REJECTED";
      this.leaveRequest.rejectReason = this.rejectMsgForm.value.rejectionMessage
      this.updateLeaveStatus(this.leaveRequest)
      var displayModal = document.getElementById('show-pr-details');
      if (displayModal != null) {
        displayModal.style.display = 'none';
        this.showRejectionInput = true;
      }
    }
  }

  updateLeaveStatus(leaveRequest: LeaveRequest) {
    this.adminService.updateLeaveStatus(leaveRequest)
      .subscribe(data => {
        console.log(data);
        this.getListOfEmployeeOnLeave()
        this.showMessage = false
        this.printTosterMsg(data.responseMessage, data.responseCode);
      },
        error => {
          console.log("Error", error);
          this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
        });

    console.log("Update status : ", event);
  }


  hidePopup(id: any) {
    console.log("Hide :", id)
    var oposityMainPage = document.getElementById('card-body');
    if (oposityMainPage != null) {
      oposityMainPage.style.opacity = '1'

    }
    this.showDetailsOnFirst = true;
    this.showDetailsOnSecond = true;
    this.showRejectionInput = true;
  }

  printTosterMsg(msg: any, msgCode: any) {
    this.appService.showToaster(msg, msgCode);
  }
  logOut() {
    this.appService.clearLocalStorage();
    this.router.navigate(['login']);
  }

}
