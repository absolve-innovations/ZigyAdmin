import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserDashboardComponent } from './admin-user-dashboard.component';

describe('AdminUserDashboardComponent', () => {
  let component: AdminUserDashboardComponent;
  let fixture: ComponentFixture<AdminUserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
