import { Component, NgZone, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { DatePipe, Location, formatDate } from '@angular/common';


@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.css']
})
export class AppInfoComponent implements OnInit {
  @ViewChild('eveningCheckboxRef') eveningCheckboxRef!: ElementRef;
  @ViewChild('morningCheckboxRef') morningCheckboxRef!: ElementRef;
  appInformation: any;
  form!: FormGroup;
  selectedTime: Date = new Date();
  vendorId: any;
  shopIds: any;
  vendorDetail: any;
  morningOrderTiming: any;
  convertedMorningTime: any;
  eveningOrderTiming: any;
  convertedEveningTiming: any;
  morningDeliveryTime: any;
  eveningDeliveryTime: any;
  convertedEveningTime!: string;
  dairyId: any;
  isActive!: boolean;
  toggleValue: boolean = true;
  convertedMorningDeliveryTime!: string;
  dateTime = new Date()
  shopIdForDairy = localStorage.getItem('shopIdForDairy');
  shopId = localStorage.getItem('shopId');

  // Declare an array of strings without initialization
  subscriptions = [
    {
      subscriptionId: 0,
      subscriptionName: 'Daily',
      status: false,
    },
    {
      subscriptionId: 0,
      subscriptionName: 'Alternate Day',
      status: false,
    },
    {
      subscriptionId: 0,
      subscriptionName: 'Every 3 Day',
      status: false,
    },
    {
      subscriptionId: 0,
      subscriptionName: 'Weekly',
      status: false,
    },
    {
      subscriptionId: 0,
      subscriptionName: 'Monthly',
      status: false,
    },
  ];

