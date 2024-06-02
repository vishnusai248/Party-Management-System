import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { api_url } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {
  httpOptions:any
  constructor(private http:HttpClient) {
    
   }

  loginapi(payload:any):Observable<any>{
    return this.http.post<any>(api_url+'/login/',payload).pipe(
      map((res:any)=>{
        sessionStorage.setItem('userData', res)
        return res;
        }),
      catchError((err:any)=>{
        
        return of(err.error)
      }

      )
    );
    
  }
  logoutapi():Observable<any>{
    
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Token " + sessionStorage.getItem("token")?.toString()
      })
    };
    return this.http.post<any>(api_url+'/logout/','',this.httpOptions).pipe(
      map((res:any)=>{
        return res;
        }),
      catchError((err:any)=>{
        console.log(err)
        return of(err)
      }

      )
    );
    
  }

  
}
