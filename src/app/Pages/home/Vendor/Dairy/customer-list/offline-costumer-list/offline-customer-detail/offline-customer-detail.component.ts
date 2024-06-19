import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-offline-customer-detail',
  templateUrl: './offline-customer-detail.component.html',
  styleUrls: ['./offline-customer-detail.component.css']
})
export class OfflineCustomerDetailComponent implements OnInit {
  customerId!: string | null;
  rootUrl!: string;
  detail: any;

  constructor(private content: ContentService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;

    this.customerId = this.route.snapshot.paramMap.get('id');
    this.getCustomeroffline();
  }

  getCustomeroffline() {

    this.content.getofflineCustomerDetail(this.customerId).subscribe(response => {
      if (response.isSuccess) {
        this.detail = response.data
      }
    });

  }


  backClicked() {
    this._location.back();
  }

}
