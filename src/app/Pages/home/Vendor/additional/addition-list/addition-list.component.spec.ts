import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionListComponent } from './addition-list.component';

describe('AdditionListComponent', () => {
  let component: AdditionListComponent;
  let fixture: ComponentFixture<AdditionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
