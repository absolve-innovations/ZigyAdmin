import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAddNotificationComponent } from './vendor-add-notification.component';

describe('VendorAddNotificationComponent', () => {
  let component: VendorAddNotificationComponent;
  let fixture: ComponentFixture<VendorAddNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorAddNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAddNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
