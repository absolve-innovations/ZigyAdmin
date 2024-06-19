import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningDetailComponent } from './earning-detail.component';

describe('EarningDetailComponent', () => {
  let component: EarningDetailComponent;
  let fixture: ComponentFixture<EarningDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
