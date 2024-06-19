import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';


@Component({
  selector: 'app-banner-detail',
  templateUrl: './banner-detail.component.html',
  styleUrls: ['./banner-detail.component.css']
})
export class BannerDetailComponent implements OnInit {
  bannerdetail: any;
  bannerId: any;
  rootUrl: any;

  constructor(private spinner: NgxSpinnerService,
    private content: ContentService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    private _location: Location,) { }

  ngOnInit(): void {
    this.bannerId = this.route.snapshot.paramMap.get('id');
    this.rootUrl = environment.rootPathUrl;
    this.getBannerDetail();
  }

  backClicked() {
    this._location.back();
  }

  getBannerDetail() {
   this.spinner.show();
    this.content.bannerDetail(this.bannerId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.bannerdetail = response.data;
      }
    });
  }

}
