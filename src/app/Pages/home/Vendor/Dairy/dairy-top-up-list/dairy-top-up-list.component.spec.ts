import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DairyTopUpListComponent } from './dairy-top-up-list.component';

describe('DairyTopUpListComponent', () => {
  let component: DairyTopUpListComponent;
  let fixture: ComponentFixture<DairyTopUpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DairyTopUpListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DairyTopUpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
