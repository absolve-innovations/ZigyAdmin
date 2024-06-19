import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-distributor-vendor-list',
  templateUrl: './distributor-vendor-list.component.html',
  styleUrls: ['./distributor-vendor-list.component.css']
})
export class DistributorVendorListComponent implements OnInit {
  vendorList: any;
  distributorId = localStorage.getItem('distributorId');
  vendorId: any;
  rootUrl: any;
  image = localStorage.getItem('profilepic');
  role = localStorage.getItem('role');
  shopName = localStorage.getItem('shopName');
  fName = localStorage.getItem('fname');
  lName = localStorage.getItem('lname');
  public searchText: any = '';
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  constructor(private toaster:ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,) { }

  ngOnInit(): void {
    this.getVendorList();
    this.rootUrl = environment.rootPathUrl;
  }

  getVendorList() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      createdBy: this.distributorId
    }
    // this.spinner.show();
    this.content.getDistributorVendorList(payload).subscribe(response => {
      if (response.isSuccess) {
        this.vendorList = response.data.dataList;
        //this.spinner.hide();
      } else {
      }
    });
  }

  delet(data: any) {
    this.vendorId = data.vendorId;
  }

  deleteVendor() {
    this.spinner.show();
    this.content.deleteVendor(this.vendorId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toaster.success(response.messages);
        window.location.reload();
      }  else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  route() {
    this.router.navigate(['/super-vendor-list/membership-plan-list'])
      .then(() => {
        window.location.reload();
      });
  }

  editPlan(data: any) {
    this.router.navigate(['/distributor-vendor-list/edit'],
      {
        queryParams: {
          id: data.vendorId,
        }
      });
  }

}
