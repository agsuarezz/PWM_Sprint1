import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileName } from './profile-name';

describe('ProfileName', () => {
  let component: ProfileName;
  let fixture: ComponentFixture<ProfileName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileName],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileName);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
