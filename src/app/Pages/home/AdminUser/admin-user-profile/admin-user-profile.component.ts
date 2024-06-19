import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.component.html',
  styleUrls: ['./admin-user-profile.component.css']
})
export class AdminUserProfileComponent implements OnInit {
  form!: FormGroup;
  countriesList: any;
  statesLists: any;
  distributorDetailPatch: any;
  rootUrl: any;
  editImages: any;
  userAdminId = localStorage.getItem('id');
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
    this.userAdminProfileForm();
    this.getCountry();
    this.getCountriesList();
    this.distributorDetail()
  }

  /** Vendor Form **/
  userAdminProfileForm() {
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

    /** get country list */
    getCountriesList() {
      this.contentService.getAllCountries().subscribe((response) => {
        if (response.statusCode) {
          this.countriesList = response.data;
        }
      });
    }

    /** get state list */
    getCountry() {
      // this.countryIds = this.form.controls['countryId'].value;
      this.contentService.getAllStates(101).subscribe((response) => {
        if (response.statusCode) {
          this.statesLists = response.data;
          var stateListData = this.statesLists?.find((y: { stateName: any; }) => y.stateName == this.distributorDetailPatch?.stateName);
          this.form.patchValue({
            stateId: stateListData?.stateId,
          });
        }
      });
    }
    // Detail  

    distributorDetail(){
      this.spinner.show();
      this.contentService.getDistributorDetail(this.userAdminId).subscribe(response => {
        if (response.isSuccess) {
          this.spinner.hide();
          this.distributorDetailPatch = response.data;     
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
    formData.append("ProfilePic", this.imageFile?.file);
    formData.append("Id", this.id);
    this.contentService.uploadImage(formData).subscribe(response => {
    });
  }

    postDistributorProfile() {
      // this.submitted = false;
      // if (this.form.invalid) {
      //   return;
      // }
    
      if (this.distributorDetailPatch) {
        let payload = {
          id: this.userAdminId,
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
        this.contentService.updateUserAdminProfile(payload).subscribe(response => {
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

    cancel(){
      this.router.navigateByUrl('/admin-user-dashboard')
      .then(() => {
        window.location.reload();
      });
    }

}

