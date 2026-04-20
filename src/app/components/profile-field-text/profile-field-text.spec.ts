import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFieldText } from './profile-field-text';

describe('ProfileFieldText', () => {
  let component: ProfileFieldText;
  let fixture: ComponentFixture<ProfileFieldText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFieldText],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileFieldText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
