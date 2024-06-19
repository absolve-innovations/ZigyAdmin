import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})

export class CollectionDetailComponent implements OnInit {


  // collectionImage!: any[];
  options: any;
  collectionId: any;
  collectiondetail: any;
  rootUrl: any;

  slider: any
  collectionProduct: any;


  constructor(
    private content: ContentService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.collectionId = this.route.snapshot.paramMap.get('id');
    this.getCollectionDetail();
  }


  getCollectionDetail() {
    
    // this.spinner.show();
    this.content.collectionDetail(this.collectionId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.collectiondetail = response.data;
        //  this.collectionImage = response.data.collectionImage
        this.collectionProduct = this.collectiondetail.collectionProducts[0]
      }
    });
  }

}
