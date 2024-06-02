import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Clone the request to add the new header
    const clonedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });

    // Pass on the cloned request instead of the original request
    return next.handle(clonedRequest);
  }
}
