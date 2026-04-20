import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-template',
  templateUrl: './field-template.html',
  styleUrls: ['./field-template.css']
})
export class FieldTemplateComponent {
  @Input() fieldId: string = 'default-id';
  @Input() labelName: string = 'Etiqueta';
  @Input() fieldType: string = 'text';
  @Input() phText: string = '';
  @Input() valText: string = '';
  @Input() isRequired: boolean = false;
}