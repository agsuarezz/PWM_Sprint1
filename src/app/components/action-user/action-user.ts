import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-action-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './action-user.html',
  styleUrls: ['./action-user.css'] // Pega el CSS de este bloque aquí
})
export class ActionUserComponent {
  // Con @Input() le decimos a Angular: "Estos datos me los pasará mi padre"
  @Input() href: string = ''; 
  @Input() icon: string = '';
  @Input() label: string = '';
}