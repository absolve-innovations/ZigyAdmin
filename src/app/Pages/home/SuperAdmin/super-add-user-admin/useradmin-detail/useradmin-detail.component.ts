import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/Shared/service/content.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-useradmin-detail',
  templateUrl: './useradmin-detail.component.html',
  styleUrls: ['./useradmin-detail.component.css']
})
export class UseradminDetailComponent implements OnInit {
  Id!: string | null;
  detail: any;
  rootUrl!: string;

  constructor(private content: ContentService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,) { }

  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.getDetail();
    this.rootUrl = environment.rootPathUrl;
  }

  backClicked() {
    this._location.back();
  }
  
  getDetail() {
    this.spinner.show();
    this.content.UserAdminDetail(this.Id).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.detail = response.data;
      }
    });
  }
}