  eveningOrderByTiming: any;
  eveningDailyDeliveryTime: any;
  morningOrderByTiming: any;
  morningDailyDeliveryTime: any;
  eveningCheckbox: any;
  morningCheckbox: any;
  orderByTimingControl1: any;
  dailyDeliveryTimeControl1: any;
  orderByTimingControl: any;
  dailyDeliveryTimeControl: any;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    private _location: Location,
    private datepipe: DatePipe,
    private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.vendorId = localStorage.getItem('vendorId');
    this.getDairyInformation();
    this.getvendorDetail();
    this.form = this.formBuilder.group({
      // topUpAmountList         : ['', [Validators.required]],
      minimumWalletAmount: ['', [Validators.required]],
      maximumWalletAmount: ['', [Validators.required]],
      // morningDailyDeliveryTime: [''],
      // morningOrderByTiming    : ['', [Validators.required]],
      eveningCheckbox: new FormControl(), // Checkbox control
      eveningOrderByTiming: new FormControl({ value: '', disabled: false }),
      eveningDailyDeliveryTime: new FormControl({ value: '', disabled: false }),
      morningCheckbox: new FormControl(), // Checkbox control
      morningDailyDeliveryTime: new FormControl({ value: '', disabled: false }),
      morningOrderByTiming: new FormControl({ value: '', disabled: false }),
      dairyFeatures: this.formBuilder.array([
        this.dairyDetails(),
      ]),

      subscriptionFeatures: this.formBuilder.array([
        this.subscriptionDetails(),
      ]),
      subscriptions: this.formBuilder.array([]),

    });
    this.setSubscriptionsInForm();
  }

  dairyDetails() {
    return this.formBuilder.group({
      dairyFeatureTitle: ['', [Validators.required]],
      dairyFeatureDescription: ['', [Validators.required]],
      status: [this.isActive],
    });
  }

  subscriptionDetails() {
    return this.formBuilder.group({
      subscriptionFeatureTitle: ['', [Validators.required]],
      subscriptionFeatureDescription: ['', [Validators.required]],
      status: [this.isActive],
    });
  }

  get subscriptionControls(): FormArray {
    return this.form.get('subscriptions') as FormArray;
  }

  setSubscriptionsInForm() {
    this.subscriptions.forEach((subscription) => {
      this.subscriptionControls.push(this.formBuilder.group({
        subscriptionId: [subscription.subscriptionId],
        subscriptionName: [subscription.subscriptionName],
        status: [subscription.status]
      }));
    });
  }

  List1(): FormArray {
    return (<FormArray>this.form.get("dairyFeatures"));
  }

  add() {
    this.List1().push(this.dairyDetails());
  }

  deleteHomeData(data: any, id: any) {
    this.List1().removeAt(id)
  }

  List2(): FormArray {
    return (<FormArray>this.form.get("subscriptionFeatures"));
  }

  add1() {
    this.List2().push(this.subscriptionDetails());
  }

  deleteSubsData(data: any, id: any) {
    this.List2().removeAt(id)
  }
  getvendorDetail() {
    this.contentService.getVendorDetail(this.vendorId).subscribe(response => {
      if (response.isSuccess) {
        this.vendorDetail = response.data
        this.shopIds = this.vendorDetail.shopResponses[0]?.shopId
        localStorage.setItem('shopIdForDairy', this.shopIds);
      }
      this.spinner.hide();
    });
  }
  getDairyInformation() {
    this.spinner.show();
    let payload = {
      shopId: this.shopId,
    }
    this.contentService.getDairyInfo(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.clearFormArray(this.List1());
        this.clearFormArray(this.List2());
        this.toasterService.success(response.messages);
        this.appInformation = response.data;
        this.dairyId = response.data.dairyInfoId;
        const checkbox = this.eveningCheckboxRef.nativeElement as HTMLInputElement;
        const checkbox1 = this.morningCheckboxRef.nativeElement as HTMLInputElement;
        this.orderByTimingControl1 = this.form.get('morningOrderByTiming');
        this.dailyDeliveryTimeControl1 = this.form.get('morningDailyDeliveryTime');
        this.orderByTimingControl = this.form.get('eveningOrderByTiming');
        this.dailyDeliveryTimeControl = this.form.get('eveningDailyDeliveryTime');
        if (this.appInformation.morningDailyDeliveryTime == null && this.appInformation.eveningDailyDeliveryTime != null) {

          this.eveningDeliveryTime = this.appInformation.eveningDailyDeliveryTime;
          this.convertedEveningTime = this.convertTime(this.eveningDeliveryTime);

          this.eveningOrderTiming = this.appInformation.eveningOrderByTiming;
          this.convertedEveningTiming = this.convertTime(this.eveningOrderTiming);
          this.form.patchValue({

            minimumWalletAmount: this.appInformation.minimumWalletAmount,
            maximumWalletAmount: this.appInformation.maximumWalletAmount,
            eveningDailyDeliveryTime: this.convertedEveningTime,
            eveningOrderByTiming: this.convertedEveningTiming,
            subscriptions: this.appInformation.subscriptions,
            morningCheckbox: false,
            eveningCheckbox: true,
          });
          if (this.appInformation.dairyFeatures) {
            this.appInformation.dairyFeatures.forEach((element: any) => {
              var listGroup = this.dairyDetails();
              listGroup.patchValue({
                dairyFeatureTitle: element.dairyFeatureTitle,
                dairyFeatureDescription: element.dairyFeatureDescription,
                dairyFeatureImage: element.dairyFeatureImage,
                status: element.status
              });
              this.List1().push(listGroup)
            });
          }
          if (this.appInformation.subscriptionFeatures) {
            this.appInformation.subscriptionFeatures.forEach((element: any) => {
              var listGroup = this.subscriptionDetails();
              listGroup.patchValue({
                subscriptionFeatureTitle: element.subscriptionFeatureTitle,
                subscriptionFeatureDescription: element.subscriptionFeatureDescription,
                dairyFeatureImage: element.dairyFeatureImage,
                status: element.status
              });
              this.List2().push(listGroup)
            });
          }
        } else if (this.appInformation.eveningDailyDeliveryTime == null && this.appInformation.morningDailyDeliveryTime != null) {
          this.morningDeliveryTime = this.appInformation.morningDailyDeliveryTime;
          this.convertedMorningDeliveryTime = this.convertTime(this.morningDeliveryTime);

          this.morningOrderTiming = this.appInformation.morningOrderByTiming;
          this.convertedMorningTime = this.convertTime(this.morningOrderTiming);

          this.form.patchValue({
            minimumWalletAmount: this.appInformation.minimumWalletAmount,
            maximumWalletAmount: this.appInformation.maximumWalletAmount,
            morningDailyDeliveryTime: this.convertedMorningDeliveryTime,
            morningOrderByTiming: this.convertedMorningTime,
            subscriptions: this.appInformation.subscriptions,
            morningCheckbox: true,
            eveningCheckbox: false,

          });

          if (this.appInformation.dairyFeatures) {
            this.appInformation.dairyFeatures.forEach((element: any) => {
              var listGroup = this.dairyDetails();
              listGroup.patchValue({
                dairyFeatureTitle: element.dairyFeatureTitle,
                dairyFeatureDescription: element.dairyFeatureDescription,
                dairyFeatureImage: element.dairyFeatureImage,
                status: element.status
              });
              this.List1().push(listGroup)
            });
          }
          if (this.appInformation.subscriptionFeatures) {
            this.appInformation.subscriptionFeatures.forEach((element: any) => {
              var listGroup = this.subscriptionDetails();
              listGroup.patchValue({
                subscriptionFeatureTitle: element.subscriptionFeatureTitle,
                subscriptionFeatureDescription: element.subscriptionFeatureDescription,
                dairyFeatureImage: element.dairyFeatureImage,
                status: element.status
              });
              this.List2().push(listGroup)
            });
          }

        } else if (this.appInformation.eveningDailyDeliveryTime == null && this.appInformation.morningDailyDeliveryTime == null) {
          this.form.patchValue({
            minimumWalletAmount: this.appInformation.minimumWalletAmount,
            maximumWalletAmount: this.appInformation.maximumWalletAmount,
            morningDailyDeliveryTime: this.convertedMorningDeliveryTime,
            morningOrderByTiming: this.convertedMorningTime,
            eveningDailyDeliveryTime: this.convertedEveningTime,
            eveningOrderByTiming: this.convertedEveningTiming,
            subscriptions: this.appInformation.subscriptions,
            morningCheckbox: false,
            eveningCheckbox: false,
          });
          if (this.appInformation.dairyFeatures) {
            this.appInformation.dairyFeatures.forEach((element: any) => {
              var listGroup = this.dairyDetails();
              listGroup.patchValue({
                dairyFeatureTitle: element.dairyFeatureTitle,
                dairyFeatureDescription: element.dairyFeatureDescription,
                dairyFeatureImage: element.dairyFeatureImage,
                status: element.status
              });
              this.List1().push(listGroup)
            });
          }
          if (this.appInformation.subscriptionFeatures) {
            this.appInformation.subscriptionFeatures.forEach((element: any) => {
              var listGroup = this.subscriptionDetails();
              listGroup.patchValue({
                subscriptionFeatureTitle: element.subscriptionFeatureTitle,
                subscriptionFeatureDescription: element.subscriptionFeatureDescription,
                dairyFeatureImage: element.dairyFeatureImage,
                status: element.status
              });
              this.List2().push(listGroup)
            });
          }
        }
        else {
          this.morningDeliveryTime = this.appInformation.morningDailyDeliveryTime;
          this.convertedMorningDeliveryTime = this.convertTime(this.morningDeliveryTime);

          this.eveningDeliveryTime = this.appInformation.eveningDailyDeliveryTime;
          this.convertedEveningTime = this.convertTime(this.eveningDeliveryTime);

          this.morningOrderTiming = this.appInformation.morningOrderByTiming;
          this.convertedMorningTime = this.convertTime(this.morningOrderTiming);

          this.eveningOrderTiming = this.appInformation.eveningOrderByTiming;
          this.convertedEveningTiming = this.convertTime(this.eveningOrderTiming);

          this.form.patchValue({
            minimumWalletAmount: this.appInformation.minimumWalletAmount,
            maximumWalletAmount: this.appInformation.maximumWalletAmount,
            morningDailyDeliveryTime: this.convertedMorningDeliveryTime,
            morningOrderByTiming: this.convertedMorningTime,
            eveningDailyDeliveryTime: this.convertedEveningTime,
            eveningOrderByTiming: this.convertedEveningTiming,
            subscriptions: this.appInformation.subscriptions,
            morningCheckbox: true,
            eveningCheckbox: true
          });
          if (this.appInformation.dairyFeatures) {
            this.appInformation.dairyFeatures.forEach((element: any) => {
              var listGroup = this.dairyDetails();
              listGroup.patchValue({
                dairyFeatureTitle: element.dairyFeatureTitle,
                dairyFeatureDescription: element.dairyFeatureDescription,
                dairyFeatureImage: element.dairyFeatureImage,
                status: element.status
              });
              this.List1().push(listGroup)
            });
          }
          if (this.appInformation.subscriptionFeatures) {
            this.appInformation.subscriptionFeatures.forEach((element: any) => {
              var listGroup = this.subscriptionDetails();
              listGroup.patchValue({
                subscriptionFeatureTitle: element.subscriptionFeatureTitle,
                subscriptionFeatureDescription: element.subscriptionFeatureDescription,
                dairyFeatureImage: element.dairyFeatureImage,
                status: element.status
              });
              this.List2().push(listGroup)
            });
          }
        }
        if (checkbox1.checked && checkbox.checked) {
          this.orderByTimingControl.enable();
          this.dailyDeliveryTimeControl?.enable();
          this.orderByTimingControl1?.enable();
          this.dailyDeliveryTimeControl1?.enable();
        } else if (!checkbox1.checked && checkbox.checked) {
          this.orderByTimingControl1.disable();
          this.dailyDeliveryTimeControl1?.disable();
          this.orderByTimingControl?.enable();
          this.dailyDeliveryTimeControl?.enable();
        }
        else if (checkbox1.checked && !checkbox.checked) {
          this.orderByTimingControl1.enable();
          this.dailyDeliveryTimeControl1?.enable();
          this.orderByTimingControl?.disable();
          this.dailyDeliveryTimeControl?.disable();
        } else {
          this.orderByTimingControl1.disable();
          this.dailyDeliveryTimeControl1?.disable();
          this.orderByTimingControl?.disable();
          this.dailyDeliveryTimeControl?.disable();
        }
      } else {
        this.spinner.hide();
        this.toasterService.error(response.messages);
      }
    });
  }

  patchSubscriptionData() {
    const updatedSubscriptions = [
      this.appInformation.subscriptions
      // Add more updated subscription objects here
    ];
    const subscriptionsArray = this.form.get('subscriptions') as FormArray;
    // Loop through the updatedSubscriptions array and patch the values to the existing form controls
    updatedSubscriptions.forEach((subscription, index) => {
      const subscriptionControl = subscriptionsArray.at(index);
      subscriptionControl.patchValue({ status: subscription.status });
    });
  }
  convertTime(time: string): string {
    const [timePart, period] = time.split(' ');
    const [hours, minutes] = timePart.split(':');
    let formattedHours = parseInt(hours, 10);
    if (period === 'PM' && formattedHours !== 12) {
      formattedHours += 12;
    } else if (period === 'AM' && formattedHours === 12) {
      formattedHours = 0;
    }
    const formattedTime = `${String(formattedHours).padStart(2, '0')}:${minutes}`;
    return formattedTime;
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  checkStatus(event: any) {
    if (event.currentTarget?.checked) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }
  checkStatus1(event: any) {

    if (event.currentTarget?.checked) {
      this.isActive = true;
    } else {
      this.isActive = false;

    }
  }

  checkCondition() {
    if (this.toggleValue) {
      // Condition when toggleValue is true
      //  
    } else {
      // Condition when toggleValue is false

    }
  }

  addUpdate() {
    if (this.appInformation == undefined) {
      this.addDairyInfo();
    } else {
      this.updateDairyInfo();
    }
  }
  addDairyInfo() {
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
    let payload = {
      dairyInfoId: 0,
      shopId: this.shopIds,
      //   topUpAmountList          : this.form.value.topUpAmountList,
      minimumWalletAmount: this.form.value.minimumWalletAmount,
      maximumWalletAmount: this.form.value.maximumWalletAmount,
      morningDailyDeliveryTime: this.form.value.morningDailyDeliveryTime,
      morningOrderByTiming: this.form.value.morningOrderByTiming,
      eveningDailyDeliveryTime: this.form.value.eveningDailyDeliveryTime,
      eveningOrderByTiming: this.form.value.eveningOrderByTiming,
      paymentStatus: this.form.value.paymentStatus,
      subscriptionFeatures: this.form.value.subscriptionFeatures,
      subscriptions: this.form.value.subscriptions,
      dairyFeatures: [{
        dairyFeatureTitle: this.form.value.dairyFeatures[0]?.dairyFeatureTitle,
        dairyFeatureDescription: this.form.value.dairyFeatures[0]?.dairyFeatureDescription,
        status: this.form.value.dairyFeatures[0]?.status,
      }]
    }
    this.spinner.show();
    this.contentService.updateDairy(payload).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.toasterService.success(response.messages);
      } else {
        this.spinner.hide();
        this.toasterService.error(response.messages);
      }
    });

  }
  updateDairyInfo() {
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
    if (this.appInformation) {
      const checkbox = this.eveningCheckboxRef.nativeElement as HTMLInputElement;
      const checkbox1 = this.morningCheckboxRef.nativeElement as HTMLInputElement;
      if (checkbox.checked && !checkbox1.checked) {
        this.morningDailyDeliveryTime = null,
          this.morningOrderByTiming = null,
          this.eveningDailyDeliveryTime = this.form.value.eveningDailyDeliveryTime,
          this.eveningOrderByTiming = this.form.value.eveningOrderByTiming

      } else if (checkbox1.checked && !checkbox.checked) {
        this.morningDailyDeliveryTime = this.form.value.morningDailyDeliveryTime,
          this.morningOrderByTiming = this.form.value.morningOrderByTiming,
          this.eveningDailyDeliveryTime = null,
          this.eveningOrderByTiming = null
      } else {
        this.morningDailyDeliveryTime = this.form.value.morningDailyDeliveryTime,
          this.morningOrderByTiming = this.form.value.morningOrderByTiming,
          this.eveningDailyDeliveryTime = this.form.value.eveningDailyDeliveryTime,
          this.eveningOrderByTiming = this.form.value.eveningOrderByTiming
      }

      let payload = {
        dairyInfoId: this.dairyId,
        shopId: this.shopId,
        // topUpAmountList          : this.form.value.topUpAmountList,
        minimumWalletAmount: this.form.value.minimumWalletAmount,
        maximumWalletAmount: this.form.value.maximumWalletAmount,
        morningDailyDeliveryTime: this.morningDailyDeliveryTime,
        morningOrderByTiming: this.morningOrderByTiming,
        eveningDailyDeliveryTime: this.eveningDailyDeliveryTime,
        eveningOrderByTiming: this.eveningOrderByTiming,
        paymentStatus: this.form.value.paymentStatus,
        subscriptionFeatures: this.form.value.subscriptionFeatures,
        subscriptions: this.form.value.subscriptions,
        dairyFeatures: [{
          dairyFeatureTitle: this.form.value.dairyFeatures[0]?.dairyFeatureTitle,
          dairyFeatureDescription: this.form.value.dairyFeatures[0]?.dairyFeatureDescription,
          status: this.form.value.dairyFeatures[0]?.status,
        }]
      }
      this.spinner.show();
      this.contentService.updateDairy(payload).subscribe(response => {
        if (response.isSuccess) {
          this.spinner.hide();
          this.toasterService.success(response.messages);
        } else {
          this.spinner.hide();
          this.toasterService.error(response.messages);
        }
      });
    }
  }

  toggleCheckbox() {
    const checkboxControl = this.form.get('eveningCheckbox');
    this.orderByTimingControl = this.form.get('eveningOrderByTiming');
    this.dailyDeliveryTimeControl = this.form.get('eveningDailyDeliveryTime');
    if (checkboxControl?.value) {
      this.orderByTimingControl?.disable();
      this.dailyDeliveryTimeControl?.disable();
    } else {
      this.orderByTimingControl?.enable();
      this.dailyDeliveryTimeControl?.enable();
    }
  }

  toggleCheckbox1() {
    const checkboxControl = this.form.get('morningCheckbox');
    this.orderByTimingControl1 = this.form.get('morningOrderByTiming');
    this.dailyDeliveryTimeControl1 = this.form.get('morningDailyDeliveryTime');
    if (checkboxControl?.value) {
      this.orderByTimingControl1?.disable();
      this.dailyDeliveryTimeControl1?.disable();
    } else {
      this.orderByTimingControl1?.enable();
      this.dailyDeliveryTimeControl1?.enable();
    }
  }
  cancel() {
    this.router.navigateByUrl('/vendor/setting/appinfo')
      .then(() => {
        window.location.reload();
      });
  }

}
