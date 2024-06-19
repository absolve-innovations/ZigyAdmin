import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorVendorDetailComponent } from './distributor-vendor-detail.component';

describe('DistributorVendorDetailComponent', () => {
  let component: DistributorVendorDetailComponent;
  let fixture: ComponentFixture<DistributorVendorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorVendorDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorVendorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
