import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ApiEndPoint } from '../enums/api-end-point';
import { Login } from '../models/login';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;
  constructor(private http: HttpClient,
    private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // get current user value //
  public get currentUserValue(): Login {
    return this.currentUserSubject.value;
  }

  // Admin Login //

  login(user: Login) {

    return this.http.post<any>(environment.apiUrl + ApiEndPoint.login, user)
      .pipe(map(user => {
        if (user.data) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('id', user.data.id);
          localStorage.setItem('vendorId', user.data.vendorId);
          localStorage.setItem('profilepic', user.data.profilepic);
          localStorage.setItem('shopImage', user.data.shopImage);
          localStorage.setItem('shopId', user.data.shopId);
          localStorage.setItem('firstName', user.data.firstName);
          localStorage.setItem('shopName', user.data.shopName);
          localStorage.setItem('user', user.data.role);
          localStorage.setItem('planType', user.data.planType);
          localStorage.setItem('distributorId', user.data.id);
          localStorage.setItem('fname', user.data.firstName);
          localStorage.setItem('lname', user.data.lastName);
          this.currentUserSubject.next(user);
        } else {
          this.router.navigateByUrl('/login');
        }
        return user;
      }));
  }

  // On Logout
  logout() {
    localStorage.clear();
    localStorage.removeItem("currentUser");
    localStorage.removeItem('user');
    this.router.navigate([''])
      .then(() => {
        window.location.reload();
      });
  }


  getAllNotifactonList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getNotifactionsList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize).pipe(map((data: any) => {
      return data;
    }));
  }

  fcmToken(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.tockenFcm, data).pipe(map((data: any) => {
      return data;
    }));
  }

  getReadNotictions() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getReadNotiction);
  }

  getNotifictionsCount() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getNotifictionCount);
  }

  deleteNotification() {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteAllNotification);
  }

  deleteSingleNotifications(notificationSentId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteAllNotification + '?notificationSentId=' + notificationSentId);
  }

  getCounterMessage(vendorId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.counterMessage + '?vendorId=' + vendorId);
  }

}
