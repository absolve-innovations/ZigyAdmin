import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCollectionComponent } from './add-edit-collection.component';

describe('AddEditCollectionComponent', () => {
  let component: AddEditCollectionComponent;
  let fixture: ComponentFixture<AddEditCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
