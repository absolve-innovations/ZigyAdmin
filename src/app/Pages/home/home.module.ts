import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './SuperAdmin/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SuperAddVendorComponent } from './SuperAdmin/super-add-vendor/super-add-vendor.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminUserDashboardComponent } from './AdminUser/admin-user-dashboard/admin-user-dashboard.component';
import { ProductComponent } from './Vendor/product/product.component';
import { VendorDashboardComponent } from './Vendor/vendor-dashboard/vendor-dashboard.component';
import { AddProductComponent } from './Vendor/add-product/add-product.component';
import { SuperListVendorComponent } from './SuperAdmin/super-vendor-detail/super-list-vendor/super-list-vendor.component';
import { SuperVendorDetailComponent } from './SuperAdmin/super-vendor-detail/super-vendor-detail.component';
import { SuperAddUserAdminComponent } from './SuperAdmin/super-add-user-admin/super-add-user-admin.component';
import { UseradminDetailComponent } from './SuperAdmin/super-add-user-admin/useradmin-detail/useradmin-detail.component';
import { UserAdminListComponent } from './SuperAdmin/super-add-user-admin/user-admin-list/user-admin-list.component';
import { CategoryListComponent } from './SuperAdmin/category/category-list/category-list.component';
import { CategoryAddEditComponent } from './SuperAdmin/category/category-add-edit/category-add-edit.component';
import { SubCategoryComponent } from './SuperAdmin/category/sub-category/sub-category.component';
import { SubcategoryAddEditComponent } from './SuperAdmin/category/subcategory-add-edit/subcategory-add-edit.component';
import { BrandListComponent } from './Brand/brand-list/brand-list.component';
import { BrandAddEditComponent } from './Brand/brand-add-edit/brand-add-edit.component';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { SuperProductListComponent } from './SuperAdmin/super-vendor-detail/super-list-vendor/super-product-list/super-product-list.component';
import { NgChartsModule } from 'ng2-charts';
import { QRCodeModule } from 'angularx-qrcode';
import { BannerListComponent } from './SuperAdmin/Banners/banner-list/banner-list.component';
import { AddEditBannerComponent } from './SuperAdmin/Banners/add-edit-banner/add-edit-banner.component';
import { BannerDetailComponent } from './SuperAdmin/Banners/banner-detail/banner-detail.component';
import { ShopBannerListComponent } from './Vendor/Shop-Banners/shop-banner-list/shop-banner-list.component';
import { AddEditShopBannerComponent } from './Vendor/Shop-Banners/add-edit-shop-banner/add-edit-shop-banner.component';
import { ShopBannerDetailComponent } from './Vendor/Shop-Banners/shop-banner-detail/shop-banner-detail.component';
import { CollectionListComponent } from './Vendor/collection-list/collection-list.component';
import { AddEditCollectionComponent } from './Vendor/collection-list/add-edit-collection/add-edit-collection.component';
import { CouponsComponent } from './Vendor/coupons/coupons.component';
import { AddEditCoupansComponent } from './Vendor/coupons/add-edit-coupans/add-edit-coupans.component';
import { EditShopBannerComponent } from './Vendor/Shop-Banners/edit-shop-banner/edit-shop-banner.component';
import { CollectionDetailComponent } from './Vendor/collection-list/collection-detail/collection-detail.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OrdersListComponent } from './Vendor/orders/orders-list/orders-list.component';
import { ProductDetailComponent } from './Vendor/product/product-detail/product-detail.component';
import { OrderDetailComponent } from './Vendor/orders/order-detail/order-detail.component';
import { OrderProductDetailComponent } from './Vendor/orders/order-product-detail/order-product-detail.component';
import { EditProductComponent } from './Vendor/edit-product/edit-product.component';
import { VendorProfileComponent } from './Vendor/vendor-profile/vendor-profile.component';
import { NumberDirective } from 'src/app/number.directive';
import { VendorUpiDetailComponent } from './SuperAdmin/super-vendor-detail/vendor-upi-detail/vendor-upi-detail.component';
import { AutofocusDirective } from 'src/app/autofocus.directive';
import { SubSubCategoryComponent } from './SuperAdmin/category/sub-sub-category/sub-sub-category.component';
import { SubSubCategoryAddEditComponent } from './SuperAdmin/category/sub-sub-category-add-edit/sub-sub-category-add-edit.component';
import { MembershipPlanListComponent } from './SuperAdmin/membership-plan-list/membership-plan-list.component';
import { PlanListComponent } from './SuperAdmin/plans/plan-list/plan-list.component';
import { AddEditPlanComponent } from './SuperAdmin/plans/add-edit-plan/add-edit-plan.component';
import { PlanDetailComponent } from './SuperAdmin/plans/plan-detail/plan-detail.component';
import { SuperAdminProfileComponent } from './SuperAdmin/super-admin-profile/super-admin-profile.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DistributorListComponent } from './SuperAdmin/Distributor/distributor-list/distributor-list.component';
import { DistributorAddEditComponent } from './SuperAdmin/Distributor/distributor-add-edit/distributor-add-edit.component';
import { DistributorDetailComponent } from './SuperAdmin/Distributor/distributor-detail/distributor-detail.component';
import { ProductInventoryListComponent } from './SuperAdmin/productInventory/product-inventory-list/product-inventory-list.component';
import { ProductInventoryAddEditComponent } from './SuperAdmin/productInventory/product-inventory-add-edit/product-inventory-add-edit.component';
import { ProductInventoryDetailComponent } from './SuperAdmin/productInventory/product-inventory-detail/product-inventory-detail.component';
import { ProductInventoryEditComponent } from './SuperAdmin/productInventory/product-inventory-edit/product-inventory-edit.component';
import { DistributorProfileComponent } from './Distributor/distributor-profile/distributor-profile.component';
import { DistributorVendorListComponent } from './Distributor/distributor-vendor-list/distributor-vendor-list.component';
import { DistributorVendorAddEditComponent } from './Distributor/distributor-vendor-add-edit/distributor-vendor-add-edit.component';
import { DistributorVendorDetailComponent } from './Distributor/distributor-vendor-detail/distributor-vendor-detail.component';
import { AdminUserProfileComponent } from './AdminUser/admin-user-profile/admin-user-profile.component';
import { EarningListComponent } from './Distributor/earning/earning-list/earning-list.component';
import { EarningDetailComponent } from './Distributor/earning/earning-detail/earning-detail.component';
import { AgmCoreModule } from '@agm/core';
import { SuperNotificationListComponent } from './SuperAdmin/super-notification-list/super-notification-list.component';
import { SuperNotificationAddComponent } from './SuperAdmin/super-notification-add/super-notification-add.component';
import { BulkUploadComponent } from './Bulk/bulk-upload/bulk-upload.component';
import { VendorNotificationListComponent } from './Vendor/vendor-notification-list/vendor-notification-list.component';
import { VendorAddNotificationComponent } from './Vendor/vendor-add-notification/vendor-add-notification.component';
import { GenerateImageLinkComponent } from './generate-image-link/generate-image-link.component';
import { VendorBulkUploadComponent } from './Bulk/bulk-upload/vendor-bulk-upload/vendor-bulk-upload.component';
import { InventoryBulkComponent } from './Bulk/bulk-upload/inventory-bulk/inventory-bulk.component';
import { AppInfoComponent } from './SuperAdmin/app-info/app-info.component';
import { VendorSettingComponent } from './Vendor/vendor-setting/vendor-setting.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CustomerListComponent } from './Vendor/Dairy/customer-list/customer-list.component';
import { AreaListComponent } from './Vendor/Dairy/area-list/area-list.component';
import { AddEditAreaComponent } from './Vendor/Dairy/add-edit-area/add-edit-area.component';
import { CustomerDetailComponent } from './Vendor/Dairy/customer-detail/customer-detail.component';
import { DairyTopUpListComponent } from './Vendor/Dairy/dairy-top-up-list/dairy-top-up-list.component';
import { DeliveryManListComponent } from './Vendor/DeliveryMan/delivery-man-list/delivery-man-list.component';
import { AddEditDeliveryManComponent } from './Vendor/DeliveryMan/add-edit-delivery-man/add-edit-delivery-man.component';
import { DeliveyManDetailComponent } from './Vendor/DeliveryMan/delivey-man-detail/delivey-man-detail.component';
import { SubscriptionListComponent } from './SuperAdmin/subscription-list/subscription-list.component';
import { SubscriptionDetailComponent } from './SuperAdmin/subscription-detail/subscription-detail.component';
import { DeliveryManOrderDetailComponent } from './Vendor/DeliveryMan/delivery-man-order-detail/delivery-man-order-detail.component';
import { MembershipSuccessComponent } from './SuperAdmin/membership-plan-list/membership-success/membership-success.component';
import { MembershipErrorComponent } from './SuperAdmin/membership-plan-list/membership-error/membership-error.component';
import { AlphabeticOnlyDirective } from 'src/app/alphabetic-only.directive';
import { AddEditCustomerComponent } from './Vendor/Dairy/customer-list/add-edit-customer/add-edit-customer.component';
import { OfflineCostumerListComponent } from './Vendor/Dairy/customer-list/offline-costumer-list/offline-costumer-list.component';
import { OfflineCustomerDetailComponent } from './Vendor/Dairy/customer-list/offline-costumer-list/offline-customer-detail/offline-customer-detail.component';
import { NumericWithSpecialCharsDirective } from 'src/app/NumericWithSpecialCharsDirective.directive ';
import { NoSpacesAtStartDirective } from 'src/app/NoSpacesAtStartDirective ';
import { AdditionListComponent } from './Vendor/additional/addition-list/addition-list.component';
import { AdditionDetailComponent } from './Vendor/additional/addition-detail/addition-detail.component';
import { OnlyNumberDirective } from 'src/app/numberonly.directive';
import { AlphanumericDirective } from 'src/app/alphanumericDirective ';


