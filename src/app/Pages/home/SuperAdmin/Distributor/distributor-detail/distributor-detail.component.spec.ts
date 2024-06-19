import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorDetailComponent } from './distributor-detail.component';

describe('DistributorDetailComponent', () => {
  let component: DistributorDetailComponent;
  let fixture: ComponentFixture<DistributorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
