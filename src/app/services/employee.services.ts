import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EmployeeRegistrationRequest } from '../employee/models/employee.dto';
import { Observable } from 'rxjs';
import { EmployeeResponse } from '../employee/models/employee.dto';
import { EmployeeUpdateRequest } from '../employee/models/employee.dto';
import { Common } from '../utility/common';
import { LeaveRequest } from '../leave/models/leave';
import { pageRequest } from '../utility/pageRequest';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  commonUrls: Common = new Common;
  employee: EmployeeRegistrationRequest = new EmployeeRegistrationRequest();
  employeeResponse: EmployeeResponse = new EmployeeResponse; 
  constructor(private http: HttpClient) { }

  public registerEmployee(employee: EmployeeRegistrationRequest): Observable<EmployeeResponse> {
    return this.http.post(`${this.commonUrls.baseUrl}${this.commonUrls.employeeUrl}${this.commonUrls.registerEmployeeUrl}`, employee); 
  }

  public getAllEmployeeDetails(pagination:pageRequest): Observable<any> {
    var parameters = {"pageNumber":pagination.pageNumber,"itemPerPage":pagination.itemPerPage,"sortingOrder":pagination.sortingOrder,"sortingField":pagination.sortingField};
    let queryParams = new HttpParams({ fromObject : parameters });
    return this.http.get(`${this.commonUrls.baseUrl}${this.commonUrls.employeeUrl}${this.commonUrls.getAllEmployeeDetailsUrl}`,{params:queryParams}); 
  }

  public getEmployeeDetailsById(empCode: string): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.commonUrls.baseUrl}${this.commonUrls.employeeUrl}/${empCode}`);
  }

  public updateEmployeeDetails(empCode: string, updateEmployeeRequest: EmployeeUpdateRequest): Observable<any> {
    return this.http.put(`${this.commonUrls.baseUrl}${this.commonUrls.employeeUrl}${this.commonUrls.updateEmployeeDetailsUrl}/${empCode}`, updateEmployeeRequest);
  }
  
  public getDesignations(): Observable<any> {
    return this.http.get<Object[]>(`${this.commonUrls.baseUrl}${this.commonUrls.adminUrl}${this.commonUrls.listOfAllDesignationUrl}`);
  }

  public activeEmployeDetails(empCode: string,isActive:boolean): Observable<any> {
    // let param = {"isActive":isActive};
    let queryParams = new HttpParams().set("isActive",isActive);
    return this.http.patch(`${this.commonUrls.baseUrl}${this.commonUrls.employeeUrl}${this.commonUrls.activeEmployee}/${empCode}`,queryParams);
  }

  public deActiveEmployeeDetails(empCode?: string): Observable<any> {
    return this.http.delete(`${this.commonUrls.baseUrl}${this.commonUrls.employeeUrl}${this.commonUrls.deActiveEmployee}/${empCode}`);

  }

}
