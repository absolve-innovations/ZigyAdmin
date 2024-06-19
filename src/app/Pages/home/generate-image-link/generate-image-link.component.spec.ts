import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateImageLinkComponent } from './generate-image-link.component';

describe('GenerateImageLinkComponent', () => {
  let component: GenerateImageLinkComponent;
  let fixture: ComponentFixture<GenerateImageLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateImageLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateImageLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
