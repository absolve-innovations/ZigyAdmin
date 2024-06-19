import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-brand-add-edit',
  templateUrl: './brand-add-edit.component.html',
  styleUrls: ['./brand-add-edit.component.css']
})
export class BrandAddEditComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  imageFile!: { link: any; file: any; name: any; type: any; };
  editImages: any;
  detail: any;
  id: any;
  rootUrl!: string;
  brandId: any;
  constructor(  private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private _location: Location,) { }
    
  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.brandForm();
    this.route.queryParams.subscribe((params: any) => {    
      if (params.id) {
        this.getBrandDetail(params.id);
      }
    });
  }

   /** Brand Form **/
   brandForm() {
    this.form = this.formBuilder.group({
      brandName: ['', [Validators.required]],
      brandDescription: ['', [Validators.required]],   
    });
  }

  backClicked() {
    this._location.back();
  }


// Submit(){
//   this.submitted = true;
//   if (this.form.invalid) {
//     return;
//   }

//   this.content.addBrand(this.form.value).subscribe( response => {
//     if (response.isSuccess){

//     } else {

//     }
//   });
// }


Submit(){
  
  this.submitted = true;
    if (this.form.invalid) {
      this.toasterService.error("Form Incomplete: Please fill in all the required fields correctly");
      return;
    }
  if (this.detail) { 
    let payload = {
      brandId: this.id,
      brandName: this.form.value.brandName,
      brandDescription: this.form.value.brandDescription,
    }
    this.content.updateBrand(payload).subscribe(response => {
      this.brandId = response.data.brandId
      this.fileChangeEvent();
      this.afterResponse(response);
    });

  } else{

    let payload = {
      brandName: this.form.value.brandName,
      brandDescription: this.form.value.brandDescription,
    
    }
    this.content.addBrand(payload).subscribe(response => {

     this.brandId = response.data.brandId
      this.fileChangeEvent();
      this.afterResponse(response);
    
    });
  }
}

// for status message
afterResponse(response: any) {
if (response && response.statusCode == 200) {
if (response.isSuccess) {
  this.form.reset();
  this.toasterService.success(response.messages);
  // this.router.navigate(['/brand-list']);
  this._location.back();
  setTimeout(() => {
    window.location.reload();
  }, 500); 
}
else {
  this.toasterService.error(response.messages);
}
}
}


  /*** Image Upload ***/
  // image upload 
  imagesUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name,
          type: event.srcElement.files[0].type
        };
      };
      reader.readAsDataURL(event.target.files[0]);

    }
  }


  fileChangeEvent() {    
    let formData = new FormData();
    formData.append("BrandImage", this.imageFile?.file);
    formData.append("BrandId", this.brandId);
    this.content.brandImage(formData).subscribe(response => {
    });
  }


   // Brand Patch

   getBrandDetail(id:string){
    this.content.brandDetail(id).subscribe( response => { 
      if (response.isSuccess) {
        this.detail = response.data;
        this.id = this.detail.brandId     
        this.editImages = this.rootUrl + this.detail?.brandImage;
        this.form.patchValue({
          brandName: this.detail.brandName,
          brandDescription: this.detail.brandDescription,
        });
      }
    });
  }

}
