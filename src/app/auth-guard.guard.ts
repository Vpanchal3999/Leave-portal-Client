import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// export const authGuardGuard: CanActivateFn = (route, state) => {
//   return true;
// };
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if(this.isLoggedIn()){
        return true;
      }
      this.router.navigate(['login'])
      return false;
  }

  isLoggedIn(){
    let token=localStorage.getItem("loginToken")
    if(token==undefined || token==''||token==null){
      return false;
    }
    else{
      return true;
    }
  }
}