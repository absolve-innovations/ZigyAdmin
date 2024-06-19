import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // serach 
  public searchText: any = '';
  name = localStorage.getItem('firstName');
  image = localStorage.getItem('profilepic');
  role = localStorage.getItem('role');
  shopName = localStorage.getItem('shopName');

  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  total: any
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
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });

    this.getProductList();
    // this.spinner.hide()
    this.rootUrl = environment.rootPathUrl;

    this.getcategoryList();
    this.getbrandList();
    // this.getFilterMainCategoryList(this.productList);

    this.form = this.formBuilder.group({
      mainProductCategoryId: [''],
      subProductCategoryId: [''],
      brandId: [''],
      subSubProductCategoryId: [''],
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
  performSearch() {
    
    // Your existing search logic...
  
    // Clear query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: null },
      queryParamsHandling: 'merge'
    });
  }


  add() {

    this.router.navigate(['/add-product'],
      {
        queryParams: {
          id: this.vendorId,
        }
      });
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
      if(response.isSuccess == true) {
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
      if(response.isSuccess == true) {
        this.toaster.success(response.messages)
        window.location.reload();
            } else {
        this.toaster.error(response.messages)
            }
    });
  }


  getProductList() {

    this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 1000
    }
    this.content.getProductlist(payload).subscribe(response => {
      if (response.isSuccess) {
        // this.clearFormArray(this.productList);
        this.productList = response.data.dataList;
        this.shopId = response.data.dataList.shopId
        // this.getFilterMainCategoryList(this.productList);
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
    }
    // this.spinner.show();
    this.content.getBrand(payload).subscribe(response => {
      if (response.isSuccess) {
        this.brandList = response.data.dataList;
        // this.spinner.hide();
      } else {
      }
    });
  }

  /** filter product list by brand  **/
  getFilterBrandList(data: any) {

    let payload = {
      pageNumber: 1,
      pageSize: 10 || this.productList?.totalCount / this.productList?.pageSize,
      brandId: data
    }
    // this.spinner.show();
    this.content.getFilterBrand(payload).subscribe(response => {
      if (response.isSuccess) {
        let tbData: any = (response.data.dataList && response.data.length) ? response.data : [];
        this.productList = tbData;
        // this.spinner.hide();
      }
      else {
        // this.spinner.hide();
        this.productList = [];
        // this.toaster.error(response.messages);
      }
    });
  }

  /*** Category List ***/

  getcategoryList() {

    // this.spinner.show();
    this.content.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
        // this.spinner.hide();
      } else {
        // this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }


  /** filter product list by MainCategory  **/

  getFilterMainCategoryList(data: any) {

    // this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      mainProductCategoryId: data
    }
    this.content.getFilterMaincategory(payload).subscribe(response => {
      if (response.isSuccess) {
        this.productList = response.data.dataList;
        this.total = response.data;
        //  this.productList = this.productLists
        // this.spinner.hide();
      } else {
        // this.spinner.hide();
        this.productList = [];
        // this.toaster.error(response.messages);
      }
    });
  }


  /*** Sub  Category List ***/

  getSubcategoryList(data: any) {
    // this.spinner.show();
    if (data === '') {
      this.subCategoryList = [];
      this.SubSubcategoryList = []
      window.location.reload();
    }
    this.content.SubCategorySuper(data).subscribe(response => {
      if (response.isSuccess) {
        this.subCategoryList = response.data;
        this.SubSubcategoryList = []
        // this.spinner.hide();
      }
      else {
        this.subCategoryList = [];
        this.toaster.error(response.messages);
      }
    });
  }

  /** filter product list by SubCategory  **/
  getFilterSubCategoryList(data: any) {

    // this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      subProductCategoryId: data
    }
    this.content.getFilterSubCategory(payload).subscribe(response => {
      if (response.isSuccess) {
        this.productList = response.data.dataList;
        // this.spinner.hide();
      } else {
        // this.spinner.hide();
        // this.data = response.isSuccess == 'false'
        // this.toaster.error(response.messages);
      }
    });
  }


  /*** Sub Sub Category List ***/

  getSubSubcategoryList(data: any) {

    // this.spinner.show();
    this.content.SubSubCategory(data).subscribe(response => {
      if (response.isSuccess) {
        this.SubSubcategoryList = response.data;
        // this.spinner.hide();
      } else {
        // this.spinner.hide();
        this.SubSubcategoryList = []
        this.toaster.error(response.messages);
      }
    });
  }


  /** filter product list by Sub SubCategory  **/

  getFilterSubSubCategoryList(data: any) {
    // this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      subSubProductCategoryId: data
    }
    this.content.getFilterSubSubCategory(payload).subscribe(response => {
      if (response.isSuccess) {
        this.productList = response.data.dataList;
        // this.spinner.hide();
      } else {
        // this.spinner.hide();
        // this.data = response.isSuccess == 'false'
        // this.toaster.error(response.messages);
      }
    });
  }


  /** function use to get product id   **/

  delet(data: any) {
    this.itemToDelete = data;
    $('#list-cross-mess').modal('show');
  }


  /** delete product    **/

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



  /**  status **/

  status(data: any) {

    // this.marked= data.target.checked
    data.isEdit = !data.isEdit;
    this.productId = data.productId
    this.form.patchValue({ 
      inStock : data.inStock
    });
  }

  /**  Update Product Stock  **/

  updateProductStock() {

    let payload = {
      productId: this.productId.toString(),
      inStock: this.form.value.inStock
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


  /** clear array  **/

  clearArray() {
    this.categoryList = [];
  }

  addSpaceAfterText() {
    this.searchText = this.searchText.trim();
    }


    onSearch(searchTerm: string): void {
      // Update query parameters for search
      this.router.navigate([], {
        queryParams: { search: searchTerm, page: 1 }, // Reset to the first page when searching
        queryParamsHandling: 'merge',
      });
    }

}
