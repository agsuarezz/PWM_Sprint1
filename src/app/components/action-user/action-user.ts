import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-action-user',
  standalone: true,
  imports: [RouterModule], // Soluciona el error del routerLink
  templateUrl: './action-user.html',
  styleUrls: ['./action-user.css']
})
export class ActionUserComponent {
  // Estos @Input permiten que el componente reciba la info desde fuera
  @Input() href: string = '#';
  @Input() icon: string = '';
  @Input() label: string = '';
}