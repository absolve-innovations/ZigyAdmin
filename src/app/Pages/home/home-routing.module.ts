import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/layouts/layout/layout.component';
import { AuthGuard } from 'src/app/Shared/auth.guard';
import { DashboardComponent } from './SuperAdmin/dashboard.component';

import { SuperAddVendorComponent } from './SuperAdmin/super-add-vendor/super-add-vendor.component';

import { AdminUserDashboardComponent } from './AdminUser/admin-user-dashboard/admin-user-dashboard.component';
import { VendorDashboardComponent } from './Vendor/vendor-dashboard/vendor-dashboard.component';
import { ProductComponent } from './Vendor/product/product.component';
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
import { SuperProductListComponent } from './SuperAdmin/super-vendor-detail/super-list-vendor/super-product-list/super-product-list.component';
import { AddEditBannerComponent } from './SuperAdmin/Banners/add-edit-banner/add-edit-banner.component';
import { BannerListComponent } from './SuperAdmin/Banners/banner-list/banner-list.component';
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
import { OrdersListComponent } from './Vendor/orders/orders-list/orders-list.component';
import { ProductDetailComponent } from './Vendor/product/product-detail/product-detail.component';
import { OrderDetailComponent } from './Vendor/orders/order-detail/order-detail.component';
import { OrderProductDetailComponent } from './Vendor/orders/order-product-detail/order-product-detail.component';
import { EditProductComponent } from './Vendor/edit-product/edit-product.component';
import { VendorProfileComponent } from './Vendor/vendor-profile/vendor-profile.component';
import { VendorUpiDetailComponent } from './SuperAdmin/super-vendor-detail/vendor-upi-detail/vendor-upi-detail.component';
import { SubSubCategoryAddEditComponent } from './SuperAdmin/category/sub-sub-category-add-edit/sub-sub-category-add-edit.component';
import { SubSubCategoryComponent } from './SuperAdmin/category/sub-sub-category/sub-sub-category.component';
import { MembershipPlanListComponent } from './SuperAdmin/membership-plan-list/membership-plan-list.component';
import { PlanListComponent } from './SuperAdmin/plans/plan-list/plan-list.component';
import { AddEditPlanComponent } from './SuperAdmin/plans/add-edit-plan/add-edit-plan.component';
import { PlanDetailComponent } from './SuperAdmin/plans/plan-detail/plan-detail.component';
import { SuperAdminProfileComponent } from './SuperAdmin/super-admin-profile/super-admin-profile.component';
import { DistributorListComponent } from './SuperAdmin/Distributor/distributor-list/distributor-list.component';
import { DistributorAddEditComponent } from './SuperAdmin/Distributor/distributor-add-edit/distributor-add-edit.component';
import { DistributorDetailComponent } from './SuperAdmin/Distributor/distributor-detail/distributor-detail.component';
import { ProductInventoryListComponent } from './SuperAdmin/productInventory/product-inventory-list/product-inventory-list.component';
import { ProductInventoryAddEditComponent } from './SuperAdmin/productInventory/product-inventory-add-edit/product-inventory-add-edit.component';
import { ProductInventoryDetailComponent } from './SuperAdmin/productInventory/product-inventory-detail/product-inventory-detail.component';
import { DistributorVendorAddEditComponent } from './Distributor/distributor-vendor-add-edit/distributor-vendor-add-edit.component';
import { DistributorVendorDetailComponent } from './Distributor/distributor-vendor-detail/distributor-vendor-detail.component';
import { DistributorVendorListComponent } from './Distributor/distributor-vendor-list/distributor-vendor-list.component';
import { DistributorProfileComponent } from './Distributor/distributor-profile/distributor-profile.component';
import { ProductInventoryEditComponent } from './SuperAdmin/productInventory/product-inventory-edit/product-inventory-edit.component';
import { AdminUserProfileComponent } from './AdminUser/admin-user-profile/admin-user-profile.component';
import { EarningListComponent } from './Distributor/earning/earning-list/earning-list.component';
import { EarningDetailComponent } from './Distributor/earning/earning-detail/earning-detail.component';
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
import { AreaListComponent } from './Vendor/Dairy/area-list/area-list.component';
import { AddEditAreaComponent } from './Vendor/Dairy/add-edit-area/add-edit-area.component';
import { CustomerListComponent } from './Vendor/Dairy/customer-list/customer-list.component';
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
import { AddEditCustomerComponent } from './Vendor/Dairy/customer-list/add-edit-customer/add-edit-customer.component';
import { OfflineCostumerListComponent } from './Vendor/Dairy/customer-list/offline-costumer-list/offline-costumer-list.component';
import { OfflineCustomerDetailComponent } from './Vendor/Dairy/customer-list/offline-costumer-list/offline-customer-detail/offline-customer-detail.component';
import { AdditionListComponent } from './Vendor/additional/addition-list/addition-list.component';
import { AdditionDetailComponent } from './Vendor/additional/addition-detail/addition-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [

      /** Super admin Routing **/
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user-admin-list', component: UserAdminListComponent},
      { path: 'user-admin-list/add-user-admin', component: SuperAddUserAdminComponent},
      { path: 'user-admin-list/user-admin-detail/:id', component: UseradminDetailComponent},
      { path: 'distributor-list', component:DistributorListComponent},
      { path: 'distributor-list/distributor-add-edit', component: DistributorAddEditComponent},
      { path: 'distributor-list/distributor-detail/:id', component:DistributorDetailComponent},
      { path: 'super-vendor-list', component: SuperListVendorComponent},
      { path: 'super-vendor-list/super-add-vendor/:id', component: SuperAddVendorComponent},
      { path: 'super-vendor-list/super-add-vendor', component: SuperAddVendorComponent},
      { path: 'super-vendor-list/super-vendor-detail/:id/:id2', component: SuperVendorDetailComponent},
      { path: 'super-vendor-list/super-vendor-detail/upi-detail',component: VendorUpiDetailComponent},
      { path: 'super-vendor-list/super-vendor-detail/product-list', component: SuperProductListComponent},
      { path: 'super-vendor-list/product-list/add-product', component: AddProductComponent},
      { path: 'super-vendor-list/product-list/bulk-upload', component:BulkUploadComponent},
      { path: 'super-vendor-list/product-list/product-detail', component: ProductDetailComponent},
      { path: 'super-vendor-list/product-list/edit-product', component: EditProductComponent},
      { path: 'category-list', component: CategoryListComponent},
      { path: 'category-list/add-edit-category', component:CategoryAddEditComponent},
      { path: 'category-list/sub-category/:id', component:SubCategoryComponent},
      { path: 'category-list/sub-category/Sub-add-edit/:id/:id2', component:SubcategoryAddEditComponent},
      { path: 'category-list/sub-category/Sub-add/:id2', component:SubcategoryAddEditComponent},
      { path: 'category-list/sub-sub-category/:id', component:SubSubCategoryComponent},
      { path: 'category-list/sub-sub-category-add/:id',component:SubSubCategoryAddEditComponent},
      { path: 'category-list/sub-sub-category-add-edit/:id/:id2',component:SubSubCategoryAddEditComponent},
      { path: 'brand-list', component:BrandListComponent},
      { path: 'brand-list/brand-add-edit', component:BrandAddEditComponent},
      { path: 'banner-list', component: BannerListComponent},
      { path: 'banner-list/add-edit-banner', component: AddEditBannerComponent},
      { path: 'banner-list/banner-detail/:id', component: BannerDetailComponent},
      { path: 'super-vendor-list/membership-plan-list', component: MembershipPlanListComponent},
      { path: 'membership-plan-list', component: MembershipPlanListComponent},
      { path: 'membership-success', component:MembershipSuccessComponent},
      { path: 'membership-error', component: MembershipErrorComponent},
      { path: 'plan-list',component: PlanListComponent},
      { path: 'plan-list/add-edit-plan',component: AddEditPlanComponent},
      { path: 'plan-list/plan-detail/:id',component: PlanDetailComponent},
      { path: 'super-admin-Profile', component: SuperAdminProfileComponent},

      /** Admin User Routing **/
      { path: 'admin-user-dashboard', component: AdminUserDashboardComponent },
      { path: 'update-profile',component: AdminUserProfileComponent},
      // { path: 'User-add-vendor', component: AddVendorUserComponent },

      /** Vendor Routing  **/
      { path: 'orders-list', component: OrdersListComponent},
      { path: 'orders-list/order-detail/:id',component:OrderDetailComponent},
      { path: 'orders-list/product-detail', component:OrderProductDetailComponent},
      { path: 'vendor-products-list', component: SuperProductListComponent},
      { path: 'vendor-products-list/add-product', component: AddProductComponent},
      { path: 'vendor-products-list/vendor-bulk-upload', component:VendorBulkUploadComponent},
      { path: 'vendor-products-list/product-detail',component: ProductDetailComponent},
      { path: 'vendor-products-list/edit-product', component: EditProductComponent},
      { path: 'shop-banner-list', component: ShopBannerListComponent},
      { path: 'shop-banner-list/add-edit-banner', component: AddEditShopBannerComponent},
      { path: 'shop-banner-list/shop-banner-detail/:id', component: ShopBannerDetailComponent},
      { path: 'shop-banner-list/edit-banner/:id/:id2', component:EditShopBannerComponent},
      { path: 'collection-list', component: CollectionListComponent},
      { path: 'collection-list/collection-add-edit', component : AddEditCollectionComponent},
      { path: 'collection-list/collection-detail/:id', component : CollectionDetailComponent},
      { path: 'coupan-list', component: CouponsComponent},
      { path: 'coupan-list/coupan-add-edit', component: AddEditCoupansComponent},   
      { path: 'vendor-profile', component:VendorProfileComponent},
      { path: 'product-list-inventory', component:ProductInventoryListComponent},
      { path: 'product-list-inventory/add',component: ProductInventoryAddEditComponent},
      { path: 'product-list-inventory/detail/:id', component: ProductInventoryDetailComponent},
      { path: 'product-list-inventory/edit/:id', component:ProductInventoryEditComponent},
      { path: 'onLine-customer-list',component:CustomerListComponent},
      { path: 'onLine-customer-list/customer-detail/:id/:id2',component:CustomerDetailComponent},
      { path: 'additional-list',component:AdditionListComponent},
      { path: 'additional-list/detail/:id:', component:AdditionDetailComponent},
      { path: 'vendor/setting/offline-costumer-list', component: OfflineCostumerListComponent},
      { path: 'vendor/setting/offline-costumer-list/detail/:id', component:OfflineCustomerDetailComponent},

     /** Distributor **/  

      { path: 'distributor-vendor-list', component: DistributorVendorListComponent},
      { path: 'distributor-profile', component: DistributorProfileComponent},
      { path: 'distributor-vendor-list/add/:id', component: DistributorVendorAddEditComponent},
      { path: 'distributor-vendor-list/edit', component: DistributorVendorAddEditComponent},
      { path: 'distributor-vendor-list/detail/:id/:id2', component: DistributorVendorDetailComponent},
      { path: 'earning-list', component: EarningListComponent},
      { path: 'earning-list/earning-detail', component:EarningDetailComponent},
      { path: 'super-notification-list', component:SuperNotificationListComponent},
      { path: 'super-notification-list/add', component:SuperNotificationAddComponent},
      { path: 'vendor-notification-list', component:VendorNotificationListComponent},
      { path: 'vendor-notification-list/add', component:VendorAddNotificationComponent},

      /*** Bulk ***/
      { path: 'bulk-upload',component:BulkUploadComponent},
      { path: 'generate-link', component:GenerateImageLinkComponent},
      { path: 'vendor-bulk-upload', component:VendorBulkUploadComponent},
      { path: 'product-list-inventory/inventory-bulk', component: InventoryBulkComponent},
      { path: 'vendor/setting/appinfo',component: AppInfoComponent},
     
      // Dairy
      { path: 'vendor/setting/area-list', component: AreaListComponent},
      { path: 'vendor/setting/area-list/add-area', component: AddEditAreaComponent},
      { path: 'vendor/setting/appinfo',component: AppInfoComponent},
      { path: 'vendor/setting/customer-list',component:CustomerListComponent},
      { path: 'vendor/setting/customer-list/add-edit-customer',component:AddEditCustomerComponent},
      { path: 'vendor/setting/offline-costumer-list/add-edit-customer',component:AddEditCustomerComponent},
      { path: 'vendor/setting/customer-list/customer-detail/:id/:id2',component:CustomerDetailComponent},
      { path: 'vendor/setting/dairy-topup-list',component:DairyTopUpListComponent},
      { path: 'vendor/setting/delivery-man-list',component:DeliveryManListComponent},
      { path: 'vendor/setting/delivery-man-list/add-edit-delivery-man',component:AddEditDeliveryManComponent},
      { path: 'vendor/setting/delivery-man-list/deliver-man-detail',component:DeliveryManOrderDetailComponent},
      { path: 'vendor/setting/delivery-man-list/detail/:id',component:DeliveyManDetailComponent},
      { path: 'vendor/setting/subscription-list', component:SubscriptionListComponent},
      { path: 'vendor/setting/subscription-list/detail/:id', component:SubscriptionDetailComponent},


      ///extra// form vendor
      { path: 'vendor-dashboard', component: VendorDashboardComponent},
      { path: 'vendor-product-list', component: ProductComponent},
      { path: 'add-product', component: AddProductComponent},
      { path: 'edit-product/:id/:id2', component: EditProductComponent},
      { path: 'vendor-products-list', component: SuperProductListComponent},
      { path: 'product-detail',component: ProductDetailComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
