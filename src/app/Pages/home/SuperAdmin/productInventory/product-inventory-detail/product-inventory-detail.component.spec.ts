import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInventoryDetailComponent } from './product-inventory-detail.component';

describe('ProductInventoryDetailComponent', () => {
  let component: ProductInventoryDetailComponent;
  let fixture: ComponentFixture<ProductInventoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInventoryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInventoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
