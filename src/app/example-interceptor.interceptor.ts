import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Common } from './utility/common';

@Injectable()
export class ExampleInterceptor implements HttpInterceptor {

  commonUrls: Common = new Common;

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const reqCopy = req.clone()
    //      //can set new header
    //      reqCopy.headers.set({"ExampleHeader": "Test Data"})

    //      //can modify header
    //      reqCopy.headers.append({"Content-Type": "multipart/form-data"})

    //     //can delete header
    //       reqCopy.headers.delete("Content-Type")

    //      return next.handle(reqCopy);
    let sessionToken = localStorage.getItem("loginToken") || "";
    if (request.url === `${this.commonUrls?.baseUrl}${this.commonUrls.authUrl}${this.commonUrls.login}`) {
           return next.handle(request);
    }
    //  else if(request.url === `${this.commonUrls.baseUrl}${this.commonUrls.authUrl}${this.commonUrls.refreshToken}`) {
    //   return next.handle(request.clone({
    //     setHeaders: { authorization: `Bearer ${sessionToken}`}
    //   }));
    //}
    else {
      return next.handle(request.clone({
        setHeaders: { authorization: `Bearer ${sessionToken}` }
      }));
    }
  }
}
