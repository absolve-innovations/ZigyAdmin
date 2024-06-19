import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-user-admin-list',
  templateUrl: './user-admin-list.component.html',
  styleUrls: ['./user-admin-list.component.css'],
})
export class UserAdminListComponent implements OnInit {
  userList: any;
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  rootUrl: any;
  adminId: any;
  search: any;
  itemToDelete: any;
  constructor(
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.getUserList();
    this.rootUrl = environment.rootPathUrl;
  }

  /*** vendor list ***/

  getUserList() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
    };
    this.spinner.show();
    this.content.getAdminUserList(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.userList = response.data.dataList;
        this.spinner.hide();
      }
    });
  }

  // edit user
  editPlan(data: any) {
    this.router.navigate(['/user-admin-list/add-user-admin'], {
      queryParams: {
        id: data.id,
      },
    });
  }

  delet(data: any) {
    this.itemToDelete = data;
    $('#list-cross-mess').modal('show');
  }

  deleteUser() {
    this.spinner.show();
    if (this.itemToDelete) {
      const itemId = this.itemToDelete.id;
      this.content.deleteAdminUser(itemId).subscribe((response) => {
        if (response.isSuccess) {
          this.spinner.hide();
          // Remove the deleted item from the local list
          this.userList = this.userList.filter(
            (item: { id: any }) => item.id !== itemId
          );
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
