import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {Location} from '@angular/common';

@Component({
  selector: 'app-generate-image-link',
  templateUrl: './generate-image-link.component.html',
  styleUrls: ['./generate-image-link.component.css']
})
export class GenerateImageLinkComponent implements OnInit {

  // image 

  urls: any = [];
  url:any = [];
  imageFile!: { link: any, file: any, name: any, type: any };
  linkList: any;

  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _location: Location) { }

  ngOnInit(): void {
    this.getImageLinkList();
  }


  // multiple image upload

   // Image upload

   onselect(event: any) {
    
    const files = event.target.files;
    const files1 = event.target.files;
    const maxImages = 5;

    if (this.url.push(files1) > maxImages) {
      // Show an error message or perform any necessary validation
     this.toaster.error('You can generate links for up to five images at a time.')
    return
    } 

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const imageDataUrl = reader.result as string;
          this.urls.push(imageDataUrl);    
        };
      }
  }
  
  removeImage(index: any) {
    this.urls.splice(index, 1);
  }

  fileChangeEvent() {
  
    const formData = new FormData();
    for (let i = 0; i < this.urls.length; i++) {
      const imageDataUrl = this.urls[i];
      const blob = this.dataURItoBlob(imageDataUrl);
      formData.append('ProductImage', blob, `image_${i}.png`);
    }
    this.spinner.show();
    
    this.content.uploadLinkImage(formData).subscribe(response => {
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        // this._location.back();
      } else {
        this.toaster.error("Form Incomplete: Please fill in all the required fields correctly");
      }
      // window.location.reload();
      this.getImageLinkList();
      this.spinner.hide();
    });
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


  // Get Image Link List

  getImageLinkList(){
    this.content.imageLinkList().subscribe(response => {
      if(response.isSuccess) {
   this.linkList = response.data;
  //  this.toaster.success(response.messages);
      } else {
        this.toaster.error(response.messages);
      }
    });
  }
  
  // / To copy any Text /
  copyItem(item: string): void {
    navigator.clipboard.writeText(item)
      .then(() => {
 
        // Add any further actions or notifications here
        this.toaster.success('copied');
      })
      .catch((error) => {
    
        // Handle error or show appropriate error message
      });
  }

}
