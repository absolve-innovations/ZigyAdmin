import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorVendorAddEditComponent } from './distributor-vendor-add-edit.component';

describe('DistributorVendorAddEditComponent', () => {
  let component: DistributorVendorAddEditComponent;
  let fixture: ComponentFixture<DistributorVendorAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorVendorAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorVendorAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
