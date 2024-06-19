import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAddUserAdminComponent } from './super-add-user-admin.component';

describe('SuperAddUserAdminComponent', () => {
  let component: SuperAddUserAdminComponent;
  let fixture: ComponentFixture<SuperAddUserAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAddUserAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAddUserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
