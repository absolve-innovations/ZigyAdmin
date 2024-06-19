import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-product-inventory-list',
  templateUrl: './product-inventory-list.component.html',
  styleUrls: ['./product-inventory-list.component.css'],
})
export class ProductInventoryListComponent implements OnInit {
  // serach
  public searchText: any = '';
  name = localStorage.getItem('firstName');
  image = localStorage.getItem('profilepic');
  role = localStorage.getItem('role');
  shopName = localStorage.getItem('shopName');
  page: number = 1;
  itemsPerPage!: number;
  totalItems!: number;
  total: any;
  id: any;
  login = localStorage.getItem('role');
  vendorId = localStorage.getItem('id');
  public productList: any;
  categoryList: any;
  subCategoryList: any;
  form: any;
  SubSubcategoryList: any;
  brandList: any;
  FilterMainCategoryList: any;
  productLists: any;
  data: any;
  shopId: any;
  isActive: boolean = true;
  unActive: boolean = false;
  rootUrl: any;
  marked: boolean = false;
  productId: any = [];
  vendorDetail: any;
  shop!: any;
  search: any;
  itemToDelete: any;
  constructor(
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });
    this.getProductList();
    this.rootUrl = environment.rootPathUrl;
    this.getcategoryList();
    this.getbrandList();

    this.form = this.formBuilder.group({
      mainProductCategoryId: [''],
      subProductCategoryId: [''],
      brandId: [''],
      subSubProductCategoryId: [''],
      inStock: [''],
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
      queryParamsHandling: 'merge',
    });
  }

  performSearch() {
    // Clear query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: null },
      queryParamsHandling: 'merge',
    });
  }

  add() {
    this.router.navigate(['/product-list-inventory/add'], {
      queryParams: {
        id: this.vendorId,
      },
    });
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
      productId: data,
      status: 1,
      inventoryStatus: 'true',
    };
    this.content.statusPost(payload).subscribe((response) => {
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
      productId: data,
      status: 2,
      inventoryStatus: 'true',
    };
    this.content.statusPost(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        window.location.reload();
      } else {
        this.toaster.error(response.messages);
      }
    });
  }

  getProductList() {
    this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
    };
    this.content.getProductlistInventory(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.productList = response.data.dataList;
        this.shopId = response.data.dataList.shopId;
        this.total = response.data;
        this.spinner.hide();
      }
    });
  }

  // Brand List
  getbrandList() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
    };
    this.content.getBrand(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.brandList = response.data.dataList;
      }
    });
  }

  getFilterBrandList(data: any) {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      brandId: data,
    };
    this.content.getFilterBrandInventory(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.productList = response.data.dataList;
      } else {
        this.productList = [];
      }
    });
  }

  /*** Category List ***/
  getcategoryList() {
    this.content.getcategory().subscribe((response) => {
      if (response.isSuccess) {
        this.categoryList = response.data;
      } else {
        // this.toaster.error(response.messages);
      }
    });
  }

  getFilterMainCategoryList(data: any) {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      mainProductCategoryId: data,
    };
    this.content
      .getFilterMaincategoryInventory(payload)
      .subscribe((response) => {
        if (response.isSuccess) {
          this.productList = response.data.dataList;
          this.total = response.data;
          this.SubSubcategoryList = [];
          this.form.get('subProductCategoryId').setValue('');
          this.form.get('subSubProductCategoryId').setValue('');
        } else {
          this.productList = [];
          // this.toaster.error(response.messages);
        }
      });
  }

  /*** Sub  Category List ***/
  getSubcategoryList(data: any) {
    if (data === '') {
      this.subCategoryList = [];
      this.SubSubcategoryList = [];
      window.location.reload();
    }
    this.content.SubCategorySuper(data).subscribe((response) => {
      if (response.isSuccess) {
        this.subCategoryList = response.data;
      } else {
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
    };
    this.content
      .getFilterSubCategoryInventory(payload)
      .subscribe((response) => {
        if (response.isSuccess) {
          this.productList = response.data.dataList;
          this.form.get('subSubProductCategoryId').setValue('');
        } else {
          // this.spinner.hide();
          this.productList = [];
        }
      });
  }

  /*** Sub Sub Category List ***/
  getSubSubcategoryList(data: any) {
    // this.spinner.show();
    this.content.SubSubCategory(data).subscribe((response) => {
      if (response.isSuccess) {
        this.SubSubcategoryList = response.data;
      } else {
        // this.spinner.hide();
        this.SubSubcategoryList = [];
        // this.toaster.error(response.messages);
      }
    });
  }

  getFilterSubSubCategoryList(data: any) {
    // this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      subSubProductCategoryId: data,
    };
    this.content
      .getFilterSubSubCategoryInventory(payload)
      .subscribe((response) => {
        if (response.isSuccess) {
          this.productList = response.data.dataList;
          // this.spinner.hide();
        } else {
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
      this.content.deleteProdutsInventory(itemId).subscribe((response) => {
        if (response.isSuccess) {
          this.spinner.hide();
          // Remove the deleted item from the local list
          this.productList = this.productList.filter(
            (item: { productId: any }) => item.productId !== itemId
          );
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

  // status
  status(data: any) {
    data.isEdit = !data.isEdit;
    this.productId = data.productId;
  }

  // Update Product Stock
  updateProductStock() {
    let payload = {
      productId: this.productId.toString(),
      inStock: this.form.value.inStock,
    };
    this.content.updateStock(payload).subscribe((response) => {
      if (response.isSuccess) {
        window.location.reload();
        this.toaster.success(response.messages);
      } else {
        this.toaster.error(response.messages);
      }
    });
  }

  clearArray() {
    this.categoryList = [];
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
