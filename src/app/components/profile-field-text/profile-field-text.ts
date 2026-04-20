import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-field-text',
  templateUrl: './profile-field-text.html',
  styleUrls: ['./profile-field-text.css']
})
export class ProfileFieldTextComponent {
  @Input() labeltitle: string = 'Campo';
  @Input() uservalue: string = 'Valor del usuario';
}