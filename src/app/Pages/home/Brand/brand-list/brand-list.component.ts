import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  // serach 
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  brandList: any;
  rootUrl: any;
  brandId: any;
  search: any;
  itemToDelete: any;
  
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0; // Use the 'page' query parameter value, or default to 1
    });
    this.rootUrl = environment.rootPathUrl;
    this.getbrandList();
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

  /*** Brand List ***/

  getbrandList() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
    }
    this.spinner.show();
    this.content.getBrand(payload).subscribe(response => {
      if (response.isSuccess) {
        this.brandList = response.data.dataList;

        this.spinner.hide();
      }
    });
  }

  // edit user 
  edit(data: any) {
    this.router.navigate(['/brand-list/brand-add-edit'],
      {
        queryParams: {
          id: data.brandId
        }
      });
  }

  delet(data: any) {
    this.itemToDelete = data;
    $('#list-cross-mess').modal('show');
  }

  deleteBrand() {
    this.spinner.show();
    if (this.itemToDelete) {
      debugger
      const itemId = this.itemToDelete.brandId;
    this.content.deletebrand(itemId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        // Remove the deleted item from the local list
        this.brandList = this.brandList.filter((item: { brandId: any; }) => item.brandId !== itemId);
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
