import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delivey-man-detail',
  templateUrl: './delivey-man-detail.component.html',
  styleUrls: ['./delivey-man-detail.component.css']
})
export class DeliveyManDetailComponent implements OnInit {
  deliveryManDetail: any;
  id: any;
  deliveryManId: any;

  constructor(
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    // private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.deliveryManId = this.route.snapshot.paramMap.get('id');
    this.getDeliveryManDetail();
  }

  // Delivery Man Detail Patch

  getDeliveryManDetail() {
    this.content.getDeliveryManDetails(this.deliveryManId).subscribe(response => {
      if (response.isSuccess) {
        this.toasterService.success(response.messages)
        this.deliveryManDetail = response.data;
        this.id = this.deliveryManDetail.deliveryManId
      } else {
      }
    });
  }

  backClicked() {
    this._location.back();
  }

}
