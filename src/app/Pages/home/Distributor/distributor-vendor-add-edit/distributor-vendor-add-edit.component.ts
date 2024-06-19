import {
  Component,
  OnInit,
  HostListener,
  NgZone,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { MapsAPILoader, AgmMap } from '@agm/core';
@Component({
  selector: 'app-distributor-vendor-add-edit',
  templateUrl: './distributor-vendor-add-edit.component.html',
  styleUrls: ['./distributor-vendor-add-edit.component.css'],
})
export class DistributorVendorAddEditComponent implements OnInit {
  form!: FormGroup;
  countriesList: any;
  countryIds: any;
  statesLists: any;
  submitted: boolean | null = null;
  editImages: any;
  selectedCountryId: any = 'india';
  toggleValue: boolean = true;

  // Image Upload

  imageFile!: { link: any; file: any; name: any; type: any };

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
  imageFiles!: { link: any; file: any; name: any; type: any };
  Shop: any;
  ShopImage: any;
  upidetail: any;
  upidetailId: any = [];
  urls: any = [];
  ids: any[] = [];
  upiDetailPatch: any;
  image: any;
  isActive!: boolean;
  upidetailIds: any;
  membershipRecordId!: any;
  recordId!: number;

  // // Google Map
  addressLat!: number;
  addressLong!: number;
  zoom!: number;
  addressCountry!: string;
  addressStreet!: string;
  private geoCoder!: google.maps.Geocoder;
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  inputAddress: string | undefined;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    private _location: Location,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // maps
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.inputAddress = place.formatted_address;

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.addressLat = place.geometry.location.lat();
          this.addressLong = place.geometry.location.lng();

          this.zoom = 12;
        });
      });
    });
    this.membershipRecordId = this.route.snapshot.paramMap.get('id');
    this.recordId = parseInt(this.membershipRecordId);
    this.vendorForm();
    this.getCountry();
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.getVendorDetail(params.id);
      }
    });
    this.getCountriesList();
  }

  backClicked() {
    this._location.back();
  }

  mapReady(map: any) {
    map.setOptions({
      zoomControl: 'true',
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
      },
    });
    //this.loader = true;
    map.addListener('dragend', () => {});
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.addressLat = position.coords.latitude;
        this.addressLong = position.coords.longitude;
        this.zoom = 14;
        this.getAddress(this.addressLat, this.addressLong);
      });
    }
  }

  getAddress(addressLat: number, addressLong: number) {
    this.geoCoder.geocode(
      { location: { lat: addressLat, lng: addressLong } },
      (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.addressStreet = results[0].formatted_address;
            this.addressCountry = results[13].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }

  /** Vendor Form **/
  vendorForm() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      dialCode: ['', [Validators.required]],
      countryId: [101],
      stateId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      membershipRecordId: [this.recordId],
      shopDetail: this.formBuilder.array([this.businessDetail()]),

      bankDetail: this.formBuilder.array([this.bankDetails()]),

      upiDetail: this.formBuilder.array([this.upiDetails()]),
    });
  }

  List1(): FormArray {
    return <FormArray>this.form.get('upiDetail');
  }

  add() {
    this.List1().push(this.upiDetails());
  }

  deleteHomeData(data: any, id: any) {
    this.List1().removeAt(id);
  }

  businessDetail() {
    return this.formBuilder.group({
      shopName: ['', [Validators.required]],
      shopDescription: ['', [Validators.required]],
      gstnumber: ['', [Validators.required]],
      businessPAN: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      shopAddress: [null],
    });
  }

  bankDetails() {
    return this.formBuilder.group(
      {
        bankName: ['', [Validators.required]],
        bankAccountHolderName: ['', [Validators.required]],
        bankAccountNumber: ['', [Validators.required]],
        branchName: ['', [Validators.required]],
        ifsc: ['', [Validators.required]],
        confirmbankAccountNumber: ['', [Validators.required]],
      },
      {
        validator: this.MustMatch(
          'bankAccountNumber',
          'confirmbankAccountNumber'
        ),
      }
    );
  }

  upiDetails() {
    return this.formBuilder.group({
      upiid: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      accountHolderName: ['', [Validators.required]],
      isActive: [],
      qrcode: [],
    });
  }

  // password match validation
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get shopDetail(): FormArray {
    return this.form.get('shopDetail') as FormArray;
  }

  get bankDetail(): FormArray {
    return this.form.get('bankDetail') as FormArray;
  }

  get upiDetail(): FormArray {
    return this.form.get('upiDetail') as FormArray;
  }

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
        var stateListData = this.statesLists?.find(
          (y: { stateName: any }) =>
            y.stateName == this.vendorDetailPatch?.stateName
        );
        this.form.patchValue({
          stateId: stateListData?.stateId,
        });
      }
    });
  }

  DisableCut(event: any) {
    event.preventDefault();
  }

  DisableCopy(event: any) {
    event.preventDefault();
  }

  DisablePaste(event: any) {
    event.preventDefault();
  }

  postVendor() {
    this.submitted = false;
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
      status: checkStatus,
    };
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
        upiDetail: this.form.value.upiDetail,
        shopDetail: [
          {
            shopName: this.form.value.shopDetail[0]?.shopName,
            shopDescription: this.form.value.shopDetail[0]?.shopDescription,
            shopAddress: this.form.value.shopDetail[0]?.shopAddress,
            landmark: this.form.value.shopDetail[0]?.landmark,
            city: this.form.value.shopDetail[0]?.city,
            zip: this.form.value.shopDetail[0]?.zip,
            gstnumber: this.form.value.shopDetail[0]?.gstnumber,
            businessPAN: this.form.value.shopDetail[0]?.businessPAN,
            shopId: this.shopDetailPatch[0]?.shopId,
          },
        ],
        bankDetail: [
          {
            bankName: this.form.value.bankDetail[0]?.bankName,
            bankAccountHolderName:
              this.form.value.bankDetail[0]?.bankAccountHolderName,
            bankAccountNumber: this.form.value.bankDetail[0]?.bankAccountNumber,
            branchName: this.form.value.bankDetail[0]?.branchName,
            ifsc: this.form.value.bankDetail[0]?.ifsc,
            bankId: this.bankDetailPatch[0]?.bankId,
          },
        ],
        // upiDetail: [{
        //   // upidetailId :this.form.value.upiDetail[0].upidetailId,
        //   upiid: this.form.value.upiDetail.upiid,
        //   bankName: this.form.value.upiDetail.bankName,
        //   accountHolderName: this.form.value.upiDetail.accountHolderName,
        //   isActive: data1.status

        // }]
      };
      this.contentService.editVendor(payload).subscribe((response) => {
        if (response.isSuccess) {
          this.imageId = this.vendorDetailPatch.vendorId;
          this.Shop = response.data.shopResponses;
          this.ShopId = this.Shop[0];
          this.upidetail = response.data.upiResponses;
          this.getItemById();
          this.ids = this.getItemById();
          this.fileChangeEvent();
          this.fileChangeEvents();
          this.fileQrChangeEvents();
          this.toasterService.success(response.messages);
          this.router.navigateByUrl('/distributor-vendor-list');
        } else {
          this.spinner.hide();
          this.toasterService.error(response.messages);
        }
      });
    } else {
      this.spinner.show();
      let payload1 = {
        email: this.form.value.email,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        gender: this.form.value.gender,
        dialCode: this.form.value.dialCode,
        phoneNumber: this.form.value.phoneNumber,
        countryId: this.form.value.countryId,
        stateId: this.form.value.stateId,
        membershipRecordId: this.recordId,
        upiDetail: this.form.value.upiDetail,
        shopDetail: [
          {
            shopName: this.form.value.shopDetail[0]?.shopName,
            shopDescription: this.form.value.shopDetail[0]?.shopDescription,
            shopAddress: this.inputAddress,
            landmark: this.form.value.shopDetail[0]?.landmark,
            city: this.form.value.shopDetail[0]?.city,
            zip: this.form.value.shopDetail[0]?.zip,
            gstnumber: this.form.value.shopDetail[0]?.gstnumber,
            businessPAN: this.form.value.shopDetail[0]?.businessPAN,
            addressLatitude: this.addressLat.toString(),
            addressLongitude: this.addressLong.toString(),
          },
        ],
        bankDetail: [
          {
            bankName: this.form.value.bankDetail[0]?.bankName,
            bankAccountHolderName:
              this.form.value.bankDetail[0]?.bankAccountHolderName,
            bankAccountNumber: this.form.value.bankDetail[0]?.bankAccountNumber,
            branchName: this.form.value.bankDetail[0]?.branchName,
            ifsc: this.form.value.bankDetail[0]?.ifsc,
          },
        ],
        // upiDetail: [{
        //   // upidetailId :this.form.value.upiDetail[0].upidetailId,
        //   upiid: this.form.value.upiDetail.upiid,
        //   bankName: this.form.value.upiDetail.bankName,
        //   accountHolderName: this.form.value.upiDetail.accountHolderName,
        //   isActive: data1.status

        // }]
      };
      this.contentService.addVendor(payload1).subscribe((response) => {
        if (response.isSuccess) {
          this.spinner.hide();
          this.imageId = response.data.vendorId;
          this.Shop = response.data.shopResponses;
          this.ShopId = this.Shop[0];
          this.upidetail = response.data.upiResponses;
          this.getItemById();
          this.ids = this.getItemById();
          this.fileChangeEvent();
          this.fileChangeEvents();
          this.fileQrChangeEvents();
          this.toasterService.success(response.messages);
          this.router.navigateByUrl('/distributor-vendor-list');
        } else {
          this.spinner.hide();
          this.toasterService.error(response.messages);
        }
      });
    }
  }

  handleFileInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imageUrl = _event.target.result;
        this.imageFiles = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name,
          type: event.srcElement.files[0].type,
        };
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  fileChangeEvents() {
    let formData = new FormData();
    formData.append('ShopImage', this.imageFiles?.file);
    formData.append('ShopId', this.ShopId.shopId);
    this.contentService.shopImage(formData).subscribe((response) => {});
  }

  imagesUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name,
          type: event.srcElement.files[0].type,
        };
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  fileChangeEvent() {
    let formData = new FormData();
    formData.append('ProfilePic', this.imageFile?.file);
    formData.append('Id', this.imageId);
    this.contentService.uploadImage(formData).subscribe((response) => {});
  }

  handleQrFileInput(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.image = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        this.urls.push(imageDataUrl);
      };
    }
  }

  fileQrChangeEvents() {
    const formData = new FormData();
    for (let i = 0; i < this.urls.length; i++) {
      const imageDataUrl = this.urls[i];
      const blob = this.dataURItoBlob(imageDataUrl);
      formData.append('qrcode', blob, `image_${i}.png`);
    }
    this.upidetailId = this.ids;
    formData.append('upidetailIds', this.upidetailId);
    this.contentService.UploadQrImage(formData).subscribe((response) => {});
  }

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

  getItemById(): any[] {
    return this.upidetail.map((item: { upidetailId: any }) => item.upidetailId);
  }

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

  getVendorDetail(id: string) {
    this.contentService.getVendorDetail(id).subscribe((response) => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.clearFormArray(this.List1());
        this.vendorDetailPatch = response.data;
        this.imageId = response.data.vendorId;
        this.shopDetailPatch = this.vendorDetailPatch.shopResponses;
        this.bankDetailPatch = this.vendorDetailPatch.bankResponses;
        this.upiDetailPatch = this.vendorDetailPatch.upiResponses;
        //  this.upidetailIds =this.vendorDetailPatch.upiResponses.upidetailId
        this.editImages = this.rootUrl + this.vendorDetailPatch?.profilePic;
        this.imageUrl = this.rootUrl + this.shopDetailPatch[0]?.shopImage;
        this.getCountry();
        this.patchShopDetail();
        this.patchBankDetail();
        // this.patchUpiDetail();
        this.form.patchValue({
          firstName: this.vendorDetailPatch.firstName,
          lastName: this.vendorDetailPatch.lastName,
          gender: this.vendorDetailPatch.gender,
          dialCode: this.vendorDetailPatch.dialCode,
          phoneNumber: this.vendorDetailPatch.phoneNumber,
          countryName: this.vendorDetailPatch.countryName,
          email: this.vendorDetailPatch.email,
        });
        if (this.vendorDetailPatch.upiResponses) {
          this.vendorDetailPatch.upiResponses.forEach((element: any) => {
            var listGroup = this.upiDetails();
            listGroup.patchValue({
              upiid: element.upiid,
              accountHolderName: element.accountHolderName,
              bankName: element.bankName,
              isActive: element.isActive,
            });
            this.List1().push(listGroup);
          });
        }
      }
    });
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  patchShopDetail() {
    var data = {
      shopDetail: [
        {
          shopId: this.shopDetailPatch[0]?.shopId,
          shopName: this.shopDetailPatch[0]?.shopName,
          shopDescription: this.shopDetailPatch[0]?.shopDescription,
          shopAddress: this.shopDetailPatch[0]?.shopAddress,
          landmark: this.shopDetailPatch[0]?.landmark,
          city: this.shopDetailPatch[0]?.city,
          zip: this.shopDetailPatch[0]?.zip,
          gstnumber: this.shopDetailPatch[0]?.gstnumber,
          businessPAN: this.shopDetailPatch[0]?.businessPAN,
        },
      ],
    };
    this.form.patchValue(data);
  }

  patchBankDetail() {
    var data = {
      bankDetail: [
        {
          bankName: this.bankDetailPatch[0]?.bankName,
          bankAccountHolderName: this.bankDetailPatch[0]?.bankAccountHolderName,
          bankAccountNumber: this.bankDetailPatch[0]?.bankAccountNumber,
          branchName: this.bankDetailPatch[0]?.branchName,
          ifsc: this.bankDetailPatch[0]?.ifsc,
          bankId: this.bankDetailPatch[0]?.bankId,
          confirmbankAccountNumber: this.bankDetailPatch[0]?.bankAccountNumber,
          // confirmbankAccountNumber = this.addBank.bankAccountNumber
        },
      ],
    };
    this.form.patchValue(data);
  }

  cancel() {
    this.router.navigateByUrl('/super-vendor-list').then(() => {
      window.location.reload();
    });
  }
}
