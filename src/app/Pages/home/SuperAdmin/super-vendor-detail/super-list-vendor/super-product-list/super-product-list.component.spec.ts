import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperProductListComponent } from './super-product-list.component';

describe('SuperProductListComponent', () => {
  let component: SuperProductListComponent;
  let fixture: ComponentFixture<SuperProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
