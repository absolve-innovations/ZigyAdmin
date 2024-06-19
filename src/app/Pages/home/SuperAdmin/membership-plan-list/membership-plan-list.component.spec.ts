import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPlanListComponent } from './membership-plan-list.component';

describe('MembershipPlanListComponent', () => {
  let component: MembershipPlanListComponent;
  let fixture: ComponentFixture<MembershipPlanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipPlanListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
