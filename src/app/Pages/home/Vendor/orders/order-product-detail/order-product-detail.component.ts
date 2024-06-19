import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-product-detail',
  templateUrl: './order-product-detail.component.html',
  styleUrls: ['./order-product-detail.component.css']
})
export class OrderProductDetailComponent implements OnInit {
  data: any;
  rootUrl!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {
 this.rootUrl = environment.rootPathUrl;
    this.route.queryParamMap.subscribe((params: any) => {
      this.data = JSON.parse(params.params.detail);
      // this.appointmentType = this.patient.appointmentType;
    });
    
  }
  backClicked() {
    this._location.back();
  }
}
