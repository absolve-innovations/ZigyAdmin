import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionDetailComponent } from './addition-detail.component';

describe('AdditionDetailComponent', () => {
  let component: AdditionDetailComponent;
  let fixture: ComponentFixture<AdditionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
