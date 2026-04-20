import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAccounts } from './nav-accounts';

describe('NavAccounts', () => {
  let component: NavAccounts;
  let fixture: ComponentFixture<NavAccounts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavAccounts],
    }).compileComponents();

    fixture = TestBed.createComponent(NavAccounts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
