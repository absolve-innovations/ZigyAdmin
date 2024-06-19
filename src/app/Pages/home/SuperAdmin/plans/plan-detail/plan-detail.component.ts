import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {
  membershipPlanId: any;
  planDetail: any;

  constructor(
    private contentService: ContentService,
    // private router: Router,
    private spinner:NgxSpinnerService,
    private route: ActivatedRoute,
    private _location: Location) { }

  ngOnInit(): void {
    this.membershipPlanId = this.route.snapshot.paramMap.get('id');
    this.getPlanDetail()
  }

  backClicked() {
    this._location.back();
  }
  
  getPlanDetail(){
     this.contentService.planDetail(this.membershipPlanId).subscribe((response) => {
       if (response.isSuccess) {
         this.planDetail = response.data;
         this.spinner.hide();      
       }
     });
   }
}
