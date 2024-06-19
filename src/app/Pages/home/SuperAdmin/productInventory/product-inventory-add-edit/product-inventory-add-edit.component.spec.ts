import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInventoryAddEditComponent } from './product-inventory-add-edit.component';

describe('ProductInventoryAddEditComponent', () => {
  let component: ProductInventoryAddEditComponent;
  let fixture: ComponentFixture<ProductInventoryAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInventoryAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInventoryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
