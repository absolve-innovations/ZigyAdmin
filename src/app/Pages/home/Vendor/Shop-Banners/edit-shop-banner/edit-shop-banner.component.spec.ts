import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShopBannerComponent } from './edit-shop-banner.component';

describe('EditShopBannerComponent', () => {
  let component: EditShopBannerComponent;
  let fixture: ComponentFixture<EditShopBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditShopBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShopBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
