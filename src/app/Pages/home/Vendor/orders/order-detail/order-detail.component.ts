import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  rootUrl!: string;
  orderDetailId!: any ;
  orderDetails: any;
  product: any;
  data: any;
  productId: any;

  constructor( private content: ContentService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.orderDetailId = this.route.snapshot.paramMap.get('id');
    this.orderDetail();
  }

  backClicked() {
    this._location.back();
  }

  orderDetail(){
    this.spinner.show();
    this.content.orderDetail(this.orderDetailId).subscribe(response => {
      if(response.isSuccess){
        this.spinner.hide();
        this.orderDetails = response.data,
        this.product = response.data.orderedProducts,    
        this.toaster.success(response.messages);
      } else {   
       this.toaster.error(response.messages);
        this.spinner.hide();
      }
    });
  }

  navigateToDetail(item:any){
    item = JSON.stringify(item);
    this.router.navigate(['/orders-list/product-detail'], { queryParams: { detail: item } });
  }

 
}
