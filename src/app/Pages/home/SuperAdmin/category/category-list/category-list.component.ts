import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EMPTY, Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  // serach 
  public searchText: any = '';
  vendorId = localStorage.getItem('vendorId')
  page3: number;
  page4: number;
  page1: number;
  page2: number;
  activeTab: string;
  itemsPerPage!: number;
  totalItems!: number;
  categoryList: any;
  rootUrl: any;
  login = localStorage.getItem('role');

  isActive: boolean = true;
  unActive: boolean = false;
  shopDetail: any;
  vendorDetail: any;
  shopId: any;
  categoryRequestList: any;
  mainProductCategoryId: any;
  subProductCategoryId: any;
  subSubProductCategoryId: any;
  private refreshSubscription!: Subscription;

  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,) {
    // Get the initial active tab and pagination values from the query parameters
    const queryParams = this.route.snapshot.queryParams;
    this.activeTab = queryParams['tab'] || 'pills-categorylist';
    this.page1 = queryParams['page1'] ? +queryParams['page1'] : 0;
    this.page2 = queryParams['page2'] ? +queryParams['page2'] : 0;
    this.page3 = queryParams['page3'] ? +queryParams['page3'] : 0;
    this.page4 = queryParams['page4'] ? +queryParams['page4'] : 0;
  }

  ngOnInit(): void {
    // Check if the active tab is not set in the query parameters
    if (!this.activeTab) {
      // Set the default active tab when the page is initially loaded
      this.activeTab = 'pills-categorylist';
      // Update the query parameters with the default active tab
      this.updateQueryParams();
    }
    this.rootUrl = environment.rootPathUrl;
    this.getvendorDetail();
    this.getProductCategoryRequestList();
    this.getList();
  }

  switchToTab(tabId: string) {
    // Set the active tab
    this.activeTab = tabId;

    // Clear the corresponding pagination query parameter
    if (tabId === 'pills-categorylist') {
      this.page1 = 0;
    } else if (tabId === 'pills-categoryrequest') {
      this.page2 = 0;
    }

    // Update the query parameters
    this.updateQueryParams();
  }

  updateQueryParams() {
    const queryParams = {
      tab: this.activeTab,
      page1: this.page1,
      page2: this.page2,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }
  refresh(): void {
    // Perform refresh actions

    // Update the query parameter with the current page index
    const queryParams = {
      page3: this.page3,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }
  refresh1(): void {
    // Perform refresh actions
    // Update the query parameter with the current page index
    const queryParams = {
      page4: this.page4
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }
  performSearch() {
    this.page1 = 1
    this.page2 = 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page1: null, page2: null, page3: null, page4: null },
      queryParamsHandling: 'merge'
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
      this.postActiveStatus(data);
    } else if (this.unActive == false) {
      this.postUnActiveStatus(data);
    }
  }
  postActiveStatus(data: any) {
    let payload = {
      mainProductCategoryId: data,
      shopId: this.shopId,
      status: true
    }
    this.content.statusPostCategory(payload).subscribe(response => {
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
      mainProductCategoryId: data,
      shopId: this.shopId,
      status: false
    }
    this.content.statusPostCategory(payload).subscribe(response => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        window.location.reload();
      } else {
        this.toaster.error(response.messages);
      }
    });
  }
  getList() {

    if (this.login == 'SuperAdmin') {
      this.getsuperlist();
    } else if (this.login == 'Admin') {
      this.getsuperlist();
    } else {
      this.getcategoryList();
    }
  }

  getsuperlist() {
    this.spinner.show();
    this.content.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
        this.spinner.hide();
      }
    });
  }
  getcategoryList() {
    debugger
    var id = localStorage.getItem('shopId')
    this.content.getcategoryVendor(id).subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
      }
    });
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
  startRefreshInterval() {
    const refreshInterval = 10000;
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    this.refreshSubscription = interval(refreshInterval).subscribe(() => {
      this.getProductCategoryRequestList();
    });
  }
  getProductCategoryRequestList() {
        this.content.productCategoryRequestList().subscribe(response => {
      if (response.isSuccess) {
        this.categoryRequestList = response.data;
        this.startRefreshInterval();
      }
      else {
        this.categoryRequestList = [];
      }
      return new Observable();
    });
  }

  acceptCategory(data: any) {
    let payload = {
      mainProductCategoryId: data.mainProductCategoryId,
      subProductCategoryId: data.subProductCategoryId,
      subSubProductCategoryId: data.subSubProductCategoryId,
      status: 1
    }
    this.spinner.show();
    this.content.acceptRejectCategorys(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.ngZone.run(() => { this.getProductCategoryRequestList() });
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  rejectCategory(data: any) {
    let payload = {
      mainProductCategoryId: data.mainProductCategoryId,
      subProductCategoryId: data.subProductCategoryId,
      subSubProductCategoryId: data.subSubProductCategoryId,
      status: 2
    }
    this.spinner.show();
    this.content.acceptRejectCategorys(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.ngZone.run(() => { this.getProductCategoryRequestList() });
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
      }
    });
  }

  delet(data: any) {
    this.mainProductCategoryId = data.mainProductCategoryId;
    this.subProductCategoryId = data.subProductCategoryId;
    this.subSubProductCategoryId = data.subSubProductCategoryId;
  }
  deleteMainCategory() {
    this.spinner.show();
    this.content.mainCategoryDelete(this.mainProductCategoryId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        window.location.reload();
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
      }
    });
  }
  deleteSubCategory() {
    this.spinner.show();
    this.content.subCategoryDelete(this.subProductCategoryId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        window.location.reload();
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
      }
    });
  }
  deleteSubSubCategory() {
    this.spinner.show();
    this.content.subsubCategoryDelete(this.subSubProductCategoryId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        window.location.reload();
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
      }
    });
  }

  edit(data: any) {
    this.router.navigate(['/category-list/add-edit-category'],
      {
        queryParams: {
          id: data.mainProductCategoryId
        }
      });
  }
  getvendorDetail() {
    this.spinner.show();
    this.content.getVendorDetail(this.vendorId).subscribe(response => {
      if (response.isSuccess) {
        this.vendorDetail = response.data
        this.shopId = this.vendorDetail.shopResponses[0]?.shopId
        this.getList();
        // this.bankDetail = this.vendorDetail.bankResponses
      }
      this.spinner.hide();
    });
  }
}
