import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vendor-add-notification',
  templateUrl: './vendor-add-notification.component.html',
  styleUrls: ['./vendor-add-notification.component.css']
})
export class VendorAddNotificationComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private toasterService: ToastrService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.notificationForm();
  }

    // add notification form
    notificationForm() {
      this.form = this.formBuilder.group({
        title: ['', [Validators.required,]],
        description: ['', [Validators.required]],
        sendToRole: ['Customer']
      });
    }

    postNotification() {
      this.submitted = true;
      if (this.form.invalid) {
        this.toasterService.error("Form Incomplete: Please fill in all the required fields correctly");
        return;
      }
     this.spinner.show();
      this.contentService.postBroadNotification(this.form.value).subscribe(response => {
        if (response.isSuccess) {
          this.toasterService.success(response.messages);
          this._location.back();
          this.spinner.hide();
        } else {
          this.toasterService.error(response.messages);
          this.spinner.hide();
        }
      });
    }
  
    backClicked() {
      this._location.back();
    }
    
    cancel() {
      this.router.navigateByUrl('/vendor-notification-list')
        .then(() => {
          window.location.reload();
        });
    }

}

