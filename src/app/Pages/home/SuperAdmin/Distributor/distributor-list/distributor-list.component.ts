import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-distributor-list',
  templateUrl: './distributor-list.component.html',
  styleUrls: ['./distributor-list.component.css']
})
export class DistributorListComponent implements OnInit {
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  public searchText: any = '';
  rootUrl!: string;
  list: any;
  vendorId: any;
  search: any;
  itemToDelete: any;
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.getDistributorList();
  }

  /*** Distributor List ***/
  getDistributorList() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000
    }
    this.content.listDistributor(payload).subscribe(response => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        this.list = response.data.dataList
      } else {
        this.toaster.error(response.messages)
      }
    })
  }

  // edit user 
  editPlan(data: any) {
    this.router.navigate(['/distributor-list/distributor-add-edit'],
      {
        queryParams: {
          id: data.id
        }
      });
  }

  /*** Delete Distributor  ***/
  delet(data: any) {
    this.itemToDelete = data;
    $('#list-cross-mess').modal('show');
  }

  deleteDistributor() {
    this.spinner.show();
    if (this.itemToDelete) {
      debugger
      const itemId = this.itemToDelete.id;
    this.content.deleteDistributor(itemId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        // Remove the deleted item from the local list
        this.list = this.list.filter((item: { id: any; }) => item.id !== itemId);
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
