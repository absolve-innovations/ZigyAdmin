import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfflineStatusService {
  private offlineStatus$ = new BehaviorSubject<boolean>(false);

  constructor() {
    window.addEventListener('online', () => this.checkOnlineStatus());
    window.addEventListener('offline', () => this.checkOnlineStatus());
    window.addEventListener('scroll', () => this.handleScroll());
  }

  private checkOnlineStatus() {
    const isOnline = navigator.onLine;
    this.offlineStatus$.next(!isOnline);

    if (isOnline) {
      this.reloadPage();
    }
  }

  private reloadPage() {
    location.reload();
  }

  private handleScroll() {
    if (!navigator.onLine) {
      // If offline, prevent scrolling
      window.scrollTo(0, 0);
    }
  }

  getOfflineStatus() {
    return this.offlineStatus$.asObservable();
  }
}
