import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineCostumerListComponent } from './offline-costumer-list.component';

describe('OfflineCostumerListComponent', () => {
  let component: OfflineCostumerListComponent;
  let fixture: ComponentFixture<OfflineCostumerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineCostumerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineCostumerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
