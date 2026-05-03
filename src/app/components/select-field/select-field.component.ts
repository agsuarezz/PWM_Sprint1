import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectOption } from '../../models';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="form-group">
      <label [for]="fieldId">{{ labelName }}</label>
      <select
        [id]="fieldId"
        [name]="fieldId"
        [ngModel]="value"
        (ngModelChange)="valueChange.emit($event)"
        [ngModelOptions]="{ standalone: true }"
        [required]="isRequired">
        <option value="">{{ placeholder }}</option>
        @for (opt of options; track opt.value) {
          <option [value]="opt.value">{{ opt.label }}</option>
        }
      </select>
    </div>
  `
})
export class SelectFieldComponent {
  @Input() fieldId: string = 'select';
  @Input() labelName: string = 'Etiqueta';
  @Input() placeholder: string = 'Selecciona una opción';
  @Input() options: SelectOption[] = [];
  @Input() value: string = '';
  @Input() isRequired: boolean = false;

  @Output() valueChange = new EventEmitter<string>();
}
