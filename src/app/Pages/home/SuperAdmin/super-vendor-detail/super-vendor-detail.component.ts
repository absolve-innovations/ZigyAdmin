import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { ContentService } from 'src/app/Shared/service/content.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SafeUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { concatMap } from 'rxjs/operators'
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-super-vendor-detail',
  templateUrl: './super-vendor-detail.component.html',
  styleUrls: ['./super-vendor-detail.component.css']
})
export class SuperVendorDetailComponent implements OnInit {
  @ViewChild('htmlElement') htmlElementRef!: ElementRef;
  @ViewChild('htmlContainer') htmlContainer!: ElementRef;
  cardDivRef!: ElementRef;
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
  divContent: any;
  shareUrl!: string;
  dataUrl!: string;
  imageUrl: any;
  imageFile!: any;
  i: any;
  id!: void;
 // image url to file

 imageUrlToBlob(imageUrl: string, callback: (file: File | null) => void) {
  
  fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
      
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
      this.i = file
      const encodedImageSrc = this.i;
      const whatsappUrl = `https://wa.me/?text=${encodedImageSrc}`;
      window.open(whatsappUrl);

      callback(file);
    })
    .catch(error => {
      console.error('Error converting image URL to file:', error);
      callback(null);
    });
}
  constructor(private content: ContentService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private http: HttpClient
  ) { 
    
  }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.vendorId = this.route.snapshot.paramMap.get('id');
    this.id =    localStorage.setItem('vendorId',  this.vendorId );
    this.shopId = this.route.snapshot.paramMap.get('id2');
    this.getvendorDetail();
    this.stringQrCode = this.shopId;

  }

  backClicked() {
    this._location.back();
  }

  /** Vendor Detail **/

  getvendorDetail() {

    this.spinner.show();
    this.content.getVendorDetail(this.vendorId).subscribe(response => {
      if (response.isSuccess) {
        this.vendorDetail = response.data;
        
        this.shopDetail = this.vendorDetail.shopResponses[0]?.shopImage;
        // this.bankDetail = this.vendorDetail.bankResponses
        // this.upiDetail = this.vendorDetail.upiResponses
        this.member = this.vendorDetail?.membershipResponses;
      }
      this.spinner.hide();
    })
  }


  // Pass Vendor id
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


// download design 
 
  //   
  //   from(this.array).pipe(
  //     concatMap((arrayElem:any) => {
  //       this.docElem = document.getElementById(arrayElem.toString());
  //       return from(html2canvas(this.docElem).then(function (canvas) {
  //         let generatedImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  //         let a = document.createElement('a');
  //         a.href = generatedImage;
  //         a.download = `${arrayElem}.png`;
  //         a.click();
  //         return `${arrayElem}.png`;
  //       }));
  //     })
  //   ).subscribe((images) => {

  //  //
  downloadDesign() {
    
    const htmlElement = this.htmlElementRef.nativeElement;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set the canvas dimensions to match the HTML element size
    canvas.width = htmlElement.offsetWidth;
    canvas.height = htmlElement.offsetHeight;

    // Convert the HTML element to an image
    html2canvas(htmlElement).then((canvas: HTMLCanvasElement) => {
      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL('image/png');

      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'element.png';
      link.click();
    });
  }




  shareViaWhatsApp() {
    
    const element = this.htmlContainer.nativeElement;

    html2canvas(element).then(canvas => {
      const image = canvas.toDataURL('image/png');

// convert base 64 to image url
const base64Url = image; // Replace with your actual base64 URL
const imageUrl = this.base64ToImageUrl(base64Url);


// image url to file 

const imageUrl1 = imageUrl; // Replace with your image URL

    this.imageUrlToBlob(imageUrl1, (file: File | null) => {
      this.imageFile = file
      if (file) {
        // File conversion succeeded, use the file object
     
      } else {
        // File conversion failed

      }
    });
  
      // Prepare the WhatsApp message with the image attached
      // const message = 'Check out this design!';
      // const encodedImageSrc = encodeURIComponent(this.imageFile);
      //   const whatsappUrl = `https://wa.me/?text=${encodedImageSrc}`;

      // Open the WhatsApp application with the image attached
      // window.open(whatsappUrl);
    });
  }


  // convert image base64 to image url
  base64ToImageUrl(base64Url: string): string {
    const img = new Image();
    img.src = base64Url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      const imageUrl = canvas.toDataURL('image/png');

      // Use the image URL as needed
    };
    return base64Url;
  }


 

}
