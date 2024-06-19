import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-distributor-profile',
  templateUrl: './distributor-profile.component.html',
  styleUrls: ['./distributor-profile.component.css']
})
export class DistributorProfileComponent implements OnInit {
  form!: FormGroup;
  countriesList: any;
  statesLists: any;
  distributorDetailPatch: any;
  rootUrl: any;
  editImages: any;
  distributorId = localStorage.getItem('distributorId');
  imageFile!: { link: any; file: any; name: any; type: any; };
  id!: string

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.distributorProfileForm();
    this.getCountry();
    this.getCountriesList();
    this.distributorDetail()
  }

  /** Vendor Form **/
  distributorProfileForm() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      dialCode: ['', [Validators.required]],
      countryId: [101],
      stateId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  getCountriesList() {
    this.contentService.getAllCountries().subscribe((response) => {
      if (response.statusCode) {
        this.countriesList = response.data;
      }
    });
  }

  getCountry() {
     this.contentService.getAllStates(101).subscribe((response) => {
      if (response.statusCode) {
        this.statesLists = response.data;
        var stateListData = this.statesLists?.find((y: { stateName: any; }) => y.stateName == this.distributorDetailPatch?.stateName);
        this.form.patchValue({
          stateId: stateListData?.stateId,
        })
      }
    });
  }
  distributorDetail() {
    this.spinner.show();
    this.contentService.getDistributorDetail(this.distributorId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.distributorDetailPatch = response.data
        this.editImages = this.rootUrl + this.distributorDetailPatch?.profilePic;
        this.getCountry();
        this.form.patchValue({
          firstName: this.distributorDetailPatch.firstName,
          lastName: this.distributorDetailPatch.lastName,
          gender: this.distributorDetailPatch.gender,
          dialCode: this.distributorDetailPatch.dialCode,
          phoneNumber: this.distributorDetailPatch.phoneNumber,
          countryName: this.distributorDetailPatch.countryName,
          email: this.distributorDetailPatch.email,
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
    formData.append("ProfilePic", this.imageFile?.file);
    formData.append("Id", this.id);
    this.contentService.uploadImage(formData).subscribe(response => {
    });
  }

  postDistributorProfile() {
    if (this.distributorDetailPatch) {
      let payload = {
        id: this.distributorId,
        email: this.form.value.email,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        gender: this.form.value.gender,
        dialCode: this.form.value.dialCode,
        phoneNumber: this.form.value.phoneNumber,
        countryId: this.form.value.countryId,
        stateId: this.form.value.stateId,
      }
      this.spinner.show();
      this.contentService.updateDistributorProfile(payload).subscribe(response => {
        if (response.isSuccess) {
          this.spinner.hide();
          this.id = response.data?.id;
          this.fileChangeEvent();
          this.toasterService.success(response.messages);
          // this.router.navigateByUrl('/vendor-product-list')
        } else {
          this.spinner.hide();
          this.toasterService.error(response.messages);
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/distributor-list')
      .then(() => {
        window.location.reload();
      });
  }

}

