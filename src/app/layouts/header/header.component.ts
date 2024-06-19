import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/service/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() collapseSideNav = new EventEmitter();
  show!: boolean | false;
  showToggle!: boolean;
  notifactionList: any;
  count: any;
  vendorId = localStorage.getItem('id');
  daysLeft:any
  constructor(private auth: AuthService) { }


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
    this.show = !this.show;
    this.collapseSideNav.emit(this.show);
  }

  onToggle() {
    this.showToggle = !this.showToggle;
  }

  ngOnInit(): void {
    this.getNotifactionList();
  }


  /* log-out */
  logouts() {
    localStorage.clear();
    this.auth.logout();
  }

  // notification list
  getNotifactionList() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000
    }

    // this.spinner.show();
    this.auth.getAllNotifactonList(payload).subscribe(response => {
      if (response.status) {
        this.notifactionList = response.data;
        this.count = response.notificationCount
      }
    });
  }


  getCounterMessage(){
    this.auth.getCounterMessage(this.vendorId).subscribe(response => {
      if(response.isSuccess){
        this.daysLeft = response.data.message

      }
    })
  }

}
