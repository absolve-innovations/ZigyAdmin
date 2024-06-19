import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDeliveryManComponent } from './add-edit-delivery-man.component';

describe('AddEditDeliveryManComponent', () => {
  let component: AddEditDeliveryManComponent;
  let fixture: ComponentFixture<AddEditDeliveryManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDeliveryManComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDeliveryManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
