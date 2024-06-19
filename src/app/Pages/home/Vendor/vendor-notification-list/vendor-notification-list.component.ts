import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
declare var $: any;
@Component({
  selector: 'app-vendor-notification-list',
  templateUrl: './vendor-notification-list.component.html',
  styleUrls: ['./vendor-notification-list.component.css']
})
export class VendorNotificationListComponent implements OnInit {
  notificationList: any;
  notificationId: any;
  public searchText: any = '';
  search: any;
  itemToDelete: any;
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  constructor(
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getBroadList();
  }

  getBroadList() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000
    }
    this.spinner.show();
    this.content.getBroadNotification(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.notificationList = response.data.dataList;
        this.toasterService.success(response.messages);
      } else {
        this.toasterService.error(response.messages);
      }
    });
  }

  // delete notification 
  delet(data: any) {
    this.itemToDelete = data;
    $('#list-cross-mess').modal('show');
  }

  deleteNotification() {
    this.spinner.show();
    if (this.itemToDelete) {
      const itemId = this.itemToDelete.notificationId;
      this.content.deleteNotification(itemId).subscribe(response => {
        if (response.isSuccess) {
          this.spinner.hide();
          // Remove the deleted item from the local list
          this.notificationList = this.notificationList.filter((item: { notificationId: any; }) => item.notificationId !== itemId);
          // Close the modal
          $('#list-cross-mess').modal('hide');
          this.toasterService.success(response.messages);
        } else {
          this.spinner.hide();
          this.toasterService.error(response.messages);
        }
      });
    }
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

  refresh(): void {
    // Perform refresh actions
    // Update the query parameter with the current page index
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page },
      queryParamsHandling: 'merge'
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
