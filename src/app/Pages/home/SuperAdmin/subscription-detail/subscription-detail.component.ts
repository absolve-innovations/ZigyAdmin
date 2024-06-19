import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.css']
})
export class SubscriptionDetailComponent implements OnInit {
  subscriptionDetailId!: string | null;
  rootUrl!: string;
  subscriptionDetail: any;
  constructor(private content: ContentService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.subscriptionDetailId = this.route.snapshot.paramMap.get('id');
    this.getSubscriptionDetail();
  }

  // Subscription Detail 
  getSubscriptionDetail() {
    let id = this.subscriptionDetailId;
    this.content.subscriptionDetail(id).subscribe(response => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        this.subscriptionDetail = response.data;
      } else {
        this.toaster.error(response.messages);
      }
    });
  }

  backClicked() {
    this._location.back();
  }

}
