import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryAddEditComponent } from './subcategory-add-edit.component';

describe('SubcategoryAddEditComponent', () => {
  let component: SubcategoryAddEditComponent;
  let fixture: ComponentFixture<SubcategoryAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
