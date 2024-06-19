import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-area',
  templateUrl: './add-edit-area.component.html',
  styleUrls: ['./add-edit-area.component.css']
})
export class AddEditAreaComponent implements OnInit {
  form:any;
  submitted: boolean = false;
  detail:any
  shopId!: string | null;
  areaCodeId: any;
  constructor(   private formBuilder: FormBuilder,
    private contentService: ContentService,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _location: Location,) { }

  ngOnInit(): void {
    this.shopId = localStorage.getItem('shopIdForDairy');
    this.areaForm();
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.getAreaDetail(params.id);
      }
    });
  }


  /** Add Area Form **/
  areaForm() {
    this.form = this.formBuilder.group({
      streetAddress1: ['', [Validators.required]],
      streetAddress2: [''],
      streetAddress3: [''],
      streetAddress4: [''],

    });
  }


// back 
  backClicked() {
    this._location.back();
  }

   /*** for validation ***/
   get f() {
    return this.form.controls;
  }


  // add edit Area

  postArea() {
    
    this.submitted = true;
    if (this.form.invalid) {
      this.toasterService.error("Form Incomplete: Please fill in all the required fields correctly");
      return;
    }
    if (this.detail) {

      let Payload1 = {
        areaCodeId : this.areaCodeId,
        shopId : this.shopId,
        streetAddress1 : this.form.value.streetAddress1,
        streetAddress2 : this.form.value.streetAddress2,
        streetAddress3 : this.form.value.streetAddress3,
        streetAddress4 : this.form.value.streetAddress4,
      }
   
      this.contentService.postArea(Payload1).subscribe(response => {
        // this.mainId = response.data?.mainProductCategoryId
      
        this.afterResponse(response);
      });

    } else {

      let payload = {
        shopId : this.shopId,
        streetAddress1 : this.form.value.streetAddress1,
        streetAddress2 : this.form.value.streetAddress2,
        streetAddress3 : this.form.value.streetAddress3,
        streetAddress4 : this.form.value.streetAddress4,
      }
  
      this.contentService.postArea(payload).subscribe(response => {

        // this.mainId = response.data?.mainProductCategoryId
    
        this.afterResponses(response);

      });
    }
  }


    // for status message
    afterResponse(response: any) {
      if (response && response.statusCode == 200) {
        if (response.isSuccess) {
          this._location.back();
          this.form.reset();
         this.toasterService.success(response.messages);
        
        }
        else {
          this.toasterService.error(response.messages);
        }
      }
    }

    // for status message
  afterResponses(response: any) {
    if (response && response.statusCode == 200) {
      if (response.isSuccess) {
        this._location.back();
        this.form.reset();
       this.toasterService.success(response.messages);
      
      }
      else {
        this.toasterService.error(response.messages);
      }
    }
  }


  // detail 

  getAreaDetail(id:any){
    this.contentService.areaDetail(id).subscribe(response => {
      if(response.isSuccess){

        this.detail = response.data
        this.areaCodeId = response.data?.areaCodeId;
        this.form.patchValue({
          streetAddress1: this.detail.streetAddress1,
          streetAddress2: this.detail.streetAddress2,
          streetAddress3: this.detail.streetAddress3,
          streetAddress4: this.detail.streetAddress4,
        });

      }
    });
  }


}
