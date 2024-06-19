import { DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
  NgZone,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { EMPTY, Observable, Subscription, interval } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
} from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  @ViewChild('scrollTarget') scrollTarget!: ElementRef;
  vendorId!: string | null;
  orderlist: any;
  form: any;
  rootUrl: any;
  private previousListData: any[] = [];

  // serach
  public searchText: any = '';
  page: number = 1; // Current page
  itemsPerPage: number = 5; // Default items per page
  totalItems: number = 0; // Total number of items
  currentPage: number = 1;
  tableSize: number[] = [5, 10, 15, 20];
  minToDate: any;
  // customers = new Array<Customer>();

  datePickerConfig: Partial<BsDatepickerConfig>;
  order: any;
  payment: any;
  image = localStorage.getItem('shopImage');
  role1 = localStorage.getItem('role');
  login = localStorage.getItem('role');
  shopName = localStorage.getItem('shopName');
  role!: string | null;
  dairyStatus!: any;
  note: any;
  public isFromDateSelected = false;

  private refreshSubscription!: Subscription;
  list: any;
  deliveryManList: any;
  constructor(
    private content: ContentService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private ngZone: NgZone,
    public datepipe: DatePipe,
    private cdRef: ChangeDetectorRef
  ) {
    this.datePickerConfig = Object.assign({});
  }

  ngOnInit(): void {
    this.dairyStatus = localStorage.getItem('dairyStatus');
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });
    this.rootUrl = environment.rootPathUrl;
    this.vendorId = localStorage.getItem('vendorId');
    this.role = localStorage.getItem('role');
    this.getOrderList();
    //this.getDeliveryManList();

    this.form = this.formBuilder.group({
      deliveryType: [''],
      paymentStatus: [''],
      brandId: [''],
      fromDate: [''],
      toDate: [{ value: '', disabled: true }],
      orderStatus: [''],
      isDairyProduct: ['2'],
      deliveryFacility: [''],
      expectedDeliveryTiming: [''],
      availabilityStatus: [''],
      searchQuery: [''],
      deliveryManName: [''],
    });
    this.watchFromDateChanges();
  }

  private watchFromDateChanges() {
    const fromDateControl: AbstractControl | null = this.form.get('fromDate');
    const toDateControl: AbstractControl | null = this.form.get('toDate');

    if (fromDateControl && toDateControl) {
      fromDateControl.valueChanges
        .pipe(debounceTime(200), distinctUntilChanged())
        .subscribe((fromDateValue) => {
          this.isFromDateSelected = !!fromDateValue;

          if (fromDateValue) {
            toDateControl.enable();
          } else {
            toDateControl.disable();
          }
        });
    }
  }

  onToDateClick() {
    if (!this.isFromDateSelected) {
      this.showToastrMessage();
      return;
    }

    const toDateControl: AbstractControl | null = this.form.get('toDate');
    if (toDateControl) {
      toDateControl.enable();
    }
  }

  private showToastrMessage() {
    this.toaster.info('Please select "From Date" first.');
  }

  setScrollPosition() {
    // Get the height of the viewport
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    // Get the top offset of the clicked row
    const topOffset = this.el.nativeElement.offsetTop;

    // Calculate the center of the row
    const centerOffset =
      topOffset - viewportHeight / 2 + this.el.nativeElement.offsetHeight / 2;

    // Scroll to the center of the clicked row without smooth animation
    window.scrollTo({ top: centerOffset, behavior: 'auto' });
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  get f() {
    return this.form['controls'];
  }

  get g() {
    return this.form['controls'];
  }

  get h() {
    return this.form['controls'];
  }

  get d() {
    return this.form['controls'];
  }

  get e() {
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
    // Your existing search logic...
    // Clear query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: null },
      queryParamsHandling: 'merge',
    });
  }

  setToDateMinDate(event: Date) {
    this.minToDate = event; // Set the minimum date for the "toDate" field
  }

  getOrderList() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      vendorId: this.vendorId,
      shopId: localStorage.getItem('shopId'),
    };
    //   this.spinner.show();
    this.content.orderList(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.list = response.data;
        this.form.patchValue({
          deliveryFacility: this.list.deliveryFacility,
          expectedDeliveryTiming: this.list.expectedDeliveryTiming,
          availabilityStatus: this.list.availabilityStatus,
        });
        this.orderlist = response.data.orderList.dataList;
        //    this.spinner.hide();
        // this.toaster.success(response.messages)
        //  this.startRefreshInterval();
      } else {
        //    this.spinner.hide();
        this.toaster.error(response.messages);
        this.orderlist = [];
      }
      return new Observable();
    });
  }

  startRefreshInterval() {
    const refreshInterval = 100000;

    // Check if there is an existing subscription and unsubscribe if needed
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }

    // Use interval to call getOrderList every 10 seconds
    this.refreshSubscription = interval(refreshInterval).subscribe(() => {
      this.getOrderList();
    });
  }

  startRefreshIntervallist5() {
    const refreshInterval = 60000; // 4 seconds

    // Use interval to call getOrderListType every 4 seconds
    this.refreshSubscription = interval(refreshInterval).subscribe(() => {
      this.filterAllList();
    });
  }

  openPreviewModal(index: any) {
    // Check if an image is selected

    // if (index >= 0 && this.orderlist[index]) {
    // Set the imageUrl to the selected image URL
    this.note = index.customerNote;

    // Trigger the modal to open
    $('#myModalpaymentreciept').modal('show');
    // }
  }

  // order List Status

  orderStatus() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    this.order = this.form.value.orderStatus;
  }

  orderListStatus(data: any) {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    let payload = {
      orderDetailId: data.orderDetailId,
      orderStatus: this.order,
    };
    this.spinner.show();
    this.content.orderStatus(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  // Payment Status

  paymentStatus() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    this.payment = this.form.value.paymentStatus;
  }

  orderPaymentStatus(data: any) {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    let payload = {
      orderDetailId: data.orderDetailId,
      paymentStatus: this.payment,
    };
    this.spinner.show();
    this.content.orderPaymentStatus(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  // read status
  read(data: any) {
    let payload = {
      orderDetailId: data.orderDetailId,
      // orderStatus: data.orderStatus,
      // isUpdated : false
    };
    this.content.orderStatus(payload).subscribe((response) => {
      if (response.isSuccess) {
      }
    });
  }

  // list all filter
  filterAllList() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }

    var fromDate = this.form.value.fromDate
      ? this.datepipe.transform(this.form.value.fromDate, 'yyyy-MM-dd')
      : '';

    let toDate = this.form.value.toDate
      ? this.datepipe.transform(this.form.value.toDate, 'yyyy-MM-dd')
      : '';

    if (fromDate !== '' && toDate === '') {
      // If fromDate is provided but toDate is null, set toDate to fromDate
      toDate = fromDate;
    }

    if (fromDate === '' && toDate !== '') {
      // If toDate is provided but fromDate is null, set fromDate to toDate
      fromDate = toDate;
    }

    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      vendorId: this.vendorId,
      fromDate: fromDate,
      toDate: toDate,
      paymentStatus: this.form.value.paymentStatus
        ? this.form.value.paymentStatus
        : '',
      searchQuery: this.form.value.searchQuery
        ? this.form.value.searchQuery
        : '',
      isDairyProduct: parseInt(this.form.value.isDairyProduct)
        ? this.form.value.isDairyProduct
        : 2,
      orderStatus: this.form.value.orderStatus
        ? this.form.value.orderStatus
        : '',
      deliveryType: this.form.value.deliveryType
        ? this.form.value.deliveryType
        : '',
      deliveryManName: this.form.value.deliveryManName
        ? this.form.value.deliveryManName
        : '',
      shopId: localStorage.getItem('shopId'),
    };
    this.content.allFilterOrder(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.list = response.data;
        this.orderlist = response.data.orderList.dataList;
        this.startRefreshIntervallist5();
        //   this.toaster.success(response.messages)
      } else {
        //   this.spinner.hide();
        this.toaster.error(response.messages);
        this.orderlist = [];
      }
    });
  }

  clearAllFilter() {
    this.form.get('deliveryManName').setValue('');
    this.form.get('deliveryType').setValue('');
    this.form.get('orderStatus').setValue('');
    this.form.get('paymentStatus').setValue('');
    this.filterAllList();
  }

  statusOrderTiming() {
    let payload = {
      shopId: 82,
      availabilityStatus: this.form.value.availabilityStatus,
      expectedDeliveryTiming: '',
      deliveryFacility: '',
    };
    this.content.timeStatus(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
      }
    });
  }

  /*** Delivery Man list ***/
  getDeliveryManList() {
    let payload = {
      shopId: 82,
    };
    // this.spinner.show();
    this.content.getDeliveryManLists(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.deliveryManList = response.data;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  statusOrderTiming2() {
    let payload = {
      shopId: 82,
      expectedDeliveryTiming: this.form.value.expectedDeliveryTiming
        ? this.form.value.expectedDeliveryTiming
        : '',
      deliveryFacility: '',
      availabilityStatus: '',
    };
    this.content.timeStatus(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
      }
    });
  }

  statusOrderTiming3() {
    let payload = {
      shopId: 82,
      deliveryFacility: this.form.value.deliveryFacility
        ? this.form.value.deliveryFacility
        : '',
      expectedDeliveryTiming: '',
      availabilityStatus: '',
    };
    this.content.timeStatus(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
      }
    });
  }

  scrollToCenter(data: any) {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }

    var fromDate = this.form.value.fromDate
      ? this.datepipe.transform(this.form.value.fromDate, 'yyyy-MM-dd')
      : '';

    let toDate = this.form.value.toDate
      ? this.datepipe.transform(this.form.value.toDate, 'yyyy-MM-dd')
      : '';

    if (fromDate !== '' && toDate === '') {
      // If fromDate is provided but toDate is null, set toDate to fromDate
      toDate = fromDate;
    }

    if (fromDate === '' && toDate !== '') {
      // If toDate is provided but fromDate is null, set fromDate to toDate
      fromDate = toDate;
    }
    this.form.patchValue({
      searchQuery: data.productName,
    });
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      vendorId: this.vendorId,
      fromDate: fromDate,
      toDate: toDate,
      paymentStatus: this.form.value.paymentStatus
        ? this.form.value.paymentStatus
        : '',
      isDairyProduct: this.form.value.isDairyProduct
        ? this.form.value.isDairyProduct
        : '',
      orderStatus: this.form.value.orderStatus
        ? this.form.value.orderStatus
        : '',
      deliveryType: this.form.value.deliveryType
        ? this.form.value.deliveryType
        : '',
      searchQuery: data.productName,
      shopId: localStorage.getItem('shopId'),
      deliveryManName: '',
    };
    this.content.allFilterOrder(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.list = response.data;
        this.orderlist = response.data.orderList.dataList;
        this.startRefreshIntervallist5();
        //   this.toaster.success(response.messages)
      } else {
        this.toaster.error(response.messages);
        this.orderlist = [];
      }
    });
    if (this.scrollTarget) {
      const element = this.scrollTarget.nativeElement;
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
