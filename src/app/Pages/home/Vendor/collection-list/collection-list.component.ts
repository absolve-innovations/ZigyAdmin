import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {
  
  public searchText: any = '';
  page: number = 1;
  itemsPerPage!: number;
  totalItems!: number;
  collectionList: any;
  rootUrl!: string;

  constructor(
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.getCollectionList();
  }


  getCollectionList(){
    
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
    }
    this.spinner.show();
    this.content.getCollection(payload).subscribe(response => {
      if (response.isSuccess) {
        this.collectionList = response.data;
        this.spinner.hide();
      }
    });

  }
  
  /*** Delete Collection  ***/

  deleteCollection(data: any) {
    this.spinner.show();    
    this.content.deleteCollections(data).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.ngZone.run(() => { this.getCollectionList(); })
        this.toaster.success(response.messages);
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages)
      }
    });
  }

     // edit user 
     editcollection(data: any) {
      this.router.navigate(['/collection-list/collection-add-edit'],
        {
          queryParams: {
            id: data.collectionId
          }
        });
    }

}
