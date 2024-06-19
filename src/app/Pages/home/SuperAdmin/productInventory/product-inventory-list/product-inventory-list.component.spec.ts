import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInventoryListComponent } from './product-inventory-list.component';

describe('ProductInventoryListComponent', () => {
  let component: ProductInventoryListComponent;
  let fixture: ComponentFixture<ProductInventoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInventoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
