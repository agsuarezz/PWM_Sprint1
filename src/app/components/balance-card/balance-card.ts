import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-balance-card',
  standalone: true,
  templateUrl: './balance-card.html',
  styleUrls: ['./balance-card.css']
})
export class BalanceCardComponent {
  @Input() label: string = 'Saldo disponible';
  @Input() amount: string = '0,00 €'; // Valores por defecto por si fallan los datos
}