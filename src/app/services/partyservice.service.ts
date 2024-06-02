import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { api_url } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class PartyserviceService {
  httpOptions:any
  constructor(private http:HttpClient) { }

  getparties():Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Token " + sessionStorage.getItem("token")?.toString()
      })
    };
    return this.http.get<any>(api_url + '/party/',this.httpOptions).pipe(
      map((res:any)=>{
        return res;
        }),
    )
  }

  addpartyapi(payload:any):Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Token " + sessionStorage.getItem("token")?.toString()
      })
    };
    return this.http.post<any>(api_url + '/party/',payload,this.httpOptions).pipe(
      map((res:any)=>{
        return res;
        }),
        catchError((err:any)=>{
          return of(err)
        })
      )
      
  }

  editpartyapi(id:any,payload:any):Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Token " + sessionStorage.getItem("token")?.toString()
      })
    };
    return this.http.put<any>(api_url + '/party/?id='+id,payload,this.httpOptions).pipe(
      map((res:any)=>{
        return res;
        }),
        catchError((err:any)=>{
          return of(err)
        })
      )
      
  }
  
  getpartyapi(id:any):Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Token " + sessionStorage.getItem("token")?.toString()
      })
    };
    return this.http.get<any>(api_url + '/party/?id=' + id,this.httpOptions).pipe(
      map((res:any)=>{
        return res;
        }),
        catchError((err:any)=>{
          return of(err)
        })
    )

  }

  deletepartyapi(id:any):Observable<any>{
   this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Token " + sessionStorage.getItem("token")?.toString()
      })
    };
    return this.http.delete<any>(api_url + '/party/?id=' + id,this.httpOptions).pipe(
      map((res:any)=>{
        return res;
        }),
        catchError((err:any)=>{
          return of(err)
        })
    )

  }
}
