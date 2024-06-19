import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperVendorDetailComponent } from './super-vendor-detail.component';

describe('SuperVendorDetailComponent', () => {
  let component: SuperVendorDetailComponent;
  let fixture: ComponentFixture<SuperVendorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperVendorDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperVendorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
