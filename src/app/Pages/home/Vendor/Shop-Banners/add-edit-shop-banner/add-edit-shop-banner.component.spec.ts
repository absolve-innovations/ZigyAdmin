import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditShopBannerComponent } from './add-edit-shop-banner.component';

describe('AddEditShopBannerComponent', () => {
  let component: AddEditShopBannerComponent;
  let fixture: ComponentFixture<AddEditShopBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditShopBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditShopBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
