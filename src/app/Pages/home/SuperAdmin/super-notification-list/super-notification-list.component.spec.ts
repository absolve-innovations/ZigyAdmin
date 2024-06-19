import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperNotificationListComponent } from './super-notification-list.component';

describe('SuperNotificationListComponent', () => {
  let component: SuperNotificationListComponent;
  let fixture: ComponentFixture<SuperNotificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperNotificationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
