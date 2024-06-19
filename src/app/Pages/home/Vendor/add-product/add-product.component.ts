import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/Shared/service/content.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe, Location } from '@angular/common';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  vendorId = localStorage.getItem('vendorId');
  containerList: any;
  brandList: any;
  qunatityList: any;
  form!: FormGroup;
  datePickerConfig: Partial<BsDatepickerConfig>;
  today: Date = new Date();
  submitted = false;
  // groupId = 0;
  maincategoryList: any;
  SubcategoryList: any;
  SubSubcategoryList!: any;
  maxDiscountValue: any;
  discountType: string = '1';
  // image 
  urls: any = [];
  imageFile!: { link: any, file: any, name: any, type: any };
  imageFiles!: File[];
  productId: any;
  shopId: any;
  vendorDetail: any;
  shopDetail: any;
  subId: any;
  mainId: any;
  role = localStorage.getItem('role');
  // calculate percentage
  mrp: any;
  discount : any = 0 ;
  sellingPrice: any ;
  discountValue!: number;
  errorMessage:any;
  constructor(private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private _location: Location) {
    this.datePickerConfig = Object.assign(
      {},
      {
        minDate: new Date(), // sets the minimum date to the current date
      }
    );
  }

  ngOnInit(): void {
    this.getvendorDetail();
    this.getContainerListType();
    this.getbrandList();
    this.getQuantity();
    this.getcategoryList();
    this.ProductForm();
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.vendorId = params.id
        this.shopId = params.id2
      }
    });
  }
 
  getvendorDetail() {
    this.spinner.show();
    this.content.getVendorDetail(this.vendorId).subscribe(response => {
      if (response.isSuccess) {
        this.vendorDetail = response.data
        this.shopDetail = this.vendorDetail.shopResponses
        this.shopId = this.shopDetail[0]?.shopId
      }
      this.spinner.hide();
    })
  }

  /** Product Form **/
  ProductForm() {
    this.form = this.formBuilder.group({
      vendorId: [this.vendorId],
      shopId: [this.shopId],
      inStock: ['', [Validators.required]],
      sellingPrice: [ '', [Validators.required]],
      discount: [0],
      discountType: [1],
      mrp: ['', [Validators.required]],
      manufacturingDate: [null],
      expiryDate: [null],
      quantity: ['', [Validators.required]],
      productQuantityTypeId: ['', [Validators.required]],
      productContainerTypeId: [null],
      shippingCharges: [0],
      productName: ['', [Validators.required]],
      skuid: ['', [Validators.required, Validators.pattern(/^.{7,12}$/)]],
      productDescription: [null],
      brandId: [null],
      mainProductCategoryId: ['', [Validators.required]],
      subProductCategoryId: [null],
      subSubProductCategoryId: [null],
      groupId: [0],
      waitingDays: [null],
      speciality: [0],
      flavour: [null],
      howToUse: [null],
      ingredients: [null],
      storageAndUses: [null],
      nutritionFact: [null],
      otherProductInfo: [null],
    });
  }

  get f() {
    return this.form['controls'];
  }

  backClicked() {
    this._location.back();
  }

  calculateSellingPrice() {
    const mrp = parseFloat(this.mrp);
    let discount = parseFloat(this.discount);
    let errorMessage = '';
  
    if (this.discountType === '0') {
      if (isNaN(discount)) {
        discount = 0; 
      }
      if (discount > 100) {
        discount = 0;
      }
      this.sellingPrice = (mrp - (mrp * discount) / 100).toFixed(2);
    } else if (this.discountType === '1') {
      if (isNaN(discount)) {
        discount = 0;
      }
      if (discount > mrp || discount > this.maxDiscountValue) {
        discount = Math.min(mrp, this.maxDiscountValue);
      }
      this.sellingPrice = (mrp - discount).toFixed(2);
    }
  
    this.discount = discount;
    this.errorMessage = errorMessage;
  } 
  
  onDiscountKeypress(event: KeyboardEvent) {
    debugger
    const mrp = parseFloat(this.mrp);
    const inputValue = parseFloat((event.key === '.' ? this.discount : this.discount + event.key));
    if (this.discountType === '0') {
    if (!isNaN(inputValue) && inputValue > 100) {
      event.preventDefault(); // Prevent the keypress if it would exceed 100%
   //   this.errorMessage = 'Discount cannot exceed 100%';
      this.toaster.error('Discounts cannot go beyond 100%')
    } else {
      this.errorMessage = '';
    }
    }
    if (this.discountType === '1') {
      if (!isNaN(inputValue) && inputValue > mrp) {
        event.preventDefault(); // Prevent the keypress if it would exceed 100%
     //   this.errorMessage = 'Discount cannot exceed 100%';
        this.toaster.error('The discount cannot go beyond the MRP.')
      } else {
        this.errorMessage = '';
      }
      }
  }
  
  resetDiscount() {
    // if (this.discountType == "1") {
    //   this.discountType = "1";
    //   this.sellingPrice = this.mrp - this.discount;
    // } else if (this.discountType == "0") {
    //   this.discountType = "0";
    //   this.sellingPrice = this.mrp - (this.mrp * this.discount) / 100;
    // }
  }
 
  // get container list 
  getContainerListType() {
    this.content.getContainerList().subscribe(response => {
      if (response.isSuccess) {
        this.containerList = response.data
      }
    });
  }

  /*** Brand List ***/
  getbrandList() {
    let payload = {
      pageNumber: 1,
      pageSize: 1000,
    }
    this.spinner.show();
    this.content.getBrand(payload).subscribe(response => {
      if (response.isSuccess) {
        this.brandList = response.data.dataList;

        this.spinner.hide();
      } else {
        this.toaster.error(response.messages);
      }
    });
  }

  // Product Quantity 

  getQuantity() {
    this.spinner.show();
    this.content.getProductQuantityList().subscribe(response => {
      if (response.isSuccess) {
        this.qunatityList = response.data
      } else {
        this.toaster.error(response.messages);
      }
    });
  }

  /*** Main Category List ***/
  getcategoryList() {
    this.spinner.show();
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
    this.content.SubCategorySuper(id).subscribe(response => {
      if (response.isSuccess) {
        this.SubcategoryList = response.data;
        this.SubSubcategoryList = []
      } else {
        this.SubcategoryList = [];
        this.toaster.error(response.messages);
      }
    });
  }

  /*** Sub Sub Category List ***/
  getSubSubcategoryList(id: any) {
    this.content.SubSubCategory(id).subscribe(response => {
      if (response.isSuccess) {
        this.SubSubcategoryList = response.data;
      } else {
        this.SubSubcategoryList = []
        this.toaster.error(response.messages);
      }
    });
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
      formData.append('ProductImage', blob, `image_${i}.png`);
    }
    formData.append('ProductId', this.productId);
    this.content.uploadProductImage(formData).subscribe(response => {
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

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.toaster.error("Form Incomplete: Please fill in all the required fields correctly");
      return;
    }
    // this.form.value.manufacturingDate = new Date();
    let date = this.datepipe.transform(this.form.value.manufacturingDate, 'yyyy-MM-dd');
    // this.form.value.expiryDate = new Date();
    let expiryDate = this.datepipe.transform(this.form.value.expiryDate, 'yyyy-MM-dd');
    let id = parseInt(this.shopId);
    //  let inStock = parseInt(this.form.value.inStock)
    let payload = {
      vendorId: this.vendorId,
      shopId: id,
      inStock: this.form.value.inStock,
      sellingPrice: this.form.value.sellingPrice,
      discount: this.form.value.discount,
      discountType: this.form.value.discountType,
      mrp: this.form.value.mrp,
      manufacturingDate: date,
      expiryDate: expiryDate,
      quantity: this.form.value.quantity,
      productQuantityTypeId: this.form.value.productQuantityTypeId,
      productContainerTypeId: this.form.value.productContainerTypeId,
      shippingCharges: this.form.value.shippingCharges,
      productName: this.form.value.productName,
      skuid: this.form.value.skuid,
      brandId: this.form.value.brandId,
      mainProductCategoryId: this.form.value.mainProductCategoryId,
      subProductCategoryId: this.form.value.subProductCategoryId,
      subSubProductCategoryId: this.form.value.subSubProductCategoryId,
      groupId: this.form.value.groupId,
      waitingDays: this.form.value.waitingDays,
      speciality: this.form.value.speciality,
      flavour: this.form.value.flavour,
      howToUse: this.form.value.howToUse,
      ingredients: this.form.value.ingredients,
      storageAndUses: this.form.value.storageAndUses,
      nutritionFact: this.form.value.nutritionFact,
      otherProductInfo: this.form.value.otherProductInfo,
    }
    this.spinner.show()
    this.content.postProduct(payload).subscribe(response => {
      this.spinner.hide()
      this.productId = response.data?.productId
      this.fileChangeEvent();
      if (response.isSuccess) {
        this.toaster.success(response.messages);
        this._location.back();
      } else {
        this.toaster.error(response.messages)
      }
    });
  }
  
  cancel() {
    if (this.role === 'Vendor') {
      this.router.navigateByUrl('/vendor-products-list')
      .then(() => {
         window.location.reload();
       });
      }
      else if (this.role === 'SuperAdmin') {
        this.router.navigate(['/super-vendor-list/super-vendor-detail/product-list'], {
          queryParams: {
            id: this.vendorId,
            id2: this.shopId
          }
        }).then(() => {
          window.location.reload();
        });
      }
     else{
      this.router.navigateByUrl('/vendor-products-list')
      .then(() => {
         window.location.reload();
       });
      }
  }

}
