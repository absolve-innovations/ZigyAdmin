import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBulkUploadComponent } from './vendor-bulk-upload.component';

describe('VendorBulkUploadComponent', () => {
  let component: VendorBulkUploadComponent;
  let fixture: ComponentFixture<VendorBulkUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorBulkUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBulkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
