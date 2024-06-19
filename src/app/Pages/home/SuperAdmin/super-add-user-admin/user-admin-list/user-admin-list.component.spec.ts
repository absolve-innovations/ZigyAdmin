import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminListComponent } from './user-admin-list.component';

describe('UserAdminListComponent', () => {
  let component: UserAdminListComponent;
  let fixture: ComponentFixture<UserAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAdminListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
