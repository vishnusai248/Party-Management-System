

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  currentpath:any
  constructor(private router: Router,private location :Location) {
  }

  canActivate() {
  // 
    this.currentpath = this.location.path();
    const token=sessionStorage.getItem('token')
    if(token !=null ){
      return true;
    }  
    else{
      this.router.navigate(['login'])
      return false
    }

    
  }
}
