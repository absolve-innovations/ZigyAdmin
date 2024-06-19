import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customerList: any;
  form: any;
  // serach 
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  customerUserId: any;
  showSelectedBox : any;
  selectedItem: any = null;
search:any;
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });
    this.getGroceryCustomerLists();
    // this.getDairyCustomerList();
    
    // this.rootUrl = environment.rootPathUrl;
    this.form = this.formBuilder.group({  
      areaCodeId: ['']

    });
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

  /*** Customer list ***/

  // getDairyCustomerList() {
  //   let payload = {
  //     shopId: localStorage.getItem('shopId'),
  //     dairyStatus: 1
  //   }
  //    this.spinner.show();
  //   this.content.getCustomerLists(payload).subscribe(response => {
  //     if (response.isSuccess) {
  //       this.customerList = response.data;
  //       this.spinner.hide(); 
  //     }
  //     else {
  //       this.toaster.error(response.messages);
  //       this.spinner.hide();
  //     }

  //   });
  // }

  
  getGroceryCustomerLists() {
    // let payload = {
    //   shopId: localStorage.getItem('shopId'),
    // }
    this.refresh();
     this.spinner.show();
    this.content.getGroceryCustomerList(localStorage.getItem('shopId')).subscribe(response => {
      if (response.isSuccess) {
        this.customerList = response.data;
        this.toaster.success(response.messages);
        this.spinner.hide(); 
      }
      else {
        // this.toaster.error(response.messages);
        this.spinner.hide();
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
  this.customerUserId = data.customerUserId;
  this.showSelectedBox = data.isEdit;
  this.form.patchValue({ 
    areaCodeId : data.areaCodeId
  })
}

  /**  Update Area Code  **/

  setCustomerAreaCode() {
    let payload = {
      // productId: this.productId.toString(),
      // inStock: this.form.value.inStock
      shopId: localStorage.getItem('shopId'),
      areaCodeId: this.form.value.areaCodeId,
      customerUserId: this.customerUserId
    }
    this.content.setAreaCodeForCustomer(payload).subscribe(response => {
      if (response.isSuccess) {
        window.location.reload();
        this.toaster.success(response.messages);
      } else {
        this.toaster.error(response.messages);
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

