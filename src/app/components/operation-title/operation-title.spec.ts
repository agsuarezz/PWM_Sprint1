import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTitle } from './operation-title';

describe('OperationTitle', () => {
  let component: OperationTitle;
  let fixture: ComponentFixture<OperationTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(OperationTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
