import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBannerDetailComponent } from './shop-banner-detail.component';

describe('ShopBannerDetailComponent', () => {
  let component: ShopBannerDetailComponent;
  let fixture: ComponentFixture<ShopBannerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopBannerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBannerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
