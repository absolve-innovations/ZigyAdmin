import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.data?.token}`
        }
      });
    }
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
          }
        },
        error => {
          // 401 means Unauthorised
          if (error.status === '403' || error.status === 401) {
            // this.router.navigate(["https://dev.zigykart.com/#/login"])
            window.open("https://dev.zigykart.com/#/login");
            console.error(error.status);
            console.error(error.message);
            localStorage.removeItem('currentUser');
          }
        }
      )
    );
  }
}
