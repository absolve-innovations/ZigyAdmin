import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  customerUser:any;
  vendorCustomerId:any;
  customerDetail: any;
  customerAddress: any;

  constructor(
    private contentService: ContentService,
    // private router: Router,
    private spinner:NgxSpinnerService,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.customerUser = this.route.snapshot.paramMap.get('id');
    this.customerAddress = this.route.snapshot.paramMap.get('id2')

    this.getCustomerDetail();
  }

  

  
   getCustomerDetail() {
    
    let payload = {
      customerAddressId: this.customerAddress,
      shopId: localStorage.getItem('shopId'),
      customerUserId: this.customerUser
    }
    this.spinner.show();
    this.contentService.getCustomerDetails(payload).subscribe(response => {
      if (response.isSuccess) {
        this.customerDetail = response.data;
      
        this.spinner.hide();
      }
    });
  }

  backClicked() {
    this._location.back();
  }

}
