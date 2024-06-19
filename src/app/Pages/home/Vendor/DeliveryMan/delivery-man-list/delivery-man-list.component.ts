import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-delivery-man-list',
  templateUrl: './delivery-man-list.component.html',
  styleUrls: ['./delivery-man-list.component.css']
})
export class DeliveryManListComponent implements OnInit {
  login = localStorage.getItem('role');
  deliveryManListList: any;
  form: any;
  // serach 
  public searchText: any = '';
  page1: number;
  page2: number;
  // page3: number;
  // page4: number;
  activeTab: string;
  itemsPerPage!: number;
  totalItems!: number;
  customerUserId: any;
  assignedOrderList: any;
  datePickerConfig: Partial<BsDatepickerConfig>;
  date: any;
  dairyStatus!: number;
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    public datepipe: DatePipe,
    private route: ActivatedRoute) {

    // Get the initial active tab and pagination values from the query parameters
    const queryParams = this.route.snapshot.queryParams;
    this.activeTab = queryParams['tab'] || 'pills-categorylist';
    this.page1 = queryParams['page1'] ? +queryParams['page1'] : 0;
    this.page2 = queryParams['page2'] ? +queryParams['page2'] : 0;
    this.datePickerConfig = Object.assign(
      {},
    );
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      searchByDate: [''],
      isDairyProduct: ['2'],
      MorningOrEveningOrder: [''],
      timing: [''],
      status: ['']
    });
    this.getDeliveryManList();
    this.getAssignOrderToDeliveryManList();

    // Check if the active tab is not set in the query parameters
    if (!this.activeTab) {
      // Set the default active tab when the page is initially loaded
      this.activeTab = 'pills-categorylist';
      // Update the query parameters with the default active tab
      this.updateQueryParams();
    }
    this.date = formatDate(new Date(), 'dd-MM-yyyy', 'en-US');
  }

  get f() {
    return this.form['controls'];
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
      page2: this.page2
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  performSearch() {
    // Your existing search logic...  
    // Clear query parameters
    this.page1 = 1
    this.page2 = 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page1: null, page2: null },
      queryParamsHandling: 'merge'
    });
  }


  // edit user 
  edit(data: any) {
    this.router.navigate(['/vendor/setting/delivery-man-list/add-edit-delivery-man'],
      {
        queryParams: {
          id: data.deliveryManId
        }
      });
  }

  /*** Delivery Man list ***/

  getDeliveryManList() {
    let payload = {
      shopId: localStorage.getItem('shopId')
    }
    // this.spinner.show();
    this.content.getDeliveryManLists(payload).subscribe(response => {
      if (response.isSuccess) {
        this.deliveryManListList = response.data;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  onDateChange() {
    this.getAssignOrderToDeliveryManList();
  }

  getAssignOrderToDeliveryManList() {
    var fromDate = this.form.value.searchByDate
      ? this.datepipe.transform(this.form.value.searchByDate, 'yyyy-MM-dd')
      : formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      shopId: localStorage.getItem('shopId'),
      searchByDate: fromDate,
      isDairyProduct: parseInt(this.form.value.isDairyProduct) ? this.form.value.isDairyProduct : 2,
      MorningOrEveningOrder: this.form.value.MorningOrEveningOrder ? this.form.value.MorningOrEveningOrder.toString() : 'All'
    }
    this.spinner.show();
    this.content.getAssignOrderToDeliveryManLists(payload).subscribe(response => {
      if (response.isSuccess) {
        this.assignedOrderList = response.data.dataList;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }


  deleteDeliveryMan(deliveryManId: any){
    this.spinner.show();
    this.content.deleteDeliveryMan(deliveryManId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages);
        // this.ngZone.run(() => { this.getbrandList() });
        window.location.reload();
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  navigate(data: any) {
    // Define the parameters you want to pass
    const queryParams: NavigationExtras = {
      queryParams: {
        deliveryManId: data.deliveryManId,
        searchByDate: this.form.value.searchByDate,
        isDairyProduct: parseInt(this.form.value.isDairyProduct) ? this.form.value.isDairyProduct : 2,
        timing: data.timing.toString(),
        // Add more parameters as needed
      }
    };

    // Navigate to the URL with the defined parameters
    this.router.navigate(['/vendor/setting/delivery-man-list/deliver-man-detail'], queryParams);
  }


  orderListStatus(data: any) {
    if (data.isDairyOrder == true) {
      this.dairyStatus = 1
    } else if (data.isDairyOrder == false) {
      this.dairyStatus = 0;
    }

    let payload = {
      deliveryManId: data.deliveryManId,
      isDairyProduct: this.dairyStatus,
      timing: data.timing,
      status: this.form.value.status,
      searchByDate: this.form.value.searchByDate,
    }
    this.spinner.show();
    this.content.deliveryStatus(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

}