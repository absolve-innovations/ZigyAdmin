import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dairy-top-up-list',
  templateUrl: './dairy-top-up-list.component.html',
  styleUrls: ['./dairy-top-up-list.component.css']
})
export class DairyTopUpListComponent implements OnInit {

  topUpList: any;
  
rootUrl: any;

  // serach 
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  customerUserId: any;
  form: any;
  walletId: any;
  payment: any;
  search:any;
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });
    this.rootUrl = environment.rootPathUrl;
    this.getTopUpList();
    this.form = this.formBuilder.group({
      paymentStatus: [''],
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

  getTopUpList() {
    
    let payload = {
      shopId: localStorage.getItem('shopIdForDairy'),
  
    }
    // this.spinner.show();
  
    this.content.getDairyTopUpList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.topUpList = response.data;
        this.spinner.hide();
      }
      else {
        this.toaster.error(response.messages);
        this.spinner.hide();
      }
    });
  }

  paymentStatus(){
    this.payment = this.form.value.paymentStatus
  }
  postDairyWalletStatus(data:any){
    
    let payload = {
      dairyWalletId : data.dairyWalletId,
      paymentStatus :  this.form.value.paymentStatus
    }
    // this.spinner.show();
    this.content.postWalletStatus(payload).subscribe(response => {
      if(response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages)

      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
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
