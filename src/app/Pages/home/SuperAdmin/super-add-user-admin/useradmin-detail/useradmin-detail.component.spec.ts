import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseradminDetailComponent } from './useradmin-detail.component';

describe('UseradminDetailComponent', () => {
  let component: UseradminDetailComponent;
  let fixture: ComponentFixture<UseradminDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseradminDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseradminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
