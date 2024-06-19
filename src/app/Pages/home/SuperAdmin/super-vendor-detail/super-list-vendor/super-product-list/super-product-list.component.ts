import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-super-product-list',
  templateUrl: './super-product-list.component.html',
  styleUrls: ['./super-product-list.component.css']
})
export class SuperProductListComponent implements OnInit {
  rootUrl: any;
  vendorId: any;
  productList: any;
  productId: any = [];
  // serach 
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  categoryList: any;
  subCategoryList: any;
  form: any;
  brandList: any;
  SubSubcategoryList: any;
  id: any
  role: any;
  shopId: any;
  showSelectedBox: any;
  selectedItem: any = null;
  isActive: boolean = true;
  unActive: boolean = false;
  image = localStorage.getItem('shopImage');
  role1 = localStorage.getItem('role');
  login = localStorage.getItem('role');
  shopName = localStorage.getItem('shopName');
  search: any;
  itemToDelete: any;
  constructor(
    private content: ContentService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private _location: Location,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });
    this.id = localStorage.getItem('id')
    this.role = localStorage.getItem('role')
    this.rootUrl = environment.rootPathUrl;
    this.vendorId = this.route.snapshot.queryParams
    this.shopId = this.route.snapshot.queryParams
    // this.productId = this.route.snapshot.queryParams
    this.getbrandList();
    this.getcategoryList();
    this.getProductList();
    // this.getVendor();
    // this.getSuper();
    this.form = this.formBuilder.group({
      mainProductCategoryId: [''],
      subProductCategoryId: [''],
      subSubProductCategoryId: [''],
      brandId: [''],
      inStock: ['']
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

  refresh(): void {
    // Perform refresh actions
    // Update the query parameter with the current page index
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page },
      queryParamsHandling: 'merge'
    });
  }

  backClicked() {
    this._location.back();
  }

  performSearch() {
    // Clear query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: null },
      queryParamsHandling: 'merge'
    });
  }

  // Pass Vendor id
  passId() {
    if (this.role === 'Vendor') {
      this.router.navigate(['/vendor-products-list/add-product'],
        {
          queryParams: {
            id: this.vendorId.id,
            id2: this.shopId.id2
          }
        });
    }
    else if (this.role === 'SuperAdmin') {
      this.router.navigate(['/super-vendor-list/product-list/add-product'],
        {
          queryParams: {
            id: this.vendorId.id,
            id2: this.shopId.id2
          }
        });
    }
    else {
      this.router.navigate(['/super-vendor-list/product-list/add-product'],
        {
          queryParams: {
            id: this.vendorId.id,
            id2: this.shopId.id2
          }
        });
    }
  }

  bulk() {

    this.router.navigate(['/super-vendor-list/product-list/bulk-upload'],
      {
        queryParams: {
          id2: this.shopId.id
        }
      });
  }

  productdetail(data: any) {
    if (this.role === 'SuperAdmin') {
      this.router.navigate(['/super-vendor-list/product-list/product-detail'], {
        queryParams: {
          id: data.productId,
        }
      });
    }
    else if (this.role === 'Vendor') {
      this.router.navigate(['/vendor-products-list/product-detail'], {
        queryParams: {
          id: data.productId,
        }
      });
    }
    else {
      this.router.navigate(['/product-detail'], {
        queryParams: {
          id: data.productId,
        }
      });
    }
  }

  editproduct(data: any) {
    if (this.role === 'SuperAdmin') {
      this.router.navigate(['/super-vendor-list/product-list/edit-product'], {
        queryParams: {
          id: data.productId,
          id2: data.shopId
        }
      });
    }
    else if (this.role === 'Vendor') {
      this.router.navigate(['/vendor-products-list/edit-product'], {
        queryParams: {
          id: data.productId,
          id2: data.shopId
        }
      });
    }
    else {
      this.router.navigate(['/edit-product'], {
        queryParams: {
          id: data.productId,
          id2: data.shopId
        }
      });
    }
  }

  checkActiveStatus(data: any) {
    this.isActive = !this.isActive;
    if (this.isActive == true) {
      this.postActiveStatus(data)
    } else if (this.isActive == false) {
      this.postUnActiveStatus(data)
    }
  }

  checkInactiveStatus(data: any) {
    this.unActive = !this.unActive;
    if (this.unActive == true) {
      this.postActiveStatus(data)
    } else if (this.unActive == false) {
      this.postUnActiveStatus(data)
    }
  }


  postActiveStatus(data: any) {
    let payload = {
      productId: data,
      status: 1
    }
    this.content.statusPost(payload).subscribe(response => {
      if (response.isSuccess == true) {
        this.toaster.success(response.messages)
        window.location.reload();
      } else {
        this.toaster.error(response.messages)
      }
    });
  }

  postUnActiveStatus(data: any) {
    let payload = {
      productId: data,
      status: 2
    }
    this.content.statusPost(payload).subscribe(response => {
      if (response.isSuccess == true) {
        this.toaster.success(response.messages)
        window.location.reload();
      } else {
        this.toaster.error(response.messages)
      }
    });
  }

  getProductList() {
    this.spinner.show();
    if (this.role === 'Vendor') {
      this.getVendor();
    }
    else if (this.role === 'SuperAdmin') {
      this.getSuper();
    }
    else if (this.role === 'Distributor') {
      this.getSuperProduct();
    }
  }

  getSuper() {

    let payload = {
      pageNumber: 1,
      pageSize: 100000,
      vendorId: this.vendorId.id
    }
    this.spinner.show();
    this.content.getSupervendorProductlist(payload).subscribe(response => {
      if (response.isSuccess) {

        this.spinner.hide();
        this.productList = response.data.dataList;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.productList = [];
        // this.toaster.error(response.messages);
      }
    });
  }

  getSuperProduct() {

    let payload = {
      pageNumber: 1,
      pageSize: 100000,
      vendorId: this.vendorId.id,
      shopId: this.shopId.id2
    }
    this.spinner.show();
    this.content.getDistributorvendorProductlist(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.productList = response.data.dataList;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.productList = [];
        // this.toaster.error(response.messages);
      }
    });
  }

  getVendor() {
    let payload = {
      pageNumber: 1,
      pageSize: 100000,
      vendorId: localStorage.getItem('vendorId')
    }
    this.content.getvendorProductlist(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.productList = response.data.dataList;

        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.productList = [];
        // this.toaster.error(response.messages);
      }
    })
  }

  /*** Category List ***/
  getcategoryList() {
    this.spinner.show();
    this.content.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
        this.form.get('subSubProductCategoryId').setValue('');
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  getFilterMainCategoryList(data: any) {
    this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      mainProductCategoryId: data,
      vendorId: localStorage.getItem('vendorId')
    }
    this.content.getFilterMaincategory(payload).subscribe(response => {
      if (response.isSuccess) {
        this.productList = response.data.dataList;
        this.SubSubcategoryList = [];
        this.form.get('brandId').setValue('');
        this.form.get('subProductCategoryId').setValue('');
        this.form.get('subSubProductCategoryId').setValue('');
        this.spinner.hide();
      } else {

        this.spinner.hide();
        this.productList = [];
        // this.toaster.error(response.messages);
      }
    });
  }
  /*** Sub  Category List ***/
  getSubcategoryList(data: any) {

    if (data === '') {
      this.subCategoryList = [];
      this.SubSubcategoryList = []
      window.location.reload();
    }
    this.spinner.show();
    this.content.SubCategorySuper(data).subscribe(response => {
      if (response.isSuccess) {
        this.subCategoryList = response.data;

        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.subCategoryList = [];
        // this.toaster.error(response.messages);
      }
    });
  }
  getFilterSubCategoryList(data: any) {
    // this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      subProductCategoryId: data,
      vendorId: localStorage.getItem('vendorId')
    }
    this.content.getFilterSubCategory(payload).subscribe(response => {
      if (response.isSuccess) {
        this.productList = response.data.dataList;
        //  this.form.get('subProductCategoryId').setValue('');
        this.form.get('subSubProductCategoryId').setValue('');
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.productList = [];
        // this.data = response.isSuccess == 'false'
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
        this.spinner.hide();
        // this.toaster.error(response.messages);
        this.productList = [];
        this.SubSubcategoryList = [];
      }
    });
  }

  getFilterSubSubCategoryList(data: any) {
    this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      subSubProductCategoryId: data,
      vendorId: localStorage.getItem('vendorId')
    }
    this.content.getFilterSubSubCategory(payload).subscribe(response => {
      if (response.isSuccess) {
        this.productList = response.data.dataList;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.productList = [];
        // this.data = response.isSuccess == 'false'
        // this.toaster.error(response.messages);
      }
    });
  }

  /*** Brand List ***/
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
      else {
        this.brandList = [];
        this.spinner.hide();
      }
    });
  }

  getFilterBrandList(data: any) {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      brandId: data,
      vendorId: localStorage.getItem('vendorId')
    }
    this.spinner.show();
    this.content.getFilterBrand(payload).subscribe(response => {
      if (response.isSuccess) {
        this.productList = response.data.dataList;
        this.form.get('mainProductCategoryId').setValue('');
        this.subCategoryList = [];
        this.SubSubcategoryList = [];
        this.form.get('subProductCategoryId').setValue('');
        this.form.get('subSubProductCategoryId').setValue('');
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.productList = [];
        // this.toaster.error(response.messages);
      }
    });
  }

  delet(data: any) {
    this.itemToDelete = data;
    $('#list-cross-mess').modal('show');
  }

  deleteProduct() {
    this.spinner.show();
    if (this.itemToDelete) {
      const itemId = this.itemToDelete.productId;
    this.content.deleteProduts(itemId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        // Remove the deleted item from the local list
        this.productList = this.productList.filter((item: { productId: any; }) => item.productId !== itemId);
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


  // Update Product Stock

  updateProductStock() {

    let payload = {
      productId: this.productId.toString(),
      inStock: this.form.value.inStock,
      sellingPrice: '',
      mrp: ''
    }
    this.content.updateStock(payload).subscribe(response => {
      if (response.isSuccess) {
        window.location.reload()
        this.toaster.success(response.messages);
      } else {
        this.toaster.error(response.messages);
      }
    });
  }

  status(data: any) {
    console.log(data)
    if (this.selectedItem === data) {
      this.selectedItem = null;
    } else {
      if (this.selectedItem) {
        this.selectedItem.isEdit = false;
      }
      data.isEdit = true;
      this.selectedItem = data;
    }
    this.productId = data.productId;
    this.showSelectedBox = data.isEdit;
    this.form.patchValue({
      inStock: data.inStock
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