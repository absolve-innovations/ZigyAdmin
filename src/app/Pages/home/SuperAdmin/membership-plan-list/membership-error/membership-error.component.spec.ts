import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipErrorComponent } from './membership-error.component';

describe('MembershipErrorComponent', () => {
  let component: MembershipErrorComponent;
  let fixture: ComponentFixture<MembershipErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
