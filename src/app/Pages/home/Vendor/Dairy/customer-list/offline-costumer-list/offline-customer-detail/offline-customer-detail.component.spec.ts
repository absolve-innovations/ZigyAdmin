import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineCustomerDetailComponent } from './offline-customer-detail.component';

describe('OfflineCustomerDetailComponent', () => {
  let component: OfflineCustomerDetailComponent;
  let fixture: ComponentFixture<OfflineCustomerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineCustomerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
