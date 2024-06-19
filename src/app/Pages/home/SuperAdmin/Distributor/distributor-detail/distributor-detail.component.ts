import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/Shared/service/content.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-distributor-detail',
  templateUrl: './distributor-detail.component.html',
  styleUrls: ['./distributor-detail.component.css']
})
export class DistributorDetailComponent implements OnInit {
  detail: any;
  editImages: any;
  rootUrl!: string;
  Id!: string | null;

  constructor(private content: ContentService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,) { }

  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.getdetail();
    this.rootUrl = environment.rootPathUrl;
  }
  
  backClicked() {
    this._location.back();
  }

  getdetail(){
    this.content.detailDistributor(this.Id).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.detail = response.data;
      }
    })
  }
}
