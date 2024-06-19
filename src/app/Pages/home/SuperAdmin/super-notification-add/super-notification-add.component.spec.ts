import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperNotificationAddComponent } from './super-notification-add.component';

describe('SuperNotificationAddComponent', () => {
  let component: SuperNotificationAddComponent;
  let fixture: ComponentFixture<SuperNotificationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperNotificationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperNotificationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
