import { Component, NgZone, OnInit, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { PaymentServiceService } from 'src/app/Shared/service/payment-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-membership-plan-list',
  templateUrl: './membership-plan-list.component.html',
  styleUrls: ['./membership-plan-list.component.css']
})
export class MembershipPlanListComponent implements OnInit {
  planList: any;
  membershipPlanId: any;
  membershipRecordId!: string;
  login = localStorage.getItem('role');
  vendorId = localStorage.getItem('id');
  plandetail: any;
  rootUrl: any;
  accountDetail: any;
  editImages: any
  imageFile!: { link: any; file: any; name: any; type: any; };
  paymentReceiptId: any;
  private isRefreshed: boolean = false;
  x!: any;
  merchantId!: void;
  transactionId!: any;
  data: any;
  planType: any;

  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private _location: Location,
    private elementRef: ElementRef,
    private paymentService: PaymentServiceService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params: any) => {
      this.data = params.planType
      if (params.planType) {
        this.plan();
      } else {
        this.getPlanListVendor();
      }
    });
  }
  //Submit Payment
  pay(data: any) {
    this.transactionId = localStorage.getItem('merchantId')
    let payload = {
      membershipPlanId: data.membershipPlanId,
      transactionId: parseInt(this.transactionId),
      createdBy: localStorage.getItem('id'),
      paymentMethod: 'paybyupi'
    }
    this.content.planBuy(payload).subscribe(response => {
      if (response.isSuccess) {
        // this.toaster.success(response.messages)
        this.membershipRecordId = response.data.membershipRecordId
        localStorage.setItem('membershipRecordId', this.membershipRecordId)
        // if (this.login == 'Distributor') {
        //   this.router.navigateByUrl('/distributor-vendor-list/add/' + this.membershipRecordId)
        //     .then(() => {
        //       window.location.reload();
        //     });
        // } else {
        //   this.router.navigateByUrl('/super-vendor-list/super-add-vendor/' + this.membershipRecordId)
        //     .then(() => {
        //       window.location.reload();
        //     });
        // }
      } else {
        this.toaster.error(response.messages)
      }
    });
  }
  // Final Payment 
  payment(amount: any) {
    let payload = {
      amount: amount.totalAmount
    }
    this.content.getPayment(payload).subscribe(response => {
      if (response.isSuccess) {
        this.merchantId = localStorage.setItem('merchantId', response.data.merchantTransactionId)
        this.merchantId = sessionStorage.setItem('merchantId', response.data.merchantTransactionId)
        this.pay(amount)
        // window.open(data);
        // window.location.href = response.data.url;
        window.open(response.data.url, '_blank', 'noopener noreferrer');
      } else {
        this.toaster.error(response.messages);
      }
    });
  }

  backClicked() {
    this._location.back();
  }
  plan() {

    if (this.login == 'SuperAdmin') {
      this.getPlanListSuper();
    } else if (this.login == 'Vendor') {

      this.getPlanListVendor();

    } else if (this.login == 'Admin') {
      this.getPlanListSuper();

    } else if (this.login == 'Distributor') {
      this.getPlanListSuper();
    }
  }
  getPlanListSuper() {
    // window.location.reload();
    this.ngZone.run(() => {
      this.spinner.show();
      this.planType = this.data;
      this.content.getPlansListAdmin(this.planType).subscribe(response => {
        if (response.isSuccess) {
          this.planList = response.data;
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      });
    });
  }
  getPlanListVendor() {
    // window.location.reload();
    this.spinner.show();
    this.ngZone.run(() => {
      this.content.getPlansListVendor(this.vendorId).subscribe((response: any) => {
        if (response.isSuccess) {
          this.planList = response.data;
          this.toaster.success(response.messages);
          this.spinner.hide();
        } else {
          this.toaster.error(response.messages);
          this.spinner.hide();
        }
      });
    });
  }
  // get payment data 
  detail(item: any) {
    if (item.planName == 'Free') {
      this.free();
    } else {
      // this.price = item.planPrice
      this.membershipPlanId = item.membershipPlanId
      // this.totalAmount = item.totalAmount
      this.paymentOptionally();
      this.showModal();
    }
  }


  showModal() {
    $('#myModalpayment').modal('show')
  }



  // Pay by cash

  // payCash() {
  //   if (this.login == 'SuperAdmin') {
  //     this.paybycashSuper();
  //   } else if (this.login == 'Vendor') {
  //     this.paybycashVendor();
  //   } else if (this.login == 'Admin') {
  //     this.paybycashAdmin();
  //   }
  // }

  // paybycashSuper() {
  //   
  //   let payload = {
  //     vendorId: null,
  //     membershipPlanId: this.membershipPlanId,
  //     paymentReceiptId: 0,
  //     paymentMethod: 'InCash',
  //     createdBy: null
  //   }
  //   this.content.bycashPayment(payload).subscribe(response => {
  //     if (response.isSuccess) {
  //       this.toaster.success(response.messages)

  //       this.router.navigateByUrl('/super-vendor-list/super-add-vendor/' + this.membershipRecordId)
  //         .then(() => {
  //           window.location.reload();
  //         });
  //     } else {
  //       this.toaster.error(response.messages)
  //     }
  //   });
  // }

  // free route
  free() {
    if (this.login == 'Distributor') {
      this.router.navigateByUrl('/distributor-vendor-list/add/' + 0)
        .then(() => {
          window.location.reload();
        });
    } else {
      this.router.navigateByUrl('/super-vendor-list/super-add-vendor/' + 0)
        .then(() => {
          window.location.reload();
        });
    }
  }
  // paybycashAdmin() {

  //   let payload = {
  //     vendorId: null,
  //     membershipPlanId: this.membershipPlanId,
  //     paymentReceiptId: 0,
  //     paymentMethod: 'InCash',
  //     createdBy: null
  //   }
  //   this.content.bycashPayment(payload).subscribe(response => {
  //     if (response.isSuccess) {
  //       this.toaster.success(response.messages)
  //       this.membershipRecordId = response.data.membershipRecordId

  //       this.router.navigateByUrl('/super-vendor-list/super-add-vendor/' + this.membershipRecordId)
  //         .then(() => {
  //           window.location.reload();
  //         });
  //     } else {
  //       this.toaster.error(response.messages)
  //     }
  //   });
  // }

  // Payment Options
  paymentOptionally() {
    this.spinner.show();
    this.content.paymentOptions(this.membershipPlanId).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        // this.toaster.success(response.messages)
        this.plandetail = response.data;
        this.accountDetail = response.data.accountDetail
      }
      //  else {
      //   this.toaster.error(response.messages)
      // }
    });
  }
  /* To copy any Text */
  copyItem(item: string): void {
    navigator.clipboard.writeText(item)
      .then(() => {
        // Add any further actions or notifications here
      })
      .catch((error) => {
        console.error('Failed to copy item:', error);
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
        this.fileChangeEvent();
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  fileChangeEvent() {
    let formData = new FormData();
    formData.append("paymentReceipt", this.imageFile?.file);
    this.content.uploadReceiptImage(formData).subscribe(response => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        this.paymentReceiptId = response.data.paymentReceiptId
      } else {
        this.toaster.error(response.error)
      }
    });
  }

  myFunction() {
    this.x = document.getElementById("myDIV");
    if (this.x.style.display == "none") {
      this.x.style.display = "block";
    } else {
      this.x.style.display = "none";
    }
  }

  // Phone Payment Service 
  initiatePayment(totalAmount: any) {
    this.paymentService.initiatePayment(totalAmount).subscribe(
      (response) => {
        // Handle the payment response, such as redirecting to PhonePe payment page
        window.location.href = response.paymentUrl;
      },
      (error) => {
        // Handle any errors during payment initiation
        console.error('Error initiating payment:', error);
      }
    );
  }
  /// check 

  click() {
    const url = 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';
    const payload = {
      request: "DQogICAgICAgIHsNCiAgICAgICAgICAgICJtZXJjaGFudElkIjogIlNWQlBPTkxJTkUiLA0KICAgICAgICAgICAgIm1lcmNoYW50VHJhbnNhY3Rpb25JZCI6ICIxMDgxMDk3IiwNCiAgICAgICAgICAgICJtZXJjaGFudFVzZXJJZCI6ICJjNGY3YTBhYi01OGVhLTQ0OGYtODRkYS0wYWVlYzZjMDEzMGYiLA0KICAgICAgICAgICAgImFtb3VudCI6IDEwMCwNCiAgICAgICAgICAgICJyZWRpcmVjdFVybCI6ICJodHRwczovL2QxeTBwZHI3a3VwZ3Z4LmNsb3VkZnJvbnQubmV0LyMvbWVtYmVyc2hpcC1zdWNjZXNzIiwNCiAgICAgICAgICAgICJyZWRpcmVjdE1vZGUiOiAiUkVESVJFQ1QiLA0KICAgICAgICAgICAgImNhbGxiYWNrVXJsIjogImh0dHBzOi8vOGZndmpmZjd4NC5leGVjdXRlLWFwaS5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vYXBpL1ZlbmRvci9DaGVja1BheW1lbnRTdGF0dXM/bWVyY2hhbnRUcmFuc2FjdGlvbklkPTEwODEwOTciLA0KICAgICAgICAgICAgIm1vYmlsZU51bWJlciI6ICI4MTQ2ODEyNzM2IiwNCiAgICAgICAgICAgICJwYXltZW50SW5zdHJ1bWVudCI6IHsNCiAgICAgICAgICAgICAgICAidHlwZSI6ICJQQVlfUEFHRSINCiAgICAgICAgICAgIH0NCiAgICAgICAgfQ=="
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-VERIFY': '5ed9a68c4cf25dd5116607cfca902b83307ce15101e8c0ca60db1e4ac6a78f65###1',
      'accept': 'application/json'
    });
    this.http.post(url, payload, { headers: headers })
      .subscribe(response => {
      });
  }
}
