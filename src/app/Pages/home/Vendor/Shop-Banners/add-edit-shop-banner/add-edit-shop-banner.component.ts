import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-shop-banner',
  templateUrl: './add-edit-shop-banner.component.html',
  styleUrls: ['./add-edit-shop-banner.component.css']
})
export class AddEditShopBannerComponent implements OnInit {
  categoryList: any;
  subCategoryList: any;
  SubSubcategoryList: any;
  form: any;
  imageFile!: { link: any; file: any; name: any; type: any; };
  shopId: any
  vendorDetail: any;
  shopDetail: any;
  vendorId: any;
  visible!: boolean;
  bannerTypeControl: FormControl = new FormControl('');
  visible1!: boolean;
  brandList: any;
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private _location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.vendorId = localStorage.getItem('vendorId');
    this.getcategoryList();
    this.getbrandList();
    this.getvendorDetail();

    this.form = this.formBuilder.group({
      bannerType: this.bannerTypeControl,
      ShopCategoryBanner: [''],
      mainProductCategoryId: [''],
      subProductCategoryId: [''],
      subSubProductCategoryId: [''],
      BrandId: ['']
    });
  }


  get f() {
    return this.form['controls'];
  }

  get s() {
    return this.form['controls'];
  }

  get d() {
    return this.form['controls'];
  }

  backClicked() {
    this._location.back();
  }

  /*** Category List ***/
  getcategoryList() {
    this.spinner.show();
    this.content.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
        this.form.get('subProductCategoryId').setValue('');
        this.form.get('subSubProductCategoryId').setValue('');
        this.subCategoryList = [];
        this.SubSubcategoryList = [];
        this.spinner.hide();
      } else {
        this.categoryList = [];
        this.subCategoryList = [];
        this.spinner.hide();
        // this.toaster.error(response.messages);
      }
    });
  }

  /*** Sub  Category List ***/

  getSubcategoryList(data: any) {

    // this.spinner.show();
    this.content.SubCategorySuper(data).subscribe(response => {
      if (response.isSuccess) {
        this.subCategoryList = response.data;
        this.form.get('subSubProductCategoryId').setValue('');
        this.SubSubcategoryList = [];
        this.spinner.hide();
      } else {
        this.subCategoryList = [];
        this.SubSubcategoryList = [];
        // this.toaster.error(response.messages);
      }
    });
  }

  /*** Sub Sub Category List ***/

  getSubSubcategoryList(data: any) {
    this.spinner.show();
    this.content.SubSubCategory(data).subscribe(response => {
      if (response.isSuccess) {
        this.SubSubcategoryList = response.data;
        this.spinner.hide();
      } else {
        this.SubSubcategoryList = [];
        this.spinner.hide();
        // this.toaster.error(response.messages);
      }
    });
  }

  /*** Image Upload ***/

  imagesUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {

        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name,
          type: event.srcElement.files[0].type
        };
      };
      // this.name = this.imageFile.link
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // Shop Detail
  getvendorDetail() {
    this.spinner.show();
    this.content.getVendorDetail(this.vendorId).subscribe(response => {
      if (response.isSuccess) {
        this.vendorDetail = response.data
        this.shopDetail = this.vendorDetail.shopResponses
        this.shopId = this.shopDetail[0]?.shopId
      }
      this.spinner.hide()
    });
  }
  // brand list
  getbrandList() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
    }
    this.spinner.show();
    this.content.getBrand(payload).subscribe(response => {
      if (response.isSuccess) {
        this.brandList = response.data.dataList;
        this.spinner.hide();
      }
    });
  }

  fileChangeEvent() {
    this.spinner.show();
    let formData = new FormData();
    formData.append("bannerImage", this.imageFile?.file);
    formData.append("bannerType", this.form.value.bannerType);
    formData.append("shopId", this.shopId);
    formData.append("mainProductCategoryId", this.form.value.mainProductCategoryId);
    formData.append("subProductCategoryId", this.form.value.subProductCategoryId > 0 ? this.form.value.subProductCategoryId : 0);
    formData.append("SubSubProductCategoryId", this.form.value.SubSubProductCategoryId > 0 ? this.form.value.SubSubProductCategoryId : 0);
    formData.append("BrandId", this.form.value.BrandId > 0 ? this.form.value.BrandId : 0);
    this.content.uploadShopBanner(formData).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages)
        this.router.navigateByUrl('/shop-banner-list')
      } else {
        this.spinner.hide();
        this.toaster.error("Form Incomplete: Please fill in all the required fields correctly");
      }
    });
  }

  // use to submit data

  Submit() {
    this.fileChangeEvent();
  }

  // Function to handle banner type change
  onBannerTypeChange() {
    const selectedBannerType = this.bannerTypeControl.value;
    // Determine if the subcategory dropdown should be visible
    this.visible = selectedBannerType === 'ShopCategoryBanner';
    this.visible1 = selectedBannerType === 'BrandBanner'
  }

}
