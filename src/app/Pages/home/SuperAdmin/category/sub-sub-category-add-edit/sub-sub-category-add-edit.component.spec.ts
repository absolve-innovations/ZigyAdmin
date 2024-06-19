import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubCategoryAddEditComponent } from './sub-sub-category-add-edit.component';

describe('SubSubCategoryAddEditComponent', () => {
  let component: SubSubCategoryAddEditComponent;
  let fixture: ComponentFixture<SubSubCategoryAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubSubCategoryAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSubCategoryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
