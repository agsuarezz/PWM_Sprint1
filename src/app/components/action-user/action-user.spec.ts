import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionUser } from './action-user';

describe('ActionUser', () => {
  let component: ActionUser;
  let fixture: ComponentFixture<ActionUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionUser],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
