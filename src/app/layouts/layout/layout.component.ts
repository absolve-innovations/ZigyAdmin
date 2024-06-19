import { Component, OnInit, Output, EventEmitter, NgZone, } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Shared/service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  showToggle: boolean = false;
  show: boolean = false;
  @Output() collapseSideNav = new EventEmitter();
  notificationList: any;
  count: any;
  vendorId = localStorage.getItem('id');
  daysLeft:any
  userRole:any;
  login:any;

  constructor(private auth: AuthService,
    private ngZone: NgZone,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,) {
     }

  ngOnInit(): void {
    this.getNotificationList();
    this.getCounterMessage();

    this.login = localStorage.getItem('user');
   
  }

   /******** Toggle side nav *********/
   /********* Toggle side nav **********/
   sideNavDisplay(event: any) {
    /* Storing user's device details in a variable*/
    let details = navigator.userAgent;

    /* Creating a regular expression 
    containing some mobile devices keywords 
    to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i;

    /* Using test() method to search regexp in details
    it returns boolean value*/
    let isMobileDevice = regexp.test(details);

    if (isMobileDevice) {
      var element = document.getElementById("sideBar");
      if (element?.classList.contains("sidebar-mobile-open")) {
        element?.classList?.remove("sidebar-mobile-open");
        this.showToggle = !this.showToggle;
      } else {
        this.showToggle = !this.showToggle;
        element?.classList?.add("sidebar-mobile-open");
      }

      } else {

      var element = document.getElementById("sideBar");

      if (element?.classList.contains("closed-sidebar")) {
        element?.classList?.remove("closed-sidebar");
      } else {
        element?.classList?.add("closed-sidebar");
      }
    }
    // this.show = event.target.value;
  }



  sideNav() {
    /* Storing user's device details in a variable*/
    let details = navigator.userAgent;

    /* Creating a regular expression 
    containing some mobile devices keywords 
    to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i;

    /* Using test() method to search regexp in details
    it returns boolean value*/
    let isMobileDevice = regexp.test(details);
    if (!isMobileDevice) {
      this.show = !this.show;
      this.collapseSideNav.emit(this.show);
    }
  }

// toggle  

  onToggle() {
    this.showToggle = !this.showToggle;
  }


   /* log-out */
   logouts() {
    localStorage.clear();
    this.auth.logout();
 }

// notification list
getNotificationList() {
        let payload = {
          pageNumber: 1,
          pageSize: 1000
        }
    // this.spinner.show();
    this.auth.getAllNotifactonList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.notificationList = response.data.dataList;
        this.count = response.totalCount;
        this.getNotifictionCount();
      }
    });
  }


  getReadNotiction() {
    // this.spinner.show();
    this.auth.getReadNotictions().subscribe(response => {
      if (response.isSuccess) {
        this.getNotificationList();
      }
    });
  }

  getNotifictionCount() {
    
    // this.spinner.show();
    this.auth.getNotifictionsCount().subscribe(response => {
      if (response.isSuccess) {
        // this.ngZone.run(() => { this.getNotifictionCount(); })
        this.count = response.data.notificationCount;
      }
    });
  }

  
  
deleteAllNotification() {
this.spinner.show();

this.auth.deleteNotification().subscribe(response => {
  if (response.isSuccess) {
    this.spinner.hide();
    this.ngZone.run(() => { this.getNotificationList(); })
    this.toaster.success(response.messages);
  } else {
    this.spinner.hide();
    this.toaster.error(response.messages);
  }
});
}


deleteSingleNotification(notificationSentId:any) {
  this.spinner.show();
  this.auth.deleteSingleNotifications(notificationSentId).subscribe(response => {
    if (response.isSuccess) {
      this.spinner.hide();
      this.ngZone.run(() => { this.getNotificationList(); })
      this.toaster.success(response.messages);
    } else {
      this.spinner.hide();
      this.toaster.error(response.messages);
    }
  });
}

getCounterMessage(){
  this.auth.getCounterMessage(this.vendorId).subscribe(response => {
    if(response.isSuccess){
      this.daysLeft = response.data.message;
    }
  })
}

}
