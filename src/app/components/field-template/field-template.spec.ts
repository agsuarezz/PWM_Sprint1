import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTemplate } from './field-template';

describe('FieldTemplate', () => {
  let component: FieldTemplate;
  let fixture: ComponentFixture<FieldTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldTemplate],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldTemplate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
