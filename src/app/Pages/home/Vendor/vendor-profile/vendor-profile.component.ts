import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { MapsAPILoader, AgmMap } from '@agm/core';
declare var $: any;
@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.css']
})
export class VendorProfileComponent implements OnInit {
  form!: FormGroup;
  countryIds: any;
  statesLists: any;
  submitted: boolean = false;
  editImages: any;
  selectedCountryId: any = 'india';

  // image upload
  imageFile!: { link: any, file: any, name: any, type: any };

  isValidFormSubmitted: boolean | null = null;
  vendorId: any;
  vendorDetailPatch: any;
  shopDetailPatch: any;
  bankDetailPatch: any;
  rootUrl: any;
  imageId: any;

  // Banner Image
  fileToUpload: any;
  imageUrl: any;
  name: any;
  ShopId: any;
  imageFiles!: { link: any; file: any; name: any; type: any; };
  Shop: any;
  ShopImage: any;
  countriesList: any;
  vendorIds = localStorage.getItem('id');
  upiDetailPatch: any;
  toggleValue: boolean = true;
  upidetailId: any = [];
  urls: any = [];
  ids: any[] = [];
  image: any;
  isActive!: boolean;
  upidetailIds: any;
  upidetail: any;

  // // Google Map
  addressLat!: number;
  addressLong!: number;
  zoom!: number;
  addressCountry!: string;
  addressStreet!: any;
  private geoCoder!: google.maps.Geocoder;
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  inputAddress: string | undefined;
  lati: any;
  long: any;
  selectedImageIndex: number = -1;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private _location: Location,
    private mapsAPILoader: MapsAPILoader) { }

  ngOnInit(): void {
    // maps
    this.getVendorDetail();
    this.mapsAPILoader.load().then(() => {
      //     this.setCurrentLocation();

      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.inputAddress = place.formatted_address
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.addressLat = place.geometry.location.lat();
          this.addressLong = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    this.vendorForm();
    this.getCountry();
    this.rootUrl = environment.rootPathUrl;
    this.getCountriesList();
  }

  /** Vendor Form **/
  vendorForm() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      dialCode: ['', [Validators.required]],
      countryId: [101],
      stateId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      shopDetail: this.formBuilder.array([
        this.businessDetail(),
      ]),
      // bankDetail: this.formBuilder.array([
      //   this.bankDetails(),
      // ]),
      // upiDetail: this.formBuilder.array([
      //   this.upiDetails(),
      // ])
    });
  }

  // upiDetails() {
  //   return this.formBuilder.group({
  //     upiid: ['', [Validators.required]],
  //     qrcode: ['', [Validators.required]],
  //     isActive: [this.isActive],
  //     bankName: ['', [Validators.required]],
  //     accountHolderName: ['', [Validators.required]],

  //   });
  // }


  businessDetail() {
    return this.formBuilder.group({
      shopName: ['', [Validators.required]],
      shopDescription: ['', [Validators.required]],
      gstnumber: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.minLength(15), Validators.maxLength(15)]],
      businessPAN: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      shopAddress: ['', [Validators.required]]
    });
  }

  // bankDetails() {
  //   return this.formBuilder.group({
  //     bankName: ['', [Validators.required]],
  //     bankAccountHolderName: ['', [Validators.required]],
  //     bankAccountNumber: ['', [Validators.required]],
  //     branchName: ['', [Validators.required]],
  //     ifsc: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
  //     isActive: [true],
  //     confirmbankAccountNumber: ['', [Validators.required]],
  //   },
  //     {
  //       validator: this.MustMatch('bankAccountNumber', 'confirmbankAccountNumber')
  //     });
  // }

  // password match validation
  // MustMatch(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {
  //     const control = formGroup.controls[controlName];
  //     const matchingControl = formGroup.controls[matchingControlName];

  //     if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
  //       // return if another validator has already found an error on the matchingControl
  //       return;
  //     }

  //     // set error on matchingControl if validation fails
  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ mustMatch: true });
  //     } else {
  //       matchingControl.setErrors(null);
  //     }
  //   }
  // }

  // List1(): FormArray {
  //   return (<FormArray>this.form.get("upiDetail"));
  // }

  // add() {
  //   this.List1().push(this.upiDetails());
  // }

  // deleteHomeData(data: any, id: any) {
  //   this.List1().removeAt(id)
  // }

  /*** Form Validation ***/

  get shopDetail(): FormArray {
    return this.form.get('shopDetail') as FormArray;
  }

  // get bankDetail(): FormArray {
  //   return this.form.get('bankDetail') as FormArray;
  // }

  // get upiDetail(): FormArray {
  //   return this.form.get('upiDetail') as FormArray;
  // }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get gender() {
    return this.form.get('gender');
  }

  get dialCode() {
    return this.form.get('dialCode');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get countryId() {
    return this.form.get('countryId');
  }

  get stateId() {
    return this.form.get('stateId');
  }

  get email() {
    return this.form.get('email');
  }

  get f() {
    return this.form['controls'];
  }
  // get gst() {
  //   return this.form.get('gstnumber');
  // }


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
        var stateListData = this.statesLists?.find((y: { stateName: any; }) => y.stateName == this.vendorDetailPatch?.stateName);
        this.form.patchValue({
          stateId: stateListData?.stateId,
        });
      }
    });
  }

  /** Disable Input cut Copy Paste  **/

  DisableCut(event: any) {
    event.preventDefault();
  }

  DisableCopy(event: any) {
    event.preventDefault();
  }

  DisablePaste(event: any) {
    event.preventDefault();
  }

  // for map
  mapReady(map: any) {

    map.setOptions({
      zoomControl: "true",
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      }
    });
    //this.loader = true;
    map.addListener("dragend", () => {

      // do something with centerLatitude/centerLongitude
      //api call to load dynamic marker for your application
      //this.loader = false;
    });
  }

  getlocation() {
    // Assuming this.lati and this.long are strings, convert them to numbers
    this.addressLat = parseFloat(this.lati);
    this.addressLong = parseFloat(this.long);
    this.zoom = 14;
    this.getAddress(this.addressLat, this.addressLong);
  }

  setCurrentLocation() {

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.addressLat = position.coords.latitude;
        this.addressLong = position.coords.longitude;
        this.zoom = 14;
        this.getAddress(this.addressLat, this.addressLong);
      });
    }
  }

  getAddress(addressLat: any, addressLong: any) {

    if (this.geoCoder) {
      // Initialize this.geoCoder here if it's not already initialized
      this.geoCoder = new google.maps.Geocoder();
    }

    this.geoCoder?.geocode({ location: { lat: addressLat, lng: addressLong } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;

          this.addressStreet = results[0].formatted_address;
          // If you want to access the country, you can do it like this:
          // this.addressCountry = results[0].address_components.find(component =>
          //   component.types.includes('country')
          // )?.long_name;

        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  // patch vendor

  // Vendor detail 
  getVendorDetail() {

    this.spinner.show();
    this.contentService.getVendorDetail(this.vendorIds).subscribe(response => {
      if (response.isSuccess) {
        // this.spinner.hide();
        // this.clearFormArray(this.List1());
        this.vendorDetailPatch = response.data;
        this.imageId = response.data.vendorId;
        this.shopDetailPatch = this.vendorDetailPatch.shopResponses;
        this.addressStreet = this.shopDetailPatch[0].shopAddress;
        this.lati = this.shopDetailPatch[0].addressLatitude;
        this.long = this.shopDetailPatch[0].addressLongitude;

        // this.bankDetailPatch = this.vendorDetailPatch.bankResponses
        // this.upiDetailPatch = this.vendorDetailPatch.upiResponses
        this.editImages = this.rootUrl + this.vendorDetailPatch?.profilePic;
        this.imageUrl = this.rootUrl + this.shopDetailPatch[0]?.shopImage;
        // this.image = this.vendorDetailPatch.upiResponses[0].qrcode
        this.getCountry();
        this.patchShopDetail();

        // this.patchBankDetail();
        this.getlocation();
        this.form.patchValue({
          firstName: this.vendorDetailPatch.firstName,
          lastName: this.vendorDetailPatch.lastName,
          gender: this.vendorDetailPatch.gender,
          dialCode: this.vendorDetailPatch.dialCode,
          phoneNumber: this.vendorDetailPatch.phoneNumber,
          countryName: this.vendorDetailPatch.countryName,
          email: this.vendorDetailPatch.email,
        });
        // if (this.vendorDetailPatch.upiResponses) {
        //   this.vendorDetailPatch.upiResponses.forEach((element: any) => {
        //     var listGroup = this.upiDetails();
        //     listGroup.patchValue({ upiid: element.upiid, accountHolderName: element.accountHolderName,
        //       bankName: element.bankName, isActive:element.isActive , qrcode:element.qrcode});
        //     this.List1().push(listGroup)
        //   });
        // }
      }
      this.spinner.hide();
    });
  }

  // clearFormArray = (formArray: FormArray) => {
  //   while (formArray.length !== 0) {
  //     formArray.removeAt(0)
  //   }
  // }

  patchShopDetail() {
    var data = {
      shopDetail: [{
        shopId: this.shopDetailPatch[0]?.shopId,
        shopName: this.shopDetailPatch[0]?.shopName,
        shopDescription: this.shopDetailPatch[0]?.shopDescription,
        shopAddress: this.shopDetailPatch[0]?.shopAddress,
        landmark: this.shopDetailPatch[0]?.landmark,
        city: this.shopDetailPatch[0]?.city,
        zip: this.shopDetailPatch[0]?.zip,
        gstnumber: this.shopDetailPatch[0]?.gstnumber,
        businessPAN: this.shopDetailPatch[0]?.businessPAN,
        addressLatitude: this.addressLat?.toString(),
        addressLongitude: this.addressLong?.toString(),
      }]
    }
    this.form.patchValue(data);
  }
  // patchBankDetail() {
  //   var data = {
  //     bankDetail: [{
  //       bankName: this.bankDetailPatch[0]?.bankName,
  //       bankAccountHolderName: this.bankDetailPatch[0]?.bankAccountHolderName,
  //       bankAccountNumber: this.bankDetailPatch[0]?.bankAccountNumber,
  //       branchName: this.bankDetailPatch[0]?.branchName,
  //       ifsc: this.bankDetailPatch[0]?.ifsc,
  //       bankId: this.bankDetailPatch[0]?.bankId,
  //       confirmbankAccountNumber: this.bankDetailPatch[0]?.bankAccountNumber,
  //       // confirmbankAccountNumber = this.addBank.bankAccountNumber
  //     }]
  //   }
  //   this.form.patchValue(data);
  // }


  // QR Image 
  // handleQrFileInput(event: any): void {
  //   
  //   const files = event.target.files;

  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     this.image = file
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       const imageDataUrl = reader.result as string;
  //       this.urls.push(imageDataUrl);
  //     };
  //   }
  // }

  handleQrFileInput(event: any, index: number) {
    // ... Your existing code ...
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.image = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        this.urls.push(imageDataUrl);

        // Set the imageUrl to the last uploaded image URL
        this.image = imageDataUrl;

        // Trigger the modal to open
      };
    }
    // Set the selected image index
    this.selectedImageIndex = index;
  }

  // Function to open the preview modal
  openPreviewModal(index: number) {
    // Check if an image is selected

    if (index >= 0 && this.urls[index]) {
      // Set the imageUrl to the selected image URL
      this.image = this.urls[index];

      // Trigger the modal to open
      $('#myModal4').modal('show');
    }
  }


  // fileQrChangeEvents() {

  //   const formData = new FormData();
  //   for (let i = 0; i < this.urls.length; i++) {
  //     const imageDataUrl = this.urls[i];
  //     const blob = this.dataURItoBlob(imageDataUrl);
  //     formData.append('qrcode', blob, `image_${i}.png`);
  //   }
  //   this.upidetailId = this.ids
  //   formData.append("upidetailIds", this.upidetailId);
  //   this.contentService.UploadQrImage(formData).subscribe(response => {
  //   });
  // }

  private dataURItoBlob(dataURI: string): Blob {

    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }


  // getItemById(): any[] {

  //   return this.upidetail.map((item: { upidetailId: any; }) => item.upidetailId);
  // }

  checkStatus(event: any) {
    if (event.currentTarget?.checked) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }

  checkCondition() {

    if (this.toggleValue) {
      // Condition when toggleValue is true
    } else {
      // Condition when toggleValue is false
    }
  }


  /*** Post Vendor  ***/

  postVendor() {

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    let checkStatus: any;
    if (this.isActive == true) {
      checkStatus = true;
    } else {
      if (this.isActive == false) {
        checkStatus = false;
      } else {
        checkStatus = false;
      }
    }

    let data1 = {
      status: checkStatus
    }
    if (this.vendorDetailPatch) {
      let payload = {
        email: this.form.value.email,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        gender: this.form.value.gender,
        dialCode: this.form.value.dialCode,
        phoneNumber: this.form.value.phoneNumber,
        countryId: this.form.value.countryId,
        stateId: this.form.value.stateId,
        vendorId: this.vendorDetailPatch.vendorId,
        // upiDetail: this.form.value.upiDetail,
        shopDetail: [{
          shopName: this.form.value.shopDetail[0]?.shopName,
          shopDescription: this.form.value.shopDetail[0]?.shopDescription,
          shopAddress: this.addressStreet,
          landmark: this.form.value.shopDetail[0]?.landmark,
          city: this.form.value.shopDetail[0]?.city,
          zip: this.form.value.shopDetail[0]?.zip,
          gstnumber: this.form.value.shopDetail[0]?.gstnumber,
          businessPAN: this.form.value.shopDetail[0]?.businessPAN,
          shopId: this.shopDetailPatch[0]?.shopId,
          addressLatitude: this.addressLat?.toString(),
          addressLongitude: this.addressLong?.toString(),
        }],
        // bankDetail: [{
        //   bankName: this.form.value.bankDetail[0]?.bankName,
        //   bankAccountHolderName: this.form.value.bankDetail[0]?.bankAccountHolderName,
        //   bankAccountNumber: this.form.value.bankDetail[0]?.bankAccountNumber,
        //   branchName: this.form.value.bankDetail[0]?.branchName,
        //   ifsc: this.form.value.bankDetail[0]?.ifsc,
        //   bankId: this.bankDetailPatch[0]?.bankId,

        // }],
      }

      this.spinner.show();
      this.contentService.editVendor(payload).subscribe(response => {

        if (response.isSuccess) {
          this.imageId = this.vendorDetailPatch.vendorId;
          this.Shop = response.data.shopResponses;
          this.ShopId = this.Shop[0];
          // this.upidetail = response.data.upiResponses;
          // this.getItemById();

          // this.ids = this.getItemById();
          this.fileChangeEvent();
          this.fileChangeEvents();
          // this.fileQrChangeEvents();
          this.spinner.hide();
          this.toasterService.success(response.messages);
          this.router.navigateByUrl('/vendor-product-list');
        } else {
          this.spinner.hide();
          this.toasterService.error(response.messages);
        }
      });
    }
  }

  // Shop Image 
  handleFileInput(event: any) {
    if (event.target.files && event.target.files[0]) {

      //Show image preview
      let reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imageUrl = _event.target.result;

        this.imageFiles = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name,
          type: event.srcElement.files[0].type,
        };
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  fileChangeEvents() {

    let formData = new FormData();
    formData.append("ShopImage", this.imageFiles?.file);
    formData.append("ShopId", this.ShopId.shopId);
    this.contentService.shopImage(formData).subscribe(response => {
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
      // this.name = this.imageFile.link
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  fileChangeEvent() {
    let formData = new FormData();
    formData.append("ProfilePic", this.imageFile?.file);
    formData.append("Id", this.imageId);
    this.contentService.uploadImage(formData).subscribe(response => {
    });
  }

  cancel() {
    this.router.navigateByUrl('/vendor-profile')
      .then(() => {
        window.location.reload();
      });
  }


}
