import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  rootUrl: any;
  productId: any;
  productDetail: any;
  show = false;
  isCollapsed: boolean = true;
  description: any;
  constructor(private content: ContentService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.productId = this.route.snapshot.queryParams['id'];
    this.getProductDetail();
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  backClicked() {
    this._location.back();
  }

  /** get product detail **/

  getProductDetail() {
    this.spinner.show();
    this.content.getProductDetail(this.productId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages);
        this.productDetail = response.data
        this.description = response.data.productDescription
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });

  }



}
