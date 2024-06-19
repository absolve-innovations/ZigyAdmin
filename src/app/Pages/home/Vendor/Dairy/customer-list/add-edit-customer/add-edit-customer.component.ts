import { Component, NgZone, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit {
  form!               : FormGroup;
  datePickerConfig    : Partial<BsDatepickerConfig>;
  submitted           : any
  isActive!           : boolean;
  statesLists         : any;
  shopIds             : any;
  ofLineCustomerdetail: any;
  id                  : any;
  patchDate           : any;
  selectedDate!       : Date;
  constructor(

    private spinner       : NgxSpinnerService,
    private content       : ContentService,
    private router        : Router,
    private ngZone        : NgZone,
    private route         : ActivatedRoute,
    private formBuilder   : FormBuilder,
    private toasterService: ToastrService,
    private _location     : Location,
    private datePipe      : DatePipe
  ) {
    this.datePickerConfig = Object.assign(
      {
        dateInputFormat: 'DD/MM/YYYY', // Set the expected input format
      },
      {
        minDate: new Date(), // sets the minimum date to the current date

      }

    );
  }

  ngOnInit(): void {
    this.shopIds = localStorage.getItem('shopId');

    this.deliveryManForm()
    // this.getStateList()
    this.route.queryParams.subscribe((params: any) => {

      if (params.id) {
        this.getOflineCustomerDetail(params.id);
      }
    });

  }

  /** Delivery Man Form **/
  deliveryManForm() {
    this.form = this.formBuilder.group({
      customerFirstName    : ['', [Validators.required]],
      customerLastName     : ['', [Validators.required]],
      customerPhone        : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      // customerProfilePic   : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      customerAddress      : ['', [Validators.required]],
      subscriptionType     : ['', [Validators.required]],
      subscriptionStartDate: ['', [Validators.required]],
      customerStatus       : [this.isActive],
      walletAmount         : ['', [Validators.required]],
      customerGender       : ['', [Validators.required]],
    });
  }

  get f() {
    return this.form['controls'];
  }

  backClicked() {
    this._location.back();
  }

  checkStatus(event: any) {

    if (event.currentTarget?.checked) {
      this.isActive = true;

    } else {
      this.isActive = false;

    }
  }


  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.toasterService.error("Form Incomplete: Please fill in all the required fields correctly");
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
   
    if (this.ofLineCustomerdetail) {
      const updatedSubscriptionStartDate = new Date(this.form.value.subscriptionStartDate);
      const formattedDate = this.datePipe.transform(updatedSubscriptionStartDate, 'yyyy-MM-dd');
      let payload = {
        vendorCustomerId     : this.id,
        shopId               : this.shopIds,
        customerFirstName    : this.form.value.customerFirstName,
        customerLastName     : this.form.value.customerLastName,
        customerPhone        : this.form.value.customerPhone,
        customerAddress      : this.form.value.customerAddress,
        subscriptionType     : this.form.value.subscriptionType,
        subscriptionStartDate: formattedDate,
        walletAmount         : this.form.value.walletAmount,
        customerGender       : this.form.value.customerGender,
        customerStatus       : checkStatus,
      }
      this.spinner.show();
      this.content.updateOflineCustomer(payload).subscribe(response => {
        this.afterResponse(response);
        this.spinner.hide();
      });

    } else {
      
      let checkStatus: any;
      if (this.isActive == true) {
        checkStatus     = true;
      } else {
        if (this.isActive == false) {
          checkStatus     = false;
        } else {
          checkStatus     = false;
        }
      }
      let payload = {
        shopId: this.shopIds,
        customerFirstName    : this.form.value.customerFirstName,
        customerLastName     : this.form.value.customerLastName,
        customerPhone        : this.form.value.customerPhone,
        customerAddress      : this.form.value.customerAddress,
        subscriptionType     : this.form.value.subscriptionType,
        subscriptionStartDate: this.form.value.subscriptionStartDate,
        walletAmount         : this.form.value.walletAmount,
        customerGender       : this.form.value.customerGender,
        customerStatus       : checkStatus,
      }
      this.spinner.show();
      this.content.customerAdd(payload).subscribe(response => {
        this.afterResponse(response);
        this.spinner.hide();

      });

    }
  }


  afterResponse(response: any) {
    if (response && response.statusCode == 200) {
      if (response.isSuccess) {
        this.form.reset();
        this.toasterService.success(response.messages);
        this.router.navigate(['/vendor/setting/offline-costumer-list']);
      }
      else {
        this.toasterService.error(response.messages);
      }
    }
  }


  getOflineCustomerDetail(id: string) {
    this.content.getofflineCustomerDetail(id).subscribe(response => {
      if (response.isSuccess) {
        this.ofLineCustomerdetail = response.data
        this.id                   = this.ofLineCustomerdetail.vendorCustomerId
        this.patchDate            = this.ofLineCustomerdetail.subscriptionStartDate
        this.form.patchValue({
          customerFirstName    : this.ofLineCustomerdetail.customerFirstName,
          customerLastName     : this.ofLineCustomerdetail.customerLastName,
          customerPhone        : this.ofLineCustomerdetail.customerPhone,
          customerGender       : this.ofLineCustomerdetail.customerGender,
          customerAddress      : this.ofLineCustomerdetail.customerAddress,
          subscriptionType     : this.ofLineCustomerdetail.subscriptionType,
          subscriptionStartDate: this.ofLineCustomerdetail.subscriptionStartDate,
          lastWalletAmount     : this.ofLineCustomerdetail.lastWalletAmount,
          walletAmount         : this.ofLineCustomerdetail.walletAmount,
          customerStatus       : this.ofLineCustomerdetail.customerStatus,
        });
      }
      this.spinner.hide();
    });

  }


  cancel() {
    this.router.navigateByUrl('/vendor/setting/offline-costumer-list')
      .then(() => {
        window.location.reload();
      });
  }


}