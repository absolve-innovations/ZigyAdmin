import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperListVendorComponent } from './super-list-vendor.component';

describe('SuperListVendorComponent', () => {
  let component: SuperListVendorComponent;
  let fixture: ComponentFixture<SuperListVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperListVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperListVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
