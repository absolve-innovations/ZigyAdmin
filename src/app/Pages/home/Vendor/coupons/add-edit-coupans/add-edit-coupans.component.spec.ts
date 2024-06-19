import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCoupansComponent } from './add-edit-coupans.component';

describe('AddEditCoupansComponent', () => {
  let component: AddEditCoupansComponent;
  let fixture: ComponentFixture<AddEditCoupansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCoupansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCoupansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
