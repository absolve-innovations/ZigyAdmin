import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sub-sub-category',
  templateUrl: './sub-sub-category.component.html',
  styleUrls: ['./sub-sub-category.component.css'],
})
export class SubSubCategoryComponent implements OnInit {
  rootUrl!: string;
  categoryList: any;
  login = localStorage.getItem('role');
  // serach
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  Id: any;
  isActive: boolean = true;
  unActive: boolean = false;
  shopDetail: any;
  vendorDetail: any;
  shopId: any;
  vendorId = localStorage.getItem('vendorId');
  MainProductCategoryId: any;
  SubProductCategoryId: any;
  subSubProductCategoryId: any;
  constructor(
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.rootUrl = environment.rootPathUrl;
    this.getvendorDetail();
    this.getList();
  }

  backClicked() {
    this._location.back();
  }

  checkActiveStatus(data: any) {
    this.isActive = !this.isActive;
    if (this.isActive == true) {
      this.postActiveStatus(data);
    } else if (this.isActive == false) {
      this.postUnActiveStatus(data);
    }
  }

  checkInactiveStatus(data: any) {
    this.unActive = !this.unActive;
    if (this.unActive == true) {
      this.postActiveStatus(data);
    } else if (this.unActive == false) {
      this.postUnActiveStatus(data);
    }
  }

  postActiveStatus(data: any) {
    let payload = {
      subSubProductCategoryId: data,
      shopId: this.shopId,
      status: true,
    };
    this.content.statusPostCategory(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        window.location.reload();
      } else {
        this.toaster.error(response.messages);
      }
    });
  }

  postUnActiveStatus(data: any) {
    let payload = {
      subSubProductCategoryId: data,
      shopId: this.shopId,
      status: false,
    };
    this.content.statusPostCategory(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        window.location.reload();
      } else {
        this.toaster.error(response.messages);
      }
    });
  }

  getvendorDetail() {
    this.spinner.show();
    this.content.getVendorDetail(this.vendorId).subscribe((response) => {
      if (response.isSuccess) {
        this.vendorDetail = response.data;
        this.shopId = this.vendorDetail.shopResponses[0]?.shopId;
        this.getList();
      }
      this.spinner.hide();
    });
  }

  // set condition to list
  getList() {
    if (this.login == 'SuperAdmin') {
      this.getSubcategory();
    } else if (this.login == 'Admin') {
      this.getSubcategory();
    } else {
      this.getSubcategoryList();
    }
  }

  // super and admin
  getSubcategory() {
    this.spinner.show();
    (this.SubProductCategoryId = parseInt(this.Id)),
      this.content
        .SubCategorySupers(this.SubProductCategoryId)
        .subscribe((response) => {
          if (response.isSuccess) {
            this.categoryList = response.data;
            this.spinner.hide();
          }
        });
  }

  // Vendor
  getSubcategoryList() {
    this.spinner.show();
    let payload = {
      SubProductCategoryId: parseInt(this.Id),
      ShopId: this.shopId,
    };
    this.content.SubSubCategorys(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.categoryList = response.data;
        this.spinner.hide();
      }
    });
  }

  delet(data: any) {
    this.subSubProductCategoryId = data.subSubProductCategoryId;
  }

  deleteSubCategory() {
    this.spinner.show();
    this.content
      .subsubCategoryDelete(this.subSubProductCategoryId)
      .subscribe((response) => {
        if (response.isSuccess) {
          this.spinner.hide();
          window.location.reload();
          this.toaster.success(response.messages);
        } else {
          this.spinner.hide();
          this.toaster.error(response.messages);
        }
      });
  }
}
