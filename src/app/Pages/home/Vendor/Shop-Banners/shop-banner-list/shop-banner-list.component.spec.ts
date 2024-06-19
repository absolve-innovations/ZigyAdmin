import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBannerListComponent } from './shop-banner-list.component';

describe('ShopBannerListComponent', () => {
  let component: ShopBannerListComponent;
  let fixture: ComponentFixture<ShopBannerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopBannerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
