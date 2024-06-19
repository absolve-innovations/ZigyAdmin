import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPlanComponent } from './add-edit-plan.component';

describe('AddEditPlanComponent', () => {
  let component: AddEditPlanComponent;
  let fixture: ComponentFixture<AddEditPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
