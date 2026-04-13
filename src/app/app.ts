import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Importamos nuestras nuevas piezas:
import { ActionUserComponent } from './components/action-user/action-user';
import { BalanceCardComponent } from './components/balance-card/balance-card';
import { BenefitComponent } from './components/benefit/benefit';
import { ButtonComponent } from './components/button/button';
@Component({
  selector: 'app-root',
  standalone: true,
  // ¡OJO AQUÍ! Hay que meterlos en el array de imports para poder usarlos en el HTML
  imports: [RouterOutlet, ActionUserComponent, BalanceCardComponent, BenefitComponent, ButtonComponent], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'banco-imperium';
}
