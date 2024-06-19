import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-earning-list',
  templateUrl: './earning-list.component.html',
  styleUrls: ['./earning-list.component.css']
})
export class EarningListComponent implements OnInit {
  // serach 
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  rootUrl: any;
  earningList: any;
  totalEarning: any;
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.getEarningList();
  }

  getEarningList(){
    let payload = {
      pageNumber: 1,
      pageSize: 1000
    }
    this.content.getEarning(payload).subscribe(response => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        this.earningList = response.data.earningResponse;
        this.totalEarning = response.data.totalEarning;

      } else {
        this.toaster.error(response.messages);
      }
    });
  }

}
