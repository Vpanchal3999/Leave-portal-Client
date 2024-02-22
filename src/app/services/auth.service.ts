import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthDTO } from '../auth/model/auth.dto';
import { Common } from '../utility/common';
import { Observable } from 'rxjs';
import { EmployeeResponse } from '../employee/models/employee.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  employeeDetails: EmployeeResponse = new EmployeeResponse;
  commonUrls: Common = new Common;
  authDto: AuthDTO = new AuthDTO;
  constructor(private http: HttpClient) { }

  
  public testapi(): Observable<any> {
    var parameters = {"page":0,"size":10,"filterAction":"CC"};
    let queryParams = new HttpParams({ fromObject : parameters });
    
    
    console.log("test api");
    return this.http.get("http://192.168.3.100:8080/pgtopup/getTransactions",{params:queryParams});

  }
  public logIn(authDto: AuthDTO): Observable<any> {
    console.log("AuthService :: Login :=>",authDto);
    return this.http.post(`${this.commonUrls?.baseUrl}${this.commonUrls.authUrl}${this.commonUrls.login}`,authDto);

  }

  public changePassword(authDto: AuthDTO): Observable<Object> {
    console.log("AuthService :: changePassword :=>",authDto);
    return this.http.patch(`${this.commonUrls.baseUrl}${this.commonUrls.authUrl}${this.commonUrls.changePasswordUrl}`, authDto);
  }

  public forgotPassword(authDto: AuthDTO)
    : Observable<Object> {
    console.log("AuthService :: forgotPassword :=>",authDto);
    return this.http.post(`${this.commonUrls.baseUrl}${this.commonUrls.authUrl}${this.commonUrls.forgotPasswordUrl}`, authDto);
  }

  public refreshToken(isRefresh : boolean) :Observable<Object> {
      console.log("AuthService :: refreshToken : is refresh =>",isRefresh);
      let param = {"isRefreshToken":isRefresh}
      let queryParam = new HttpParams({ fromObject : param });
      return this.http.get(`${this.commonUrls.baseUrl}${this.commonUrls.authUrl}${this.commonUrls.refreshToken}`,{params:queryParam});

  }
}
