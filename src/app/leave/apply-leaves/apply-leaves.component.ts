import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaveRequest, LeaveResponse, LeaveType } from '../models/leave';
import { LeaveTypeConstant, SortingOrder } from 'src/app/utility/constant';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from '../../services/leave-service';
import { AppComponent } from 'src/app/app.component';
import { pageRequest } from 'src/app/utility/pageRequest';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-apply-leaves',
  templateUrl: './apply-leaves.component.html',
  styleUrls: ['./apply-leaves.component.css']
})
export class ApplyLeavesComponent implements OnInit{
 
  @ViewChild('paginator') paginatorSize!: MatPaginator;

  empCode!: string;
  submitted:boolean = false;
  leaveRequest: LeaveRequest = {};
  requestedLeaves: LeaveResponse[] = [];
  paginationRequest:pageRequest = new pageRequest();
  dataSourceEmployeeLeave= new MatTableDataSource<LeaveResponse>(this.requestedLeaves);
  leaveType:LeaveType [] = [{id:1,leaveTypeName : LeaveTypeConstant.SICK_LEAVE,leaveTypeValue:"SICK_LEAVE"},{id:2,leaveTypeName:LeaveTypeConstant.CASUAL_LEAVE,leaveTypeValue:"CASUAL_LEAVE"},{id:3,leaveTypeName:LeaveTypeConstant.PRIVILEGE_LEAVE,leaveTypeValue:"PRIVILEGE_LEAVE"}]; 
  leaveTypeName?:string;
  leaveRequestForm!:FormGroup
  refreshIt:boolean=false;
  leaveEmployeeListColumn:any[] = ['leaveType','fromDate','toDate','remark','status','message'];

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: LeaveService,
    private appService: AppComponent) {
  }


  ngOnInit(): void {
    this.empCode = this.route.snapshot.params['empCode'];
    this.paginationRequest.itemPerPage = 3
    this.paginationRequest.pageNumber = 0
    this.paginationRequest.sortingField = "employee"
    this.paginationRequest.sortingOrder = SortingOrder.ASC
    this.leaveRequestByEmployee(this.empCode);
    this.formValue();
  }

  formValue(){
    this.leaveRequestForm = this.formBuilder.group({
      employeeCode:[''],
      leaveId:[''],
      leaveType:['',Validators.required],
      remark:['',Validators.required],
      fromDate:['',Validators.required],
      toDate:['',Validators.required],
      status:['']
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.leaveRequestForm.controls;
  }

  changeLeaveType(e:any){
    console.log("Change leaveType: ",e)
    this.leaveTypeName = this.leaveType.find(i => i.id === e.value.id)?.leaveTypeValue;
  }

  onLeaveSubmit(){
    this.submitted = true;
    this.leaveRequest = this.leaveRequestForm.value;
    this.leaveRequest.leaveType = this.leaveTypeName;
    this.leaveRequest.employeeCode = this.empCode;
    this.applyLeaveRequest(this.leaveRequest);
  }

  onChangePage(page:PageEvent){
    console.log("Page changes : ",page)
    this.paginationRequest.itemPerPage = page.pageSize
    this.paginationRequest.pageNumber = page.pageIndex
    this.leaveRequestByEmployee(this.empCode)
  }
  sortChange(field: any){
    console.log("Sort change",field);
    this.paginationRequest.sortingField = field.active
     if(field.direction === 'desc') {
        this.paginationRequest.sortingOrder = SortingOrder.DEC
    } else {
      this.paginationRequest.sortingOrder =SortingOrder.ASC
    }
    this.leaveRequestByEmployee(this.empCode)
  }

  leaveRequestByEmployee(empCode: string) {
    this.adminService.getRequestedLeavesByEmployee(empCode,this.paginationRequest)
    .subscribe({
      next: (data) => {
        data.data.pages.forEach((element : any) =>{
          element.leaveType = this.leaveType.find(i => i.leaveTypeValue === element?.leaveType)?.leaveTypeName  ;
        });
        this.dataSourceEmployeeLeave = data.data.pages;
        this.paginatorSize.length = data.data.totalItem;
      },
      error: (error) => {
        console.log("Error", error);
          this.printTosterMsg(error.error.data.responseMessage, error.error.data.responseCode);
          if (error.error.responseCode === 401) {
            this.refreshToken();
          }
      },
      complete: () => {
        this.dataSourceEmployeeLeave.paginator = this.paginatorSize;
      }
    });
  }

  applyLeaveRequest(request:any) {
    this.adminService.applyLeaveForEmployee(request)
      .subscribe(data => {
        console.log("Success fully apply leave!: ", data);
        if (data.responseCode === 200 || data.responseCode === 201) {
          this.leaveRequestByEmployee(this.empCode);
          this.leaveRequest = {};
          this.printTosterMsg(data.responseMessage, data.responseCode);
        }
      },
        error => {
          console.log("Error", error);
          this.printTosterMsg(error.error.responseMessage, error.error.responseCode);
          if (error.error.responseCode === 401) {
            this.refreshToken();
          }
        });
  }


  refreshToken() {
    this.refreshIt = true;
    // var oposityMainPage = document.getElementById('card-body');
    // if (oposityMainPage != null) {
    //   oposityMainPage.style.opacity = '0.6'
    // }
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
