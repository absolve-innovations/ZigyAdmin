import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorNotificationListComponent } from './vendor-notification-list.component';

describe('VendorNotificationListComponent', () => {
  let component: VendorNotificationListComponent;
  let fixture: ComponentFixture<VendorNotificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorNotificationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
