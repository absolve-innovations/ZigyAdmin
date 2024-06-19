import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.css']
})
export class CategoryAddEditComponent implements OnInit {
  form!: FormGroup;
  detail: any;
  rootUrl: any;
  editImages: any;
  submitted: boolean = false;
  imageFile!: { link: any; file: any; name: any; type: any; };
  id: any;
  mainId: any;
  userRole= localStorage.getItem('user');
  
  constructor(
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.categoryForm();
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.getCategoryDetail(params.id);
      }
    });
  }
  backClicked() {
    this._location.back();
  }
  get f() {
    return this.form.controls;
  }
  categoryForm() {
    this.form = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
      categoryDescription: [''],
    });
  }

  postCategory() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.detail) {
      let payload = {
        mainProductCategoryId: this.id,
        categoryName: this.form.value.categoryName,
        categoryDescription: this.form.value.categoryDescription,
      }
      this.contentService.UpdateCategory(payload).subscribe(response => {
        this.mainId = response.data?.mainProductCategoryId;
        this.fileChangeEvent();
        debugger
        this.afterResponse(response);
      });
    } else {
      let payload = {
        categoryName: this.form.value.categoryName,
        categoryDescription: this.form.value.categoryDescription,
      }
      this.contentService.addCategory(payload).subscribe(response => {
        this.mainId = response.data?.mainProductCategoryId;
        this.fileChangeEvent();
        debugger
        this.afterResponses(response);
      });
    }
  }

  afterResponse(response: any) {
    if (response && response.statusCode == 200) {
      if (response.isSuccess) {
        if (this.userRole == 'SuperAdmin') {
          this.router.navigate(['/category-list'])
          .then(() => {
           window.location.reload();
         });
          this.toasterService.success(response.messages);
        } 
        this.showModal();
      }
     else {
        this.toasterService.error(response.messages);
      }
    }
  }
  afterResponses(response: any) {
    if (response && response.statusCode == 200) {
      if (response.isSuccess) {
        if (this.userRole == 'SuperAdmin') {
          this.router.navigate(['/category-list'])
          .then(() => {
           window.location.reload();
         });
          this.toasterService.success(response.messages);
        } else{
        this.showModal();
        // this.form.reset();
        // this.toasterService.success('Thanks for placing category request. Your request will be processed in 24hrs');
        // this.router.navigate(['/category-list']);
      }
    }
      else {
        this.toasterService.error(response.messages);
      }
    }
  }
  ok(){
     this.router.navigate(['/category-list'])
     .then(() => {
      window.location.reload();
    });
  }
  showModal() {
    $('#myModal').modal('show');
  }
  getCategoryDetail(id: string) {
    this.contentService.categoryDetail(id).subscribe(response => {
      if (response.isSuccess) {
        this.detail = response.data;
        this.id = this.detail.mainProductCategoryId
        this.editImages = this.rootUrl + this.detail?.categoryImage;
        this.form.patchValue({
          categoryName: this.detail.categoryName,
          categoryDescription: this.detail.categoryDescription,
        });
      }
    });
  }
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
    formData.append("CategoryImage", this.imageFile?.file);
    formData.append("MainProductCategoryId", this.mainId);
    this.contentService.categoryImage(formData).subscribe(response => {

    });
  }
}

