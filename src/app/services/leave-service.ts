import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveAudit, LeaveRejectRequest, LeaveRequest } from '../leave/models/leave';
import { Common } from '../utility/common';
import { EmployeeResponse } from '../employee/models/employee.dto';
import { pageRequest } from '../utility/pageRequest';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  commonUrls: Common = new Common;
  employeeDto: EmployeeResponse = new EmployeeResponse;
  leaveAudit: LeaveAudit = new LeaveAudit;
  // upadateLeaveRequest : LeaveRejectRequest = {};

  constructor(private http: HttpClient) { }

  public applyLeaveForEmployee(leaveRequest: LeaveRequest): Observable<any> {
    return this.http.post(`${this.commonUrls.baseUrl}${this.commonUrls.employeeUrl}${this.commonUrls.applyLeaveForEmployeeUrl}`, leaveRequest);
  }

  public updateLeaveStatus(upadateLeaveRequest:LeaveRejectRequest): Observable<any> {
    return this.http.patch(`${this.commonUrls.baseUrl}${this.commonUrls.adminUrl}${this.commonUrls.updateLeaveStatusUrl}`, upadateLeaveRequest);
  }

  public listOfAllEmployeesLeave(pagination:pageRequest): Observable<any> {
    var parameters = {"pageNumber":pagination.pageNumber,"itemPerPage":pagination.itemPerPage,"sortingOrder":pagination.sortingOrder,"sortingField":pagination.sortingField};
    let queryParams = new HttpParams({ fromObject : parameters });
    return this.http.get<Object>(`${this.commonUrls.baseUrl}${this.commonUrls.adminUrl}${this.commonUrls.listOfEmployeeOnLeaveUrl}`,{params:queryParams});
  }

  public getRequestedLeavesByEmployee(empCode: String,pagination:pageRequest ): Observable<any> {
    var parameters = {"pageNumber":pagination.pageNumber,"itemPerPage":pagination.itemPerPage,"sortingOrder":pagination.sortingOrder,"sortingField":pagination.sortingField};
    let queryParams = new HttpParams({ fromObject : parameters });
    return this.http.get<Object[]>(`${this.commonUrls.baseUrl}${this.commonUrls.employeeUrl}${this.commonUrls.appliedLeavesByEmployee}/${empCode}`,{params:queryParams});
  }
}
