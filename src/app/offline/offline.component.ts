import { Component, OnInit } from '@angular/core';
import { OfflineStatusService } from '../Shared/service/onlineStatus.service ';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.css']
})
export class OfflineComponent implements OnInit {
  isOffline: boolean = false;
  constructor(private offlineStatusService: OfflineStatusService,)
  {}

  ngOnInit(): void {
    debugger
    this.offlineStatusService.getOfflineStatus().subscribe(status => {
      this.isOffline = status;
    });
  }

}
