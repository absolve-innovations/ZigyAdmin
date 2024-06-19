import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorUpiDetailComponent } from './vendor-upi-detail.component';

describe('VendorUpiDetailComponent', () => {
  let component: VendorUpiDetailComponent;
  let fixture: ComponentFixture<VendorUpiDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorUpiDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorUpiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
