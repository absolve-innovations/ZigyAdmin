import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveyManDetailComponent } from './delivey-man-detail.component';

describe('DeliveyManDetailComponent', () => {
  let component: DeliveyManDetailComponent;
  let fixture: ComponentFixture<DeliveyManDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveyManDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveyManDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
