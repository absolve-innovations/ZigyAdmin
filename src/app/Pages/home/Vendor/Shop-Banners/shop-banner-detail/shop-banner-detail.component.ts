import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shop-banner-detail',
  templateUrl: './shop-banner-detail.component.html',
  styleUrls: ['./shop-banner-detail.component.css']
})
export class ShopBannerDetailComponent implements OnInit {
  ShopBannerdetail: any;
  rootUrl: any;
  vendorId: any;
  shopBannerId: any;

  constructor(private spinner: NgxSpinnerService,
    private content: ContentService,
    private toasterService: ToastrService,
    private _location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.shopBannerId = this.route.snapshot.paramMap.get('id');
    this.rootUrl = environment.rootPathUrl;
    this.getShopBannerDetail();
  }
  backClicked() {
    this._location.back();
  }

    getShopBannerDetail() {
    this.spinner.show();
     this.content.shopBannerDetail(this.shopBannerId).subscribe(response => {
       if (response.isSuccess) {
         this.spinner.hide();
         this.ShopBannerdetail = response.data;
        
       } else {
        this.spinner.hide();
       }
 
     });
   }

}
