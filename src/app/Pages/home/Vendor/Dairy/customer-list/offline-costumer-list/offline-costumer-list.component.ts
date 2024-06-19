import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-offline-costumer-list',
  templateUrl: './offline-costumer-list.component.html',
  styleUrls: ['./offline-costumer-list.component.css']
})
export class OfflineCostumerListComponent implements OnInit {
  customerList: any;
  form: any;
  // serach 
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  customerUserId: any;
  id: any;
  search: any;
  itemToDelete: any;
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
    this.getCustomerList();
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

  getCustomerList() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      shopId: localStorage.getItem('shopId'),
    }
    this.spinner.show();
    this.content.getCustomerListOffline(payload).subscribe(response => {
      if (response.isSuccess) {
        this.customerList = response.data;
        this.spinner.hide();
      }
      else {
        this.toaster.error(response.messages);
        this.spinner.hide();
      }
    });
  }

  status(data: any) {
    // this.marked= data.target.checked
    data.isEdit = !data.isEdit;
    this.customerUserId = data.customerUserId
  }


  // pass coustumer Id 

  passId(data: any) {
    this.router.navigate(['/vendor/setting/offline-costumer-list/add-edit-customer'],
      {
        queryParams: {
          id: data.vendorCustomerId,
        }
      });
  }

  // delete Customer 

  delet(data: any) {
    this.itemToDelete = data;
    $('#list-cross-mess').modal('show');
  }

  deleteCustomer() {
    this.spinner.show();
    if (this.itemToDelete) {
      const itemId = this.itemToDelete;
    this.content.getofflineCustomerDelete(itemId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        // Remove the deleted item from the local list
        this.customerList = this.customerList.filter((item: { vendorCustomerId: any; }) => item.vendorCustomerId !== itemId);
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

