import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit {
  shopId:any;
  areaList: any;
  vendorId!: any;
  vendorDetail: any;
  id!: string | null;

  // search and pagination 
    // serach 
    public searchText: any = '';
    page: number = 0;
    itemsPerPage!: number;
    totalItems!: number;
  areaCodeId: any;
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
    this.vendorId = localStorage.getItem('vendorId');
    this.getAreaList();
    this.getvendorDetail();
    
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


   /** Vendor Detail **/

   getvendorDetail() {
    this.spinner.show();
    this.content.getVendorDetail(this.vendorId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.vendorDetail = response.data
        this.shopId = this.vendorDetail.shopResponses[0]?.shopId
       localStorage.setItem('shopIdForDairy', this.shopId);
      
      }
      this.spinner.hide();
    });
  }


  getAreaList(){
    
    this.id = localStorage.getItem('shopId')

    
  this.content.getAreaList(this.id).subscribe(response => {
  if(response.isSuccess) {
    this.areaList = response.data
  }

});
  }


   //  route  
   edit(data: any) {
    this.router.navigate(['/vendor/setting/area-list/add-area'],
      {
        queryParams: {
          id: data.areaCodeId
        }
      });
  }

  // delete Area 

  delete(data: any) {
    this.itemToDelete = data;
    $('#list-cross-mess').modal('show');
  }

  deleteArea(){
    this.spinner.show();
    if (this.itemToDelete) {
      const itemId = this.itemToDelete.areaCodeId;
    this.content.areaDelete(itemId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        // Remove the deleted item from the local list
        this.areaList = this.areaList.filter((item: { areaCodeId: any; }) => item.areaCodeId !== itemId);
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
