import { Component, NgZone, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-delivery-man',
  templateUrl: './add-edit-delivery-man.component.html',
  styleUrls: ['./add-edit-delivery-man.component.css']
})
export class AddEditDeliveryManComponent implements OnInit {
  deliveryManDetail: any;
  form!: FormGroup;
  shopIds: any;
  submitted: boolean = false;
  id: any;

  constructor(
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.shopIds = localStorage.getItem('shopIdForDairy');
    this.deliveryManForm();
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.getDeliveryManDetail(params.id);
      }
    });
  }

  /** Delivery Man Form **/
  deliveryManForm() {
    this.form = this.formBuilder.group({
      deliveryManName: ['', [Validators.required]],
      areaCodeId: ['', [Validators.required]],
      deliveryManPhoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      deliveryManWhatsappNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  get f() {
    return this.form['controls'];
  }

  backClicked() {
    this._location.back();
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.toasterService.error("Form Incomplete: Please fill in all the required fields correctly");
      return;
    }
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.deliveryManDetail) {
      let payload = {
        deliveryManId: this.id,
        shopId: this.shopIds,
        deliveryManName: this.form.value.deliveryManName,
        areaCodeId: this.form.value.areaCodeId,
        deliveryManPhoneNumber: this.form.value.deliveryManPhoneNumber,
        deliveryManWhatsappNumber: this.form.value.deliveryManWhatsappNumber,
      }
      this.spinner.show();
      this.content.updateDeliveryMan(payload).subscribe(response => {
        this.afterResponse(response);
        this.spinner.hide();
      });
    } else {
      let payload = {
        shopId: this.shopIds,
        deliveryManName: this.form.value.deliveryManName,
        areaCodeId: this.form.value.areaCodeId,
        deliveryManPhoneNumber: this.form.value.deliveryManPhoneNumber,
        deliveryManWhatsappNumber: this.form.value.deliveryManWhatsappNumber,
      }
      this.spinner.show();
      this.content.addDeliveryMan(payload).subscribe(response => {
        this.afterResponse(response);
        this.spinner.hide();
      });
    }
  }

  // for status message
  afterResponse(response: any) {
    if (response && response.statusCode == 200) {
      if (response.isSuccess) {
        this.form.reset();
        this.toasterService.success(response.messages);
        this.router.navigate(['/vendor/setting/delivery-man-list']);
      }
      else {
        this.toasterService.error(response.messages);
      }
    }
  }

  // Delivery Man Detail Patch

  getDeliveryManDetail(id: string) {
    this.spinner.show();
    this.content.getDeliveryManDetails(id).subscribe(response => {
      if (response.isSuccess) {
        this.deliveryManDetail = response.data;
        this.id = this.deliveryManDetail.deliveryManId;
        this.form.patchValue({
          deliveryManName: this.deliveryManDetail.deliveryManName,
          areaCodeId: this.deliveryManDetail.areaCodeId,
          deliveryManPhoneNumber: this.deliveryManDetail.deliveryManPhoneNumber,
          deliveryManWhatsappNumber: this.deliveryManDetail.deliveryManWhatsappNumber,
        });
      }
      this.spinner.hide();
    });
  }

  cancel() {
    this.router.navigateByUrl('/vendor/setting/delivery-man-list')
      .then(() => {
        window.location.reload();
      });
  }

}

