import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAddVendorComponent } from './super-add-vendor.component';

describe('SuperAddVendorComponent', () => {
  let component: SuperAddVendorComponent;
  let fixture: ComponentFixture<SuperAddVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAddVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAddVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
