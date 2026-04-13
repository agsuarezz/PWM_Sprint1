import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-submit',
  templateUrl: './button-submit.html',
  styleUrls: ['./button-submit.css']
})
export class ButtonSubmitComponent {
  // Estos son los datos que le "pasaremos" desde fuera
  @Input() btnId: string = 'submit-btn';
  @Input() text: string = 'Enviar';
}