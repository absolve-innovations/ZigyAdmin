import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryBulkComponent } from './inventory-bulk.component';

describe('InventoryBulkComponent', () => {
  let component: InventoryBulkComponent;
  let fixture: ComponentFixture<InventoryBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryBulkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
