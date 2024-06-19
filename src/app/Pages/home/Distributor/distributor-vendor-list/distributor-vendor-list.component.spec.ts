import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorVendorListComponent } from './distributor-vendor-list.component';

describe('DistributorVendorListComponent', () => {
  let component: DistributorVendorListComponent;
  let fixture: ComponentFixture<DistributorVendorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorVendorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorVendorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
