import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAreaComponent } from './add-edit-area.component';

describe('AddEditAreaComponent', () => {
  let component: AddEditAreaComponent;
  let fixture: ComponentFixture<AddEditAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
