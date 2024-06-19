import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSettingComponent } from './vendor-setting.component';

describe('VendorSettingComponent', () => {
  let component: VendorSettingComponent;
  let fixture: ComponentFixture<VendorSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
