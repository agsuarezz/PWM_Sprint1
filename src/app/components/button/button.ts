import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterModule], // Necesario para que funcione el routerLink
  templateUrl: './button.html',
  styleUrls: ['./button.css']
})
export class ButtonComponent {
  // Qué texto mostrará el botón
  @Input() text: string = 'Botón';

  // A dónde nos llevará al hacer clic (usará routerLink en el HTML)
  @Input() link: string = '#';
  
  // Puedes usar 'href' como alias de 'link' si prefieres mantener tu nombre original
  @Input() href: string = '';

  // Función que se ejecuta al inicializar el componente para decidir qué link usar
  ngOnInit() {
    // Si pasaron un 'href', lo usamos en lugar de 'link'
    if (this.href && this.link === '#') {
      this.link = this.href;
    }
  }
}