import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos el ButtonComponent para que la etiqueta <app-button> funcione
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-profile-field-text',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent // Esto soluciona el error NG8001: 'app-button' is not a known element
  ],
  templateUrl: './profile-field-text.html',
  styleUrls: ['./profile-field-text.css']
})
export class ProfileFieldTextComponent {
  // Estos Inputs permiten recibir el título (ej: "Nombre") y el valor (ej: "Juan Pérez")
  @Input() labeltitle: string = '';
  @Input() uservalue: string = '';
}