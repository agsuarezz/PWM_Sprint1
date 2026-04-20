import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionCards } from './selection-cards';

describe('SelectionCards', () => {
  let component: SelectionCards;
  let fixture: ComponentFixture<SelectionCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionCards],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectionCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