@NgModule({
  declarations: [
    DashboardComponent,
    SuperAddVendorComponent,
    SuperListVendorComponent,
    AdminUserDashboardComponent,
    SuperVendorDetailComponent,
    ProductComponent,
    VendorDashboardComponent,
    AddProductComponent,
    SuperAddUserAdminComponent,
    UseradminDetailComponent,
    UserAdminListComponent,
    CategoryListComponent,
    CategoryAddEditComponent,
    SubCategoryComponent,
    SubcategoryAddEditComponent,
    BrandListComponent,
    BrandAddEditComponent,
    SuperProductListComponent,
    BannerListComponent,
    AddEditBannerComponent,
    BannerDetailComponent,
    ShopBannerListComponent,
    AddEditShopBannerComponent,
    ShopBannerDetailComponent,
    CollectionListComponent,
    AddEditCollectionComponent,
    CouponsComponent,
    AddEditCoupansComponent,
    EditShopBannerComponent,
    CollectionDetailComponent,
    OrdersListComponent,
    ProductDetailComponent,
    OrderDetailComponent,
    OrderProductDetailComponent,
    EditProductComponent,
    VendorProfileComponent,
    NumberDirective,
    OnlyNumberDirective,
    NumericWithSpecialCharsDirective,
    NoSpacesAtStartDirective,
    AlphabeticOnlyDirective,
    AlphanumericDirective,
    VendorUpiDetailComponent,
    AutofocusDirective,
    SubSubCategoryComponent,
    SubSubCategoryAddEditComponent,
    MembershipPlanListComponent,
    PlanListComponent,
    AddEditPlanComponent,
    PlanDetailComponent,
    SuperAdminProfileComponent,
    DistributorListComponent,
    DistributorAddEditComponent,
    DistributorDetailComponent,
    ProductInventoryListComponent,
    ProductInventoryAddEditComponent,
    ProductInventoryDetailComponent,
    ProductInventoryEditComponent,
    DistributorProfileComponent,
    DistributorVendorListComponent,
    DistributorVendorAddEditComponent,
    DistributorVendorDetailComponent,
    AdminUserProfileComponent,
    EarningListComponent,
    EarningDetailComponent,
    SuperNotificationListComponent,
    SuperNotificationAddComponent,
    BulkUploadComponent,
    VendorNotificationListComponent,
    VendorAddNotificationComponent,
    GenerateImageLinkComponent,
    VendorBulkUploadComponent,
    InventoryBulkComponent,
    AppInfoComponent,
    VendorSettingComponent,
    CustomerListComponent,
    AreaListComponent,
    AddEditAreaComponent,
    CustomerDetailComponent,
    DairyTopUpListComponent,
    DeliveryManListComponent,
    AddEditDeliveryManComponent,
    DeliveyManDetailComponent,
    SubscriptionListComponent,
    SubscriptionDetailComponent,
    DeliveryManOrderDetailComponent,
    MembershipSuccessComponent,
    MembershipErrorComponent,
    AddEditCustomerComponent,
    OfflineCostumerListComponent,
    OfflineCustomerDetailComponent,
    AdditionListComponent,
    AdditionDetailComponent
  ],

  imports: [
    CommonModule,
    HomeRoutingModule,
    NgMultiSelectDropDownModule,
    TimepickerModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    QRCodeModule,
    AngularEditorModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBgLMQ8wvy5yda0qP1_8y1e_aJJ_HrTdZw',
      libraries: ['places']
    })
  ],
  providers: []
})
export class HomeModule { }
