import { Component, ElementRef, NgZone, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Location } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'app-delivery-man-order-detail',
  templateUrl: './delivery-man-order-detail.component.html',
  styleUrls: ['./delivery-man-order-detail.component.css']
})
export class DeliveryManOrderDetailComponent implements OnInit {
  deliveryManDetail: any;
  id: any;
  deliveryManId: any;
  type!: string | null;
  rootUrl: any
  productDetail: any;
  orderedProducts: any;
  product: any;
  detail!: { productName: any; containerTypeName: any; quantity: any; quantityTypeName: any; totalSellingPrice: any; };
  openRowIndex: number = -1; // To track the open row index
  categoryList: any;
  dropdownSettings = {};
  bindproductList!: any[];
  productList: any;
  selectedItems: any[] = [];
  form!: FormGroup;
  additionList: any;
  productId: any = [];
  selectedItem: any = null;
  showSelectedBox: any;
  searchByDate: any;
  isDairyProduct:any;
  timing:any;
  constructor(
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    // private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private _location: Location,
    private renderer: Renderer2, private elementRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
 

    this.route.queryParams.subscribe(params => {
      // Access the query parameters
      this.deliveryManId = params['deliveryManId'];
      this.searchByDate = params['searchByDate'];
      this.isDairyProduct = params['isDairyProduct'];
      this.timing = params['timing'];

      // Now you have access to the query parameters in this component
    });
    // this.type = this.route.snapshot.paramMap.get('type');
    this.getDeliveryManDetail();
    this.getProductList();
    this.getAdditional();
    this.dropdownSettings = {
      singleSelection: true,
      selectAllText: null, 
      unSelectAllText: null, 
      allowSearchFilter: true,
      itemsShowLimit: null,
      idField: 'item_id',
      textField: 'customLabel',
    };

    this.form = this.formBuilder.group({
      productIds: [''],
      returedItem: [''],
      totalItem: ['']
    });
  }
  generateCustomLabel(item: any): string {
    // Combine multiple fields to create a custom label
    return `${item.item_text}  - ${item.item_quantity} ${item.item_quanType}`;
  }
  // Delivery Man Detail Patch
  getDeliveryManDetail() {
    this.spinner.show();
    let payload = {
      deliveryManId: parseInt(this.deliveryManId),
      timing:this.timing,
      isDairyProduct : parseInt(this.isDairyProduct),
      searchByDate : this.searchByDate
    }
    this.content.getDeliveryManOrderDetails(payload).subscribe(response => {
      if (response.isSuccess) {
        this.toasterService.success(response.messages);
        this.deliveryManDetail = response.data.dataList;
        this.productDetail = this.deliveryManDetail.orderList.orderedProducts;
        this.id = this.deliveryManDetail.deliveryManId;
        this.spinner.hide();
      } else {
        this.toasterService.error(response.messages);
        this.spinner.hide();
      }
    });
  }

  filterAndPrintOrderedProducts(orderDetailId: any) {
    const order = this.deliveryManDetail.orderList.find((order: { orderDetailId: number; }) => order.orderDetailId === orderDetailId);
    if (order) {
      this.orderedProducts = order.orderedProducts;

      // Log the details of the ordered products in the console
      // console.log("Ordered Products:");
      // this.orderedProducts.forEach((product: { productName: any; containerTypeName: any; quantity: any; quantityTypeName: any; totalSellingPrice: any; }) => {

      //   this.detail = product
      // debugger
      // });
    } else {
      console.log(`Order with orderDetailId  not found.`);
    }
  }


  backClicked() {
    this._location.back();
  }

  click(orderDetailId: number, rowIndex: number) {
    this.filterAndPrintOrderedProducts(orderDetailId);
    this.cdRef.markForCheck();
    if (this.openRowIndex === rowIndex) {
      this.openRowIndex = -1; // Close the clicked row if it's already open
    } else {
      this.openRowIndex = rowIndex; // Open the clicked row
    }
  }

  getProductList() {
    this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      shopId: localStorage.getItem('shopId'),
      deliveryManId: this.deliveryManId
    }
    this.content.getadditionalProductlist(payload).subscribe(response => {
      if (response.isSuccess) {
        // this.clearFormArray(this.productList);
        this.productList = response.data.dataList;
        this.bindproductList = [];
        this.productList.forEach((element: any) => {
          // Create an object with multiple properties
          const item = {
            item_id: element.productId,
            item_text: element.productName,
            item_quantity: element.quantity, // Use underscores instead of hyphens
            item_quanType: element.quantityTypeName
          };
          this.bindproductList?.push(item);
        });
        this.bindproductList.forEach(item => {
          item.customLabel = this.generateCustomLabel(item);
        });
        this.spinner.hide();
      }
    });
  }


  getAdditional() {
    let payload = {
      shopId: localStorage.getItem('shopId'),
      deliveryManId: this.deliveryManId,
      timing : this.timing,
      isDairyProduct : this.isDairyProduct,
      searchByDate : this.searchByDate
    }
    this.content.getAdditionalList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.additionList = response.data
      } else {
      }
    });
  }

  status(data: any) {
    console.log(data);
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
    this.deliveryManId = data.deliveryManId;
    this.form.patchValue({
      totalItem: data.totalItem
    });
  }
  
  setProductTotalItem() {
    let payload = {
      // productId: this.productId.toString(),
      // inStock: this.form.value.inStock
      shopId: localStorage.getItem('shopId'),
      areaCodeId: this.form.value.areaCodeId,
      // customerUserId: this.customerUserId
    }
    this.content.setAreaCodeForCustomer(payload).subscribe(response => {
      if (response.isSuccess) { 
        window.location.reload();
        this.toasterService.success(response.messages);
      } else {
        this.toasterService.error(response.messages);
      }
    });
  }

  setProductReturnItem() {
    let payload = {
      // productId: this.productId.toString(),
      // inStock: this.form.value.inStock
      shopId: localStorage.getItem('shopId'),
      areaCodeId: this.form.value.areaCodeId,
      // customerUserId: this.customerUserId
    }
    this.content.setAreaCodeForCustomer(payload).subscribe(response => {
      if (response.isSuccess) {
        window.location.reload();
        this.toasterService.success(response.messages);
      } else {
        this.toasterService.error(response.messages);
      }
    });
  }
  
  // delete
  delete(data: any) {
    this.spinner.show();
    this.content.deleteAdditional(data).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toasterService.success(response.messages);
        window.location.reload();
      } else {
        this.spinner.hide();
        this.toasterService.error(response.messages);
      }
    });
  }

  addeditProduct(data:any) {
   
   let shopIdString = localStorage.getItem('shopId');
   var shopId: any;
   
   if (shopIdString !== null) {
     shopId = parseInt(shopIdString, 10);
   } else {
     // Handle the case where 'shopId' is not present in localStorage
     // You might want to provide a default value or show an error message
     console.error("Missing 'shopId' in localStorage");
   }
      let payload = {     
        productId: data[0]?.item_id,
        shopId: shopId || 0,
        totalItem: 1,
        returedItem: 0,
        isDairyProduct: parseInt(this.isDairyProduct),
        deliveryManId: parseInt(this.deliveryManId),
        timing: this.timing,
      }
      this.content.addeditAdditional(payload).subscribe(response => {
       if(response.isSuccess){
        this.toasterService.success(response.messages);
        window.location.reload();
       } else {
        this.toasterService.error(response.messages);
       }
      });
    }
    
  }

