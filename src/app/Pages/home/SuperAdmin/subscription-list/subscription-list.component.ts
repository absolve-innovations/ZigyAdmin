import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {
  SubscriptionList: any;
  form: any;
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  customerUserId: any;
  vendorId!: string | null;
  vendorDetail: any;
  shopIds: any;
  search:any;
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.vendorId = localStorage.getItem('vendorId');
    this.getvendorDetail();
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });
    this.getSubscriptionList();
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
    // Clear query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: null },
      queryParamsHandling: 'merge'
    });
  }

  /*** Subscripton list ***/
  getSubscriptionList() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      shopId: localStorage.getItem('shopId'),
    }
    this.spinner.show();
    this.content.listSubscription(payload).subscribe(response => {
      if (response.isSuccess) {
        this.SubscriptionList = response.data.dataList;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  // Vendor Detail //
  getvendorDetail() {
    this.content.getVendorDetail(this.vendorId).subscribe(response => {
      if (response.isSuccess) {
        this.vendorDetail = response.data;
        this.shopIds = this.vendorDetail.shopResponses[0]?.shopId;
        localStorage.setItem('shopIdForDairy', this.shopIds);
      }
      this.spinner.hide();
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
