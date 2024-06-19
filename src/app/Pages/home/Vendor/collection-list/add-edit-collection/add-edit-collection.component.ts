import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/Shared/service/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-edit-collection',
  templateUrl: './add-edit-collection.component.html',
  styleUrls: ['./add-edit-collection.component.css']
})
export class AddEditCollectionComponent implements OnInit {
  form!: FormGroup;
  collection = [];
  inputTxt!: '';
  collectionNameList: any;
  maincategoryList: any;
  SubSubcategoryList: any;
  SubcategoryList: any;
  productList: any;
  collectionProductlist: any;
  collectionlist!: '';
  add: any;
  //   nestedArray = [];
  selectedItems: any[] = [];
  nestedArray: any[] = [];
  //   dropdownList = [];
  //   // selectedItems = [];
  dropdownSettings = {};
  bindproductList!: any[];
  selectedIndex: number = -1;

  // image 

  urls: any = [];
  imageFile!: { link: any, file: any, name: any, type: any };
  imageFiles!: File[];
  unActive: boolean = false;
  collectionId!: any;
  collectiondetail: any;
  collectionImage: any;
  collectionsId: any;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private toaster: ToastrService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.collectionId = this.route.snapshot.queryParams;
    this.collectionForm();
    this.getCollectionNameList();
    this.getcategoryList();
    this.getProductList();
    this.getCollectionDetail();

    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 5,
      idField: 'item_id',
      textField: 'item_text',
    };
  }

  onItemSelect(item: any) { }

  onSelectAll(items: any) { }

  /** Collection Form **/
  collectionForm() {
    this.form = this.formBuilder.group({
      shopId: ['23'],
      collectionInfoId: [''],
      collectionName: [''],
      skuid: [''],
      mrp: [],
      discountType: [],
      discount: [],
      mainProductCategoryId: [null],
      subProductCategoryId: [null],
      subSubProductCategoryId: [null],
      productIds: [],
      inStock: [],
      collectionDescription: [],
      // collectionProducts: this.formBuilder.array([
      //   this.collectionProduct(),

      // ]),
    });
  }

  // List1(): FormArray {
  //   return (<FormArray>this.form.get("collectionProducts"));
  // }

  collectionProduct() {
    return this.formBuilder.group({
      productId: [],
      productCount: [],
    });
  }

  get f() {
    return this.form['controls'];
  }

  get p() {
    return this.form['controls'];
  }

  getCollectionNameList() {
    this.content.getCollectionList().subscribe(response => {
      if (response.isSuccess) {
        this.collectionNameList = response.data;
        this.spinner.hide();
      }
    });
  }
  /*** Main Category List ***/
  getcategoryList() {
    this.content.getcategory().subscribe(response => {
      if (response.isSuccess) {
        this.maincategoryList = response.data;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  /*** Sub  Category List ***/
  getSubcategoryList(id: any) {
    this.spinner.show();
    this.content.SubCategorySuper(id).subscribe(response => {
      if (response.isSuccess) {
        this.SubcategoryList = response.data;
        this.SubSubcategoryList = []
        this.spinner.hide();
      } else {
        this.SubcategoryList = [];
        this.toaster.error(response.messages);
      }
    });
  }

  /*** Sub Sub Category List ***/
  getSubSubcategoryList(id: any) {
    6
    this.spinner.show();
    this.content.SubSubCategory(id).subscribe(response => {
      if (response.isSuccess) {
        this.SubSubcategoryList = response.data;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.toaster.error(response.messages);
      }
    });
  }

  getProductList() {
    this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      vendorId: localStorage.getItem('vendorId')
    }
    this.content.getvendorProductlist(payload).subscribe(response => {
      if (response.isSuccess) {
        // this.clearFormArray(this.productList);
        this.productList = response.data.dataList;
        this.bindproductList = [];
        this.productList.forEach((element: { productId: any; productName: any; }) => {
          this.bindproductList.push(
            { item_id: element.productId, item_text: element.productName }
          )
        });
        // this.shopId = response.data.dataList.shopId
        // this.getFilterMainCategoryList(this.productList);
        // this.total = response.data;

        this.spinner.hide();
      }
    });
  }
  getFilterMainCategoryList(data: any) {
    this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      mainProductCategoryId: data
    }
    this.content.getFilterMaincategory(payload).subscribe(response => {
      if (response.isSuccess) {
        this.productList = response.data.dataList;
        // this.total = response.data;
        //  this.productList = this.productLists
        this.spinner.hide();
        this.bindproductList = [];
        this.productList.forEach((element: { productId: any; productName: any; }) => {
          this.bindproductList.push(
            { item_id: element.productId, item_text: element.productName }
          )
        });
      } else {
        this.spinner.hide();
        this.productList = [];
        // this.toaster.error(response.messages);
      }
    });
  }
  getFilterSubCategoryList(data: any) {
    // this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      subProductCategoryId: data
    }
    this.content.getFilterSubCategory(payload).subscribe(response => {
      if (response.isSuccess) {
        this.productList = response.data.dataList;
        this.spinner.hide();
        this.bindproductList = [];
        this.productList.forEach((element: { productId: any; productName: any; }) => {
          this.bindproductList.push(
            { item_id: element.productId, item_text: element.productName }
          )
        });
      } else {
        this.spinner.hide();
        // this.data = response.isSuccess == 'false'

        // this.toaster.error(response.messages);
      }
    });
  }
  getFilterSubSubCategoryList(data: any) {
    // this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
      subSubProductCategoryId: data
    }
    this.content.getFilterSubSubCategory(payload).subscribe(response => {
      if (response.isSuccess) {
        this.productList = response.data.dataList;
        this.spinner.hide();
        this.bindproductList = [];
        this.productList.forEach((element: { productId: any; productName: any; }) => {
          this.bindproductList.push(
            { item_id: element.productId, item_text: element.productName }
          )
        });
      } else {
        this.spinner.hide();
        // this.data = response.isSuccess == 'false'

        // this.toaster.error(response.messages);
      }
    });
  }

  addToNestedArray() {
    this.nestedArray.push(...this.selectedItems);
    this.selectedItems = [];
    // this.collectionProducts = this.nestedArray
  }
  removeList() {
    this.nestedArray.splice(-1, 1);
  }
  // onAdd() {
  //   
  //   if (this.selectedIndex >= 0) {
  //     this.nestedArray[this.selectedIndex].push(this.selectedItems[0]);
  //     this.selectedItems = [];
  //   }
  // } 


  // productDetail(){

  //   this.content.detailProduct(this.collectionProductlist).subscribe(response => {
  //     if (response.isSuccess){
  //       this.collectionlist = response.data.dataList
  //     }
  //   })

  // }


  getCollectionDetail() {
    // this.spinner.show();
    this.content.collectionDetail(this.collectionId.id).subscribe(response => {
      if (response.isSuccess) {
        this.spinner.hide();
        this.collectiondetail = response.data;
        this.collectionImage = response.data.collectionImage
        //  this.collectionId = response.data.collectionId
        this.form.patchValue({
          skuid: this.collectiondetail.skuid,
          collectionInfoId: this.collectiondetail.collectionInfoId,
          collectionName: this.collectiondetail.collectionName,
          mrp: this.collectiondetail.mrp,
          discountType: this.collectiondetail.discountType,
          discount: this.collectiondetail.discount,
          mainProductCategoryId: this.collectiondetail.mainProductCategoryId,
          subProductCategoryId: this.collectiondetail.subProductCategoryId,
          subSubProductCategoryId: this.collectiondetail.subSubProductCategoryId,
          inStock: this.collectiondetail.inStock,
          productIds: this.collectiondetail.productIds,
          collectionDescription: this.collectiondetail.collectionDescription

        })
        //  this.collectionProduct = this.collectiondetail.collectionProducts[0]

      } else {
      }
    });
  }
  submit() {
    let payload = {
      // vendorId: this.vendorId,
      // sellingPrice: this.form.value.sellingPrice,
      //  shopId: id,
      collectionInfoId: this.form.value.collectionInfoId,
      shopId: this.form.value.shopId,
      skuid: this.form.value.skuid,
      collectionName: this.form.value.collectionName,
      mrp: this.form.value.mrp,
      discountType: this.form.value.discountType,
      discount: this.form.value.discount,
      productIds: convertArrayIntoString(this.form.value.productIds),
      inStock: this.form.value.inStock,
      collectionDescription: this.form.value.collectionDescription,
      isFeatured: this.unActive
      // manufacturingDate: this.form.value.manufacturingDate,
      // expiryDate: this.form.value.expiryDate,   
      // collectionProducts: [{
      //   productId: this.nestedArray,
      //   productCount: this.form.value.collectionProducts.productCount,
      // }],
    }
    this.content.postCollection(payload).subscribe(response => {
      this.collectionsId = response.data.collectionId
      this.fileChangeEvent();
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        this.router.navigateByUrl('/collection-list')
      } else {
        this.toaster.error(response.messages)
      }
    });
    function convertArrayIntoString(arr: any[]) {
      let id: any[] = [];
      // arr = JSON.parse(arr);
      //  let  name = [];
      arr.forEach(element => {
        id.push(element.item_id);
        //  name.push(element. item_text);
        //  item_text: element.name
      });
      var rww = id.toString();
      return rww;
    }
  }
  checkInactiveStatus() {
    this.unActive = !this.unActive;
    if (this.unActive == true) {
    } else if (this.unActive == false) {
    }
  }
  // Image upload

  onselect(event: any) {
    const files = event.target.files;
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
  fileChangeEvent() {
    const formData = new FormData();
    for (let i = 0; i < this.urls.length; i++) {
      const imageDataUrl = this.urls[i];
      const blob = this.dataURItoBlob(imageDataUrl);
      formData.append('collectionImage', blob, `image_${i}.png`);
    }
    formData.append('collectionId', this.collectionsId);
    this.content.uploadCollectionImage(formData).subscribe(response => {
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

  removeImage(index: any) {
    this.urls.splice(index, 1);
  }
}
