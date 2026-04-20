import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesImage } from './services-image';

describe('ServicesImage', () => {
  let component: ServicesImage;
  let fixture: ComponentFixture<ServicesImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesImage],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesImage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
