import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyMoves } from './money-moves';

describe('MoneyMoves', () => {
  let component: MoneyMoves;
  let fixture: ComponentFixture<MoneyMoves>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyMoves],
    }).compileComponents();

    fixture = TestBed.createComponent(MoneyMoves);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
