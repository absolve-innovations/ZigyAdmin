import { Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-sub-sub-category-add-edit',
  templateUrl: './sub-sub-category-add-edit.component.html',
  styleUrls: ['./sub-sub-category-add-edit.component.css']
})
export class SubSubCategoryAddEditComponent implements OnInit {
  Id: any;
  form!: FormGroup;
  detail: any;
  editImages: any;
  submitted: boolean = false;
  imageFile!: { link: any; file: any; name: any; type: any; };
  id: any;
  rootUrl!: string;
  Id2: any;
  subId: any;
  constructor(private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private _location: Location) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.Id = this.route.snapshot.paramMap.get('id');
    this.Id2 = this.route.snapshot.paramMap.get('id2');
    this.categoryForm();
    this.getCategoryDetail();
  }

  /** Add Category Form **/
  categoryForm() {
    this.form = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
      categoryDescription: [''],

    });
  }

  /*** for validation ***/
  get f() {
    return this.form.controls;
  }

  backClicked() {
    this._location.back();
  }

  postCategory() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.detail) {
      let payload = {
        SubSubProductCategoryId: this.Id,
        categoryName: this.form.value.categoryName,
        categoryDescription: this.form.value.categoryDescription,
      }
      this.content.UpdateSubSubCategory(payload).subscribe(response => {
        this.subId = response.data?.subSubProductCategoryId
        this.fileChangeEvent();
        this.afterResponse(response);
      });
    } else {
      let payload = {
        subProductCategoryId: this.Id,
        categoryName: this.form.value.categoryName,
        categoryDescription: this.form.value.categoryDescription,
      }
      this.content.addSubCategory(payload).subscribe(response => {
        this.subId = response.data?.subSubProductCategoryId
        this.fileChangeEvent();
        this.afterResponse(response);
      });
    }
  }

  // for status message
  afterResponse(response: any) {
    if (response && response.statusCode == 200) {
      if (response.isSuccess) {
        this.showModal();
        this.form.reset();
        this.toasterService.success(response.messages);
      }
      else {
        this.toasterService.error(response.messages);
      }
    }
  }

  ok() {
    this.router.navigate(['/category-list'])
      .then(() => {
        window.location.reload();
      });
  }

  showModal() {
    $('#myModal').modal('show');
  }

  // Category Patch
  getCategoryDetail() {
    let payload = {
      MainProductCategoryId: this.Id2,
      SubSubProductCategoryId: this.Id
    }
    this.content.SubSubcategoryDetail(payload).subscribe(response => {
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

  /*** Image Upload ***/
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
    formData.append("SubSubProductCategoryId", this.subId);
    this.content.categoryImage(formData).subscribe(response => {
    });
  }
}
