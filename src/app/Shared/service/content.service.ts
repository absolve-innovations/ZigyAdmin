import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiEndPoint } from '../enums/api-end-point';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient,
    public router: Router) { }


  // Image upload 

  uploadImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.ImageUpload, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }

  // Category Image upload 

  categoryImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.categoryImageUpload, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }


  // Category Image upload 

  shopImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.shopImage, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }

  // Add Form Api //

  getAllCountries() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCountry);
  }


  // get all states
  getAllStates(countryId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getState + '?countryId=' + countryId);
  }

  // Plans
  getPlansListAdmin(planType: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getPlanList + '?planType=' + planType);
  }

  getPlansList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getPlanList);
  }
  getPlansListFilter(planType: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getPlanList + '?planType=' + planType);
  }

  getPlansListVendor(vendorId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getPlanList + '?vendorId=' + vendorId);
  }

  addPlan(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addUpdatePlan, data);
  }

  planDetail(membershipPlanId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getPlanDetail + '?membershipPlanId=' + membershipPlanId);
  }

  deletePlan(membershipPlanId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteAddedPlan + '?membershipPlanId=' + membershipPlanId);
  }

  planUpdate(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updatePlan, data);
  }


  // Add vendor 

  addVendor(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addVendor, data);
  }

  // Edit Vendor

  editVendor(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.UpdateVendor, data);
  }

  // OR Image upload 

  UploadQrImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.QRImage, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }



  // vendor list 

  getVendorList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.vendorList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize);
  }



  // Vendor Detail 

  getVendorDetail(vendorId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.vendorDetail + '?vendorId=' + vendorId, {});
  }

  // Vendor accept reject 

  vendorAcceptReject(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.vendorStatus, data);
  }

  // Admin User List 

  getAdminUserList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.AdminUserList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize);
  }


  // Admin User Detail

  UserAdminDetail(Id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.AdminUserDetail + '?Id=' + Id);
  }

  // Add Admin User

  postAdminUser(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.AddAdminUser, data);
  }

  // Update Admin User

  updateAdminUser(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.UpdateAdminUser, data);
  }

  // delete vendor 

  deleteVendor(VendorId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteVendor + '?VendorId=' + VendorId);
  }

  // delete Admin User

  deleteAdminUser(Id: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteAdminUser + '?Id=' + Id);
  }

  // Category List 

  getcategory() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryList);
  }

  //vendor

  getcategoryVendor(shopId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryVendor + '?ShopId=' + shopId);
  }


  productCategoryRequestList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getProductCategoryRequestList);
  }

  acceptRejectCategorys(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.acceptRejectCategory, data);
  }

  // category status 

  statusPostCategory(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.categoryStatus, data);
  }

  getFilterMaincategory(id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productList + '?pageNumber=' + id.pageNumber + '&pageSize=' + id.pageSize + '&mainProductCategoryId=' + id.mainProductCategoryId + '&vendorId=' + id.vendorId);
  }

  // Sub Category List 

  SubCategory(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryListSuper + '?MainProductCategoryId=' + data.MainProductCategoryId + '&ShopId=' + data.ShopId);
  }

  SubSubCategorys(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryListSuper + '?SubProductCategoryId=' + data.SubProductCategoryId + '&ShopId=' + data.ShopId);
  }



  SubCategorySuper(MainProductCategoryId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryList + '?MainProductCategoryId=' + MainProductCategoryId);
  }

  SubCategorySupers(SubProductCategoryId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryList + '?SubProductCategoryId=' + SubProductCategoryId);
  }

  getFilterSubCategory(id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productList + '?pageNumber=' + id.pageNumber + '&pageSize=' + id.pageSize + '&subProductCategoryId=' + id.subProductCategoryId + '&vendorId=' + id.vendorId);
  }

  // Sub  Sub Category List 

  SubSubCategory(SubProductCategoryId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getcategoryList + '?SubProductCategoryId=' + SubProductCategoryId);
  }

  getFilterSubSubCategory(id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productList + '?pageNumber=' + id.pageNumber + '&pageSize=' + id.pageSize + '&subSubProductCategoryId=' + id.subSubProductCategoryId + '&vendorId=' + id.vendorId);
  }

  //  Add Sub Category
  addSubCategory(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addCategory, data);
  }


  // Update Sub Category 

  UpdateSubCategory(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateCategory + '?subProductCategoryId=' + data.subProductCategoryId, data);
  }

  UpdateSubSubCategory(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateCategory + '?subSubProductCategoryId=' + data.subSubProductCategoryId, data);
  }


  // Sub  Category Detail

  SubcategoryDetail(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.categoryDetail + '?MainProductCategoryId=' + data.MainProductCategoryId + '&SubProductCategoryId=' + data.SubProductCategoryId);
  }

  SubSubcategoryDetail(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.categoryDetail + '?MainProductCategoryId=' + data.MainProductCategoryId + '&SubSubProductCategoryId=' + data.SubSubProductCategoryId);
  }

  //  Add Category
  addCategory(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addCategory, data);
  }

  // Update Category 

  UpdateCategory(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateCategory, data);
  }

  // Category Detail

  categoryDetail(MainProductCategoryId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.categoryDetail + '?MainProductCategoryId=' + MainProductCategoryId);
  }

  // Category Delete

  mainCategoryDelete(MainProductCategoryId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteMainCategory + '?MainProductCategoryId=' + MainProductCategoryId);
  }

  // Sub Category Delete

  subCategoryDelete(SubProductCategoryId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteSubCategory + '?SubProductCategoryId=' + SubProductCategoryId);
  }

  subsubCategoryDelete(SubSubProductCategoryId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteSubCategory + '?SubSubProductCategoryId=' + SubSubProductCategoryId);
  }

  // Brand

  // brand Add 

  addBrand(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addBrand, data);
  }

  deletebrand(brandId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteBrand + '?brandId=' + brandId);
  }


  // update brand 
  updateBrand(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateBrand, data);
  }


  // Brand Detail

  brandDetail(brandId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.brandDetail + '?brandId=' + brandId);
  }

  // Brand Image upload 

  brandImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.brandImage, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }

  // Brand List
  getBrand(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getBrandList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize);
  }

  getFilterBrand(id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productList + '?pageNumber=' + id.pageNumber + '&pageSize=' + id.pageSize + '&brandId=' + id.brandId + '&vendorId=' + id.vendorId);
  }

  // Banner
  getBanner(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getBannerList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize);
  }

  // Banner Detail
  bannerDetail(bannerId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getBannerDetail + '?bannerId=' + bannerId);
  }


  addBanner(data: any) {
    // return this.http.post<any>(environment.apiUrl + ApiEndPoint.addBanner, data)
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addBanner, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }

  updateBanner(data: any) {
    // return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateBanner, data)
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateBanner, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }

  // Delete Banners
  deleteBanners(bannerId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteHomeBanners + '?bannerId=' + bannerId);
  }

  deleteShopBanner(shopBannerId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteShopBanners + '?shopBannerId=' + shopBannerId);
  }


  // Shop Banner
  getShopBanner(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getShopBannerList + '?shopId=' + data.shopId + '&shopBannerType=' + data.shopBannerType);
  }

  filterAllBanners(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getShopBannerList + '?shopId=' + data.shopId + '&mainProductCategoryId=' + data.mainProductCategoryId + '&subProductCategoryId=' + data.subProductCategoryId + '&subSubProductCategoryId=' + data.subSubProductCategoryId + '&shopBannerType=' + data.shopBannerType);
  }

  // getFilterShopMain(data: any) {
  //   return this.http.get<any>(environment.apiUrl + ApiEndPoint.getShopBannerList + '?shopId=' + data.shopId + '&mainProductCategoryId=' + data.mainProductCategoryId)
  // }

  // getfilerShopSub(data: any) {
  //   return this.http.get<any>(environment.apiUrl + ApiEndPoint.getShopBannerList + '?shopId=' + data.shopId + '&subProductCategoryId=' + data.subProductCategoryId)
  // }


  // getfilerShopSubSub(data: any) {
  //   return this.http.get<any>(environment.apiUrl + ApiEndPoint.getShopBannerList + '?shopId=' + data.shopId + '&subSubProductCategoryId=' + data.subSubProductCategoryId)
  // }


  shopBannerDetail(shopBannerId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getShopBannerDetail + '?shopBannerId=' + shopBannerId + []);
  }

  // Add shop Banner

  postShopBanner(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addShopBanner, data);
  }


  // Container Type List 

  getContainerList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productContainerType);
  }


  // Product Qunatity List 

  getProductQuantityList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productQunatity);
  }


  // Add Product

  postProduct(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addProduct, data);
  }

  updateProduct(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateProduct, data);
  }


  uploadProductImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.productImage, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }


  // get product list 

  getProductlist(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize);
  }

  // Product Stock Update 

  updateStock(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.productStock, data)
  }


  getProductInventoryDetail(productId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productInventoryDetail + '?productId=' + productId);
  }


  getProductDetail(productId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productDetail + '?productId=' + productId);
  }

  deleteProduts(productId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteProduct + '?productId=' + productId);
  }

  statusPost(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.postStatus, data);
  }

  getvendorProductlist(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId);
  }

  getadditionalProductlist(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.additionalProduct + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&shopId=' + data.shopId + '&deliveryManId=' + data.deliveryManId);
  }

  additionProduct(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.additionalProduct + '?shopId=' + data.shopId + '&deliveryManId=' + data.deliveryManId);
  }

  getSupervendorProductlist(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId);
  }

  getDistributorvendorProductlist(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId + '&shopId=' + data.shopId);
  }

  // Shop Banner Upload 

  uploadShopBanner(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addShopBanner, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }

  updateShopBanner(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateShopBanner, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }

  // Collections

  getCollection(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCollectionList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize);
  }

  // get Collection Name List
  getCollectionList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCollectionNameList);
  }

  // Post Collection
  postCollection(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addCollection, data)
  }

  uploadCollectionImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.collectionImage, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));

  }

  deleteCollections(collectionId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteCollection + '?collectionId=' + collectionId)
  }

  // Product Detail

  detailProduct(productId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productDetail + '?productId=' + productId)
  }

  collectionDetail(collectionId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCollectionDetail + '?collectionId=' + collectionId + [])
  }


  // Order List

  orderList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId + '&shopId=' + data.shopId);
  }

  orderListFilter(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderListFilter + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId + '&isDairyProduct=' + data.isDairyProduct);
  }

  orderListType(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderListFilter + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId + '&deliveryType=' + data.deliveryType);
  }


  orderListStatus(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderListFilter + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId + '&orderStatus=' + data.orderStatus);
  }

  orderListPayment(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderListFilter + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId + '&paymentStatus=' + data.paymentStatus)
  }

  FormDate2ToDate(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderListFilter + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId + '&fromDate=' + data.fromDate + '&toDate=' + data.toDate);
  }

  allFilterOrder(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderListFilter + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&vendorId=' + data.vendorId + '&fromDate=' + data.fromDate + '&toDate=' + data.toDate + '&paymentStatus=' + data.paymentStatus + '&orderStatus=' + data.orderStatus + '&deliveryType=' + data.deliveryType + '&searchQuery=' + data.searchQuery + '&isDairyProduct=' + data.isDairyProduct + '&deliveryManName=' + data.deliveryManName + '&shopId=' + data.shopId);

  }

  orderDetail(orderDetailId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.orderdetail + '?orderDetailId=' + orderDetailId);
  }


  orderStatus(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.orderStatus, data);
  }

  orderPaymentStatus(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.paymentStatus, data);
  }


  // Additional Feature

  getAdditionalList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.additionalList + '?shopId=' + data.shopId + '&deliveryManId=' + data.deliveryManId + '&isDairyProduct=' + data.isDairyProduct + '&searchByDate=' + data.searchByDate + '&timing=' + data.timing);
  }

  deleteAdditional(additionalproductId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteAdditional + '?additionalproductId=' + additionalproductId);
  }

  addeditAdditional(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addeditAdditional, data);
  }

  deliveryStatus(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.deliveryStatus, data);
  }

  /// Payment 

  planBuy(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.buyPlan, data);
  }


  // Super Admin Profile Update

  getSuperAdminDetail() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.superProfileDetail);
  }

  updateSuperAdmimProfile(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.postSuperAdmimProfile, data);
  }


  // Payment Options

  paymentOptions(membershipPlanId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.paymentOPtion + '?membershipPlanId=' + membershipPlanId);
  }


  // Image convertor to update 
  imageConvert(productId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.base64 + '?productId=' + productId);
  }

  // Image convertor to update 
  inventoryImageConvert(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.inventoryBase64 + '?productId=' + data.productId + '&inventoryStatus=' + data.inventoryStatus);
  }


  // Upload Receipt
  uploadReceiptImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.uploadReceipt, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));

  }



  // Distributor List 

  listDistributor(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.distributorList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize);
  }

  // Distributor Add 

  AddDistributor(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.distributorAdd, data);
  }

  // Distributor Detail

  detailDistributor(Id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.distributorDetail + '?Id=' + Id);
  }


  // Product Inventroy

  getProductlistInventory(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productInventoryList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize);
  }

  // filter brand inventory
  getFilterBrandInventory(id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productInventoryList + '?pageNumber=' + id.pageNumber + '&pageSize=' + id.pageSize + '&brandId=' + id.brandId);
  }

  // filter main category inventory

  getFilterMaincategoryInventory(id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productInventoryList + '?pageNumber=' + id.pageNumber + '&pageSize=' + id.pageSize + '&mainProductCategoryId=' + id.mainProductCategoryId);
  }

  // filter sub category Inventory
  getFilterSubCategoryInventory(id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productInventoryList + '?pageNumber=' + id.pageNumber + '&pageSize=' + id.pageSize + '&subProductCategoryId=' + id.subProductCategoryId);
  }

  // filter sub sub category Inventory 

  getFilterSubSubCategoryInventory(id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.productInventoryList + '?pageNumber=' + id.pageNumber + '&pageSize=' + id.pageSize + '&subSubProductCategoryId=' + id.subSubProductCategoryId);
  }

  // delete Inventory Product Api

  deleteProdutsInventory(productId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteProductInventory + '?productId=' + productId);
  }

  // Product Inventory Status
  // Add Product

  postProductInventory(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addProductInventory, data);
  }

  updateProductInventory(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.productInventoryUpdate, data);
  }


  // Distributor 

  // vendor list 

  getDistributorVendorList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.distributorVendorList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&createdBy=' + data.createdBy);
  }


  // delete Distributor 

  deleteDistributor(VendorId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteVendor + '?VendorId=' + VendorId);
  }

  getDistributorDetail(Id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.distributorDetail + '?Id=' + Id);
  }

  updateDistributorProfile(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateDistributor, data);
  }

  updateUserAdminProfile(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateUserAdmin, data);
  }

  earningList() {

  }


  getEarning(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getEarningList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize);
  }


  // broadcast notification
  getBroadNotification(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.broadcastNotification + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize);
  }

  getBroadNotificationFilter(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.broadcastNotification + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&searchByRole=' + data.searchByRole);
  }

  postBroadNotification(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addbroadcastNotification, data);
  }

  deleteNotification(notificationId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteBroadcastNotification + '?notificationId=' + notificationId);
  }



  // bulk


  // Bulk Uplload

  getExcelByMainOrSubOrSubSubCategory(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getExcelSteet + '?ShopId=' + data.ShopId + '&MainProductCategoryId=' + data.MainProductCategoryId + '&SubProductCategoryId=' + data.SubProductCategoryId + '&SubSubProductCategoryId=' + data.SubSubProductCategoryId);
  }



  getExcelByMainOrSubOrSubSubCategoryInventory(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getExcelSteet + '?MainProductCategoryId=' + data.MainProductCategoryId + '&SubProductCategoryId=' + data.SubProductCategoryId + '&SubSubProductCategoryId=' + data.SubSubProductCategoryId);
  }

  // Upload Excel
  uploadExcel(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.excelUpload, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));

  }



  // generate link 

  uploadLinkImage(data: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const options = {
      headers: headers
    };
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.imageLink, data, options).pipe(map((data: any) => {
      localStorage.setItem('File', data);
      return data;
    }));
  }


  // getredirect(){
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('X-VERIFY', '5ed9a68c4cf25dd5116607cfca902b83307ce15101e8c0ca60db1e4ac6a78f65###1');
  //   headers.append('accept', 'application/json');
  //   const options = {
  //     headers: headers
  //   };

  //   return this.http.post<any>( ApiEndPoint.redirect , )


  // }

  // image link list 

  imageLinkList() {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.linkList);
  }

  getExcelByMainCategory(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getExcelSteet + '?ShopId=' + data.ShopId + '&MainProductCategoryId=' + data.MainProductCategoryId);
  }

  getExcelByMainCategoryInventory(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getExcelSteet + '?MainProductCategoryId=' + data.MainProductCategoryId);
  }

  getExcelByMainOrSubCategory(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getExcelSteet + '?ShopId=' + data.ShopId + '&MainProductCategoryId=' + data.MainProductCategoryId + '&SubProductCategoryId=' + data.SubProductCategoryId);
  }

  getExcelByMainOrSubCategoryInventory(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getExcelSteet + '?MainProductCategoryId=' + data.MainProductCategoryId + '&SubProductCategoryId=' + data.SubProductCategoryId);
  }

  /*** Vendor App Info ***/

  getDairyInfo(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getDairyInformation + '?shopId=' + data.shopId);
  }

  updateDairy(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateDairyInfo, data);
  }
  
  getGroceryCustomerList(shopId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCustomerList + '?shopId=' + shopId);
  }

  addDairy(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addDairyInfo, data);
  }

  getCustomerLists(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCustomerList + '?shopId=' + data.shopId + '&dairyStatus=' + data.dairyStatus);
  }
  getCustomerDetails(data: any) {

    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCustomerDetail + '?customerAddressId=' + data.customerAddressId + '&shopId=' + data.shopId + '&customerUserId=' + data.customerUserId);
  }

  getCustomerListOffline(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCustomerListOffline + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&shopId=' + data.shopId);
  }

  customerAdd(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addCustomer, data);
  }
  updateOflineCustomer(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addCustomer, data);
  }

  getofflineCustomerDetail(vendorCustomerId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getCustomerListOfflineDetail + '?vendorCustomerId=' + vendorCustomerId);
  }

  getofflineCustomerDelete(vendorCustomerId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.getCustomerListOfflineDelete + '?vendorCustomerId=' + vendorCustomerId);
  }


  setAreaCodeForCustomer(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.setCustomerAreaCode, data);
  }

  // Area 

  getAreaList(shopId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.areaList + '?shopId=' + shopId);
  }

  postArea(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.addarea, data);
  }

  areaDetail(areaCodeId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.areaDetail + '?areaCodeId=' + areaCodeId);
  }

  areaDelete(areaCodeId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteArea + '?areaCodeId=' + areaCodeId);
  }

  getDairyTopUpList(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getTopUpList + '?shopId=' + data.shopId);
  }

  postWalletStatus(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.postDairyWalletStatus, data);
  }

  getDeliveryManLists(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getDeliveryManList + '?shopId=' + data.shopId);
  }

  getAssignOrderToDeliveryManLists(data: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getAssignOrderToDeliveryManList + '?pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&shopId=' + data.shopId + '&isDairyProduct=' + data.isDairyProduct + '&searchByDate=' + data.searchByDate + '&isDairyProduct=' + data.isDairyProduct + '&MorningOrEveningOrder=' + data.MorningOrEveningOrder);
  }

  addDeliveryMan(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.postDairyMan, data);
  }

  getDeliveryManDetails(deliveryManId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getDeliveryManDetail + '?deliveryManId=' + deliveryManId);
  }


  getDeliveryManOrderDetails(deliveryManId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.getDeliveryManOrderDetail + '?deliveryManId=' + deliveryManId.deliveryManId + '&timing=' + deliveryManId.timing + '&searchByDate=' + deliveryManId.searchByDate + '&isDairyProduct=' + deliveryManId.isDairyProduct);
  }


  // update Delivery Man searchByDate
  updateDeliveryMan(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.updateDeliveryMan, data);
  }

  deleteDeliveryMan(deliveryManId: any) {
    return this.http.delete<any>(environment.apiUrl + ApiEndPoint.deleteAddedDeliveryMan + '?deliveryManId=' + deliveryManId);
  }


  // Subscription List 

  listSubscription(id: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.subscriptionList + '?pageNumber=' + id.pageNumber + '&pageSize=' + id.pageSize + '&shopId=' + id.shopId);
  }

  // Subscription Detail 

  subscriptionDetail(subscriptionDetailId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.subscriptionDetail + '?subscriptionDetailId=' + subscriptionDetailId);
  }

  // final payment

  getPayment(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.payment, data)
  }

  // Check Payment

  getCheckPayment(merchantTransactionId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.checkPayment + '?merchantTransactionId=' + merchantTransactionId);
  }

  // Check Transiction Id 

  gettransictionID(transactionId: any) {
    return this.http.get<any>(environment.apiUrl + ApiEndPoint.transictionId + '?transactionId=' + transactionId);
  }


  // order stats

  timeStatus(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.timeStatus, data);
  }

}
