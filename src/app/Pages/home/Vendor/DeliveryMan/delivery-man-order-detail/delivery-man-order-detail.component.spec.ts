import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryManOrderDetailComponent } from './delivery-man-order-detail.component';

describe('DeliveryManOrderDetailComponent', () => {
  let component: DeliveryManOrderDetailComponent;
  let fixture: ComponentFixture<DeliveryManOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryManOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryManOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
