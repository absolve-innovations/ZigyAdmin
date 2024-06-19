import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Location } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';


@Component({
  selector: 'app-inventory-bulk',
  templateUrl: './inventory-bulk.component.html',
  styleUrls: ['./inventory-bulk.component.css']
})
export class InventoryBulkComponent implements OnInit {
  categoryList: any;
  subCategoryList: any;
  form: any;
  SubSubcategoryList: any;
  mainCategoryId: any;
  subCategoryId: any;
  subSubCategoryId: any;
  downloadExcel: any;
  imageFile!: { link: any; file: any; name: any; type: any; };
  shopIds:any;
  vendorDetail: any;
  shopDetail: any;
  vendorId:any;
  constructor( private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _location: Location,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {  
    this.vendorId = localStorage.getItem('vendorId');
    this.vendorId = this.route.snapshot.queryParams['id2'];
    // this.shopIds = localStorage.getItem('shopId');
    this.getcategoryList();
    this.form = this.formBuilder.group({
      mainProductCategoryId: [''],
      subProductCategoryId: [''],
      subsubProductCategoryId: [''],
      document:['']
    });
  }

  
  get f() {
    return this.form['controls'];
  }

  get s() {
    return this.form['controls'];
  }

  get ssb() {
    return this.form['controls'];
  }

  backClicked() {
    this._location.back();
  }

  cancel(){
    this.router.navigateByUrl('/product-list-inventory')
    .then(() => {
      window.location.reload();
    });
  }

  getFilterMainCategoryList(data: any) {
    this.mainCategoryId = data
  }

  getFilterSubCategoryList(data: any) {    
    this.subCategoryId = data
  }

  getFilterSubSubCategoryList(data: any) {    
    this.subSubCategoryId = data
  }


  getcategoryList() {
    this.content.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.categoryList = response.data;
      } else {
        this.toaster.error(response.messages);
      }
    });
  }

   getSubcategoryList(data: any) {
    if (data === '') {
      this.subCategoryList = [];
      this.SubSubcategoryList = []
      // window.location.reload();
    }
    this.content.SubCategorySuper(data).subscribe(response => {
      if (response.isSuccess) {
        this.subCategoryList = response.data;
        this.SubSubcategoryList = []
        // this.spinner.hide();
      }
      else {
        this.subCategoryList = [];
        this.toaster.error(response.messages);
      }
    });
  }
    getSubSubcategoryList(data: any) {
      // this.spinner.show();
      this.content.SubSubCategory(data).subscribe(response => {
        if (response.isSuccess) {
          this.SubSubcategoryList = response.data;
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
          this.SubSubcategoryList = []
          this.toaster.error(response.messages);
        }
      });
    }
  getExcelSteetByMainCategory() {    
    let payload = {
      MainProductCategoryId: this.mainCategoryId,
      SubProductCategoryId: this.subCategoryId,
      SubSubProductCategoryId: this.subSubCategoryId,
    }
    this.content.getExcelByMainCategoryInventory(payload).subscribe(response => {
      if (response.messages) {
        this.downloadExcel = response.data.excelLink;
      } else {
        // this.spinner.hide();
      }
    });
  }
  getExcelSteetByMainOrSubCategory() {
    //  this.vendorId = localStorage.getItem('vendorId')
    let payload = {
      MainProductCategoryId: this.mainCategoryId,
      SubProductCategoryId: this.subCategoryId,
      SubSubProductCategoryId: this.subSubCategoryId,
    }
    this.content.getExcelByMainOrSubCategoryInventory(payload).subscribe(response => {
      if (response.messages) {
        this.downloadExcel = response.data.excelLink;
      } else {
        // this.spinner.hide();
      }
    });
  }


  getExcelSteetByMainOrSubOrSubSubCategory() {
    //  this.vendorId = localStorage.getItem('vendorId')
    let payload = {
      MainProductCategoryId: this.mainCategoryId,
      SubProductCategoryId: this.subCategoryId,
      SubSubProductCategoryId: this.subSubCategoryId,
    }
    this.content.getExcelByMainOrSubOrSubSubCategoryInventory(payload).subscribe(response => {
      if (response.messages) {
        this.downloadExcel = response.data.excelLink;
        // this.spinner.hide();
      } else {
        // this.spinner.hide();
      }
    });
  }

  fetchAllData(): void {
    if (this.subSubCategoryId == this.form.value.subsubProductCategoryId) {
      let payload3 = {
        MainProductCategoryId: this.mainCategoryId,
        SubProductCategoryId: this.subCategoryId,
        SubSubProductCategoryId: this.subSubCategoryId,
      }
      const getExcelSteetByMainOrSubOrSubSubCategory$: Observable<any> = this.content.getExcelByMainOrSubOrSubSubCategoryInventory(payload3); // Replace with your GET function 3
      forkJoin([getExcelSteetByMainOrSubOrSubSubCategory$]).subscribe(
        ([data3]) => {
          // Handle the results of the GET requests here
        // Result of GET function 3

            // Access the response data
    const statusCode = data3.statusCode;
    const isSuccess = data3.isSuccess;
    const messages = data3.messages;
    const excelLink = data3.data.excelLink;
    const link = document.createElement('a')
    link.href = excelLink;
    link.download = "excel";
    link.click()
        },
        error => {
          // Handle error if any of the GET requests fail
          console.error(error);
        }
      );
    } else if (this.subCategoryId == this.form.value.subProductCategoryId) {
      let payload2 = {
        MainProductCategoryId: this.mainCategoryId,
        SubProductCategoryId: this.subCategoryId,
      }
      const getExcelSteetByMainOrSubCategory$: Observable<any> = this.content.getExcelByMainOrSubCategoryInventory(payload2); // Replace with your GET function 2
      forkJoin([getExcelSteetByMainOrSubCategory$]).subscribe(
        ([data2]) => {
          // Handle the results of the GET requests here
          // Result of GET function 1
          const statusCode = data2.statusCode;
          const isSuccess = data2.isSuccess;
          const messages = data2.messages;
          const excelLink = data2.data.excelLink;
          const link = document.createElement('a')
          link.href = excelLink;
          link.download = "excel";
          link.click()
        },
        error => {
          // Handle error if any of the GET requests fail
          console.error(error);
        }
      );
    }
    else if (this.mainCategoryId == this.form.value.mainProductCategoryId) {
      let payload1 = {
              MainProductCategoryId: this.mainCategoryId,
      }
      const getExcelSteetByMainCategory$: Observable<any> = this.content.getExcelByMainCategoryInventory(payload1); // Replace with your GET function 1
      forkJoin([getExcelSteetByMainCategory$]).subscribe(
        ([data1]) => {
          // Handle the results of the GET requests here
          // Result of GET function 1
            // Access the response data
    const statusCode = data1.statusCode;
    const isSuccess = data1.isSuccess;
    const messages = data1.messages;
    const excelLink = data1.data.excelLink;
    const link = document.createElement('a')
    link.href = excelLink;
    link.download = "excel";
    link.click();
        },
        error => {
          // Handle error if any of the GET requests fail
          console.error(error);
        }
      );
    }
  }


  excelChangeEventUpload(event: any) {
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
      // this.fileChangeEvents();
      // this.name = this.imageFile.link
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  fileChangeEvents() {
    let formData = new FormData();  
    formData.append("excelFile", this.imageFile?.file);
    this.content.uploadExcel(formData).subscribe(response => {
      if(response.isSuccess) {
        this.toaster.success(response.messages);
      } else {
        this.toaster.error(response.messages)
      }
    });
  }

}
