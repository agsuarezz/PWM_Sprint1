import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // 1. Importa esto

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule], // 2. Añádelo aquí
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})
export class NavComponent {}