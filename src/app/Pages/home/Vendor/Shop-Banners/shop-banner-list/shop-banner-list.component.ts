import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-shop-banner-list',
  templateUrl: './shop-banner-list.component.html',
  styleUrls: ['./shop-banner-list.component.css']
})
export class ShopBannerListComponent implements OnInit {
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  rootUrl: any;
  shopBannerList: any;
  vendorDetail: any;
  vendorId: any;
  shopId: any;
  id: any;
  form: any;
  SubSubcategoryList: any;
  subCategoryList: any;
  categoryList: any;
  shopBannerId: any;
  selectedFilter: any;
  brandList: any
  showBrandDiv: boolean = false;
  mainCategoryList: any[] = [];
  search: any;
  itemToDelete: any;
  constructor(
    private toaster    : ToastrService,
    private spinner    : NgxSpinnerService,
    private content    : ContentService,
    private router     : Router,
    private route      : ActivatedRoute,
    private ngZone     : NgZone,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.vendorId = localStorage.getItem('id');
    this.rootUrl = environment.rootPathUrl;
    this.getvendorDetail();
    this.getShopBannerList();
    this.getcategoryList();
    this.form = this.formBuilder.group({
      mainProductCategoryId: [''],
      subProductCategoryId: [''],
      // brandId: [''],
      subSubProductCategoryId: [''],
      shopBannerType: ['']
    });
  }

  get f() {
    return this.form['controls'];
  }

  get s() {
    return this.form['controls'];
  }

  get fb() {
    return this.form['controls'];
  }
  get ssb() {
    return this.form['controls'];
  }
  

  onCategoryFilterChange(filter: string) {
    this.selectedFilter = filter;
    if (filter === 'Main') {
      // Clear the values of subcategory and sub-subcategory when "Main" is selected
      this.form.get('subProductCategoryId').setValue('');
      this.form.get('subSubProductCategoryId').setValue('');  
    }
    if (filter === 'Sub') {
      // Clear the values of subcategory and sub-subcategory when "Main" is selected
      this.form.get('subSubProductCategoryId').setValue('');
    }
}
  
  onBannerTypeChange(selectedValue: string) {
    this.showBrandDiv   = selectedValue === 'ShopCategoryBanner';
    this.selectedFilter = selectedValue === 'ShopCategoryBanner' ? 'Main' : selectedValue === 'ShopCategoryBanner' ? 'Sub' : selectedValue === 'ShopCategoryBanner' ? 'SubSub' : ''  ;
    this.filterAllBannersList(); 
    this.clearAllCategories();
  }
  getvendorDetail() {
    this.content.getVendorDetail(this.vendorId).subscribe(response => {
      if (response.isSuccess) {
        this.vendorDetail = response.data
        this.id = this.vendorDetail.shopResponses[0]?.shopId
        this.shopId = localStorage.setItem('shopId', this.id)
        this.ngZone.run(() => { this.getShopBannerList(); })
      }
    })
  }

  /*** Shop Banner List ***/
  getShopBannerList() {
    this.spinner.show();
    let payload = {
      shopId: localStorage.getItem('shopId'),
      shopBannerType: 'All'
    }
    this.spinner.show();
    this.content.getShopBanner(payload).subscribe(response => {
      if (response.isSuccess) {
        this.shopBannerList = response.data;

        this.spinner.hide();
      }
      else {
        //    this.spinner.hide();
        this.toaster.error(response.messages)
        this.shopBannerList = [];
      }
    });
  }

  delet(data: any) {
    this.itemToDelete = data;
    $('#list-cross-mess').modal('show');
  }

  deleteShopBanners() {
    this.spinner.show();
    if (this.itemToDelete) {
      const itemId = this.itemToDelete.shopBannerId;
    this.content.deleteShopBanner(itemId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        // Remove the deleted item from the local list
        this.shopBannerList = this.shopBannerList.filter((item: { shopBannerId: any; }) => item.shopBannerId !== itemId);
        // Close the modal
        $('#list-cross-mess').modal('hide');
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
      
    });
  }
}


  /*** Category List ***/
  getcategoryList() {
    this.content.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
        // this.subCategoryList = [];
        // this.SubSubcategoryList = []
        this.clearSubCategories();
      } else {
        this.categoryList = [];
        this.toaster.error(response.messages);
      }
    });
  }

  clearAllCategories(){
    this.form.get('mainProductCategoryId').setValue('');  
    this.form.get('subProductCategoryId').setValue('');  
    this.form.get('subSubProductCategoryId').setValue('');  
    this.subCategoryList = [];
    this.SubSubcategoryList = [];
  }

  clearSubCategories() {
    this.subCategoryList = [];
    this.SubSubcategoryList = [];
  }

   /*** Sub  Category List ***/
getSubcategoryList(data: any) {
  this.spinner.show();
  if (data === '') {
    this.clearSubCategories();
    this.filterAllBannersList(); 
  } else {
    this.content.SubCategorySuper(data).subscribe(response => {
      if (response.isSuccess) {
        this.subCategoryList = response.data;
        this.SubSubcategoryList = [];
        this.spinner.hide();
        this.filterAllBannersList(); 
      } else {
        this.subCategoryList = [];
        this.SubSubcategoryList = [];
        this.spinner.hide();
      }
    });
  }
}

/*** Sub Sub Category List ***/
getSubSubcategoryList(data: any) {
  this.spinner.show();
  if (data === '') {
    this.clearSubCategories();
    this.filterAllBannersList(); //
  } else {
    this.content.SubSubCategory(data).subscribe(response => {
      if (response.isSuccess) {
        this.SubSubcategoryList = response.data;
        this.spinner.hide();
        this.filterAllBannersList(); //
      } else {
        this.spinner.hide();
        this.SubSubcategoryList = [];
        // this.toaster.error(response.messages);
      }
    });
  }
}

  filterAllBannersList() {
    let payload = {
      shopId: localStorage.getItem('shopId'),
      mainProductCategoryId: this.form.value.mainProductCategoryId ? this.form.value.mainProductCategoryId : '',
      subProductCategoryId: this.form.value.subProductCategoryId ? this.form.value.subProductCategoryId : '',
      subSubProductCategoryId: this.form.value.subSubProductCategoryId ? this.form.value.subSubProductCategoryId : '',
      shopBannerType: this.form.value.shopBannerType ? this.form.value.shopBannerType : '',
      // brandId: this.form.value.brandId ? this.form.value.brandId : '',
    }
    this.content.filterAllBanners(payload).subscribe(response => {
      if (response.isSuccess) {
        this.shopBannerList = response.data
        //    this.spinner.hide();
        //   this.toaster.success(response.messages)
      } else {
        //   this.spinner.hide();
        this.toaster.error(response.messages)
        this.shopBannerList = [];
      }
    });
  }

  onSearch(searchTerm: string): void {
    // Update query parameters for search
    this.router.navigate([], {
      queryParams: { search: searchTerm, page: 1 }, // Reset to the first page when searching
      queryParamsHandling: 'merge',
    });
  }

  addSpaceAfterText() {
    this.searchText = this.searchText.trim();
    }
}
