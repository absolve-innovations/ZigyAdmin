import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { MessagingService } from './Shared/service/messaging-service';
import { OfflineStatusService } from './Shared/service/onlineStatus.service ';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JiffyAdmin';
  isOffline: boolean = false;
  message: any;
  androidLink = 'https://play.google.com/store/apps/details?id=com.app.zigykart';
  iosLink = 'https://apps.apple.com/us/app/zigy-kart/id6449185821';
  constructor(private router: Router,
    private messagingService: MessagingService,
    private offlineStatusService: OfflineStatusService) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    
    this.router.events.subscribe((defaultpage) => {
      if (defaultpage instanceof NavigationStart) {
        // tslint:disable-next-line: max-line-length
        if (defaultpage.url === '/login') {
          localStorage.removeItem('currentUser');
          this.disableBackButton();
        } else {
              // Enable back button on other pages
              this.enableBackButton();
        }
      }
    });

    this.messagingService.requestPermission();
    this.messagingService.receiveMessaging();
    
    this.message = this.messagingService.currentMessage
    this.isOffline = !navigator.onLine;

    // Add event listeners to detect changes in online/offline status
    window.addEventListener('online', () => this.handleOnlineStatusChange());
    window.addEventListener('offline', () => this.handleOnlineStatusChange());
  }

  ngOnDestroy(): void {
    // Remove event listeners when the component is destroyed
    window.removeEventListener('online', () => this.handleOnlineStatusChange());
    window.removeEventListener('offline', () => this.handleOnlineStatusChange());
  }

  handleOnlineStatusChange(): void {
    // Update isOffline based on the current online status
    this.isOffline = !navigator.onLine;
  }

  disableBackButton() {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href);
    };
 
  }

  enableBackButton() {
    window.onpopstate = null;
  }
}