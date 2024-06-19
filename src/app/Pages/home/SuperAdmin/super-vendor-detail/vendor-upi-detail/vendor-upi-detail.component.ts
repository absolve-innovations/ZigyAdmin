import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vendor-upi-detail',
  templateUrl: './vendor-upi-detail.component.html',
  styleUrls: ['./vendor-upi-detail.component.css']
})
export class VendorUpiDetailComponent implements OnInit {
  rootUrl: any;
  data: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParamMap.subscribe((params: any) => {
      this.data = JSON.parse(params.params.detail);
      // this.appointmentType = this.patient.appointmentType;
    });

}
}
