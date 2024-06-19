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
  selector: 'app-subcategory-add-edit',
  templateUrl: './subcategory-add-edit.component.html',
  styleUrls: ['./subcategory-add-edit.component.css']
})
export class SubcategoryAddEditComponent implements OnInit {
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

  constructor(
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private _location: Location,) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.Id = this.route.snapshot.paramMap.get('id');
    this.Id2 = this.route.snapshot.paramMap.get('id2');
    this.categoryForm();
    this.getCategoryDetail();
  }

  backClicked() {
    this._location.back();
  }

  /** Add Category Form **/
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
        subProductCategoryId: this.Id,
        categoryName: this.form.value.categoryName,
        categoryDescription: this.form.value.categoryDescription,
      }
      this.content.UpdateSubCategory(payload).subscribe(response => {
        this.subId = response.data.subProductCategoryId
        this.fileChangeEvent();
        this.afterResponse(response);
      });

    } else {
      let payload = {
        mainProductCategoryId: this.Id2,
        categoryName: this.form.value.categoryName,
        categoryDescription: this.form.value.categoryDescription,
      }
      this.content.addSubCategory(payload).subscribe(response => {
        this.subId = response.data?.subProductCategoryId
        this.fileChangeEvent();
        this.afterResponse(response);
      });
    }
  }
  
  /*** for validation ***/
  get f() {
    return this.form.controls;
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
      SubProductCategoryId: this.Id
    }
    this.content.SubcategoryDetail(payload).subscribe(response => {
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
    formData.append("SubProductCategoryId", this.subId);
    this.content.categoryImage(formData).subscribe(response => {
    });
  }
}
