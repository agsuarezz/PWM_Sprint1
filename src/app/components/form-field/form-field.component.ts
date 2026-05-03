import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form-group">
      <label [for]="fieldId">{{ labelName }}</label>
      <input
        [type]="fieldType"
        [id]="fieldId"
        [name]="fieldId"
        [placeholder]="phText"
        [ngModel]="value"
        (ngModelChange)="valueChange.emit($event)"
        [ngModelOptions]="{ standalone: true }"
        [required]="isRequired"
        [attr.pattern]="pattern || null"
        [attr.title]="patternTitle || null"
        [attr.min]="min || null"
        [attr.max]="max || null"
        [attr.step]="step || null"
        [attr.minlength]="minlength || null">
    </div>
  `
})
export class FormFieldComponent {
  @Input() fieldId: string = 'field';
  @Input() labelName: string = 'Etiqueta';
  @Input() fieldType: string = 'text';
  @Input() phText: string = '';
  @Input() value: any = '';
  @Input() isRequired: boolean = false;
  @Input() pattern: string = '';
  @Input() patternTitle: string = '';
  @Input() min: string = '';
  @Input() max: string = '';
  @Input() step: string = '';
  @Input() minlength: string = '';

  @Output() valueChange = new EventEmitter<any>();
}
