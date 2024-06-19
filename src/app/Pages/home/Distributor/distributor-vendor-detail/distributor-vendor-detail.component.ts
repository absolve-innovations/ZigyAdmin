import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/Shared/service/content.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SafeUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-distributor-vendor-detail',
  templateUrl: './distributor-vendor-detail.component.html',
  styleUrls: ['./distributor-vendor-detail.component.css']
})
export class DistributorVendorDetailComponent implements OnInit {
  vendorId!: any;
  vendorDetail: any;
  shopDetail: any;
  bankDetail: any;
  rootUrl!: any;
  stringQrCode!: string;
  shopId!: any;
  urlSafe: any;
  public qrCodeDownloadLink: SafeUrl = "";
  upiDetail: any;
  member: any;
  constructor(private content: ContentService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.vendorId = this.route.snapshot.paramMap.get('id');
    this.shopId = this.route.snapshot.paramMap.get('id2');
    this.getvendorDetail();
    this.stringQrCode = this.shopId;
  }

  backClicked() {
    this._location.back();
  }

  getvendorDetail() {
    this.spinner.show();
    this.content.getVendorDetail(this.vendorId).subscribe(response => {
      if (response.isSuccess) {
        this.vendorDetail = response.data     
        this.shopDetail = this.vendorDetail.shopResponses[0]?.shopImage
        this.bankDetail = this.vendorDetail.bankResponses
        this.upiDetail = this.vendorDetail.upiResponses
        this.member = this.vendorDetail?.membershipResponses
      }
      this.spinner.hide();
    });
  }

  passId(data: any) {    
    this.router.navigate(['/super-vendor-list/super-vendor-detail/product-list'],
      {
        queryParams: {
          id: data.vendorId,
          id2: data.shopResponses[0]?.shopId
        }
      });
  }
  
  navigateToDetail(item:any){
    item = JSON.stringify(item);
    this.router.navigate(['/super-vendor-list/super-vendor-detail/upi-detail'], { queryParams: { detail: item } });
  }

  // // Download Qr Code Image 
  // saveAsImage(parent: any) {
  //   // fetches base 64 date from image
  //   const parentElement = parent.el.nativeElement.querySelector("img").src;

  //   // converts base 64 encoded image to blobData
  //   let blobData = this.convertBase64ToBlob(parentElement);

  //   // saves as image
  //   if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
  //     window.navigator.msSaveOrOpenBlob(blobData, 'Qrcode');
  //   } else { // chrome
  //     const blob = new Blob([blobData], { type: "image/png" });
  //     const url = window.URL.createObjectURL(blob);
  //     // window.open(url);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = 'Qrcode';
  //     link.click();
  //   }

  // }

  // private convertBase64ToBlob(Base64Image: any) {
  //   // SPLIT INTO TWO PARTS
  //   const parts = Base64Image.split(';base64,');
  //   // HOLD THE CONTENT TYPE
  //   const imageType = parts[0].split(':')[1];
  //   // DECODE BASE64 STRING
  //   const decodedData = window.atob(parts[1]);
  //   // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
  //   const uInt8Array = new Uint8Array(decodedData.length);
  //   // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
  //   for (let i = 0; i < decodedData.length; ++i) {
  //     uInt8Array[i] = decodedData.charCodeAt(i);
  //   }
  //   // RETURN BLOB IMAGE AFTER CONVERSION
  //   return new Blob([uInt8Array], { type: imageType });
  // }

}

