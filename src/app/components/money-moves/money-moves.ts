import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-money-moves',
  templateUrl: './money-moves.html',
  styleUrls: ['./money-moves.css']
})
export class MoneyMovesComponent {
  @Input() icon_src: string = '';
  @Input() icon_alt: string = 'Icono de movimiento';
  @Input() title: string = 'Movimiento';
  @Input() date: string = '01/01/2024';
  @Input() amount: string = '0,00 €';
  
  // 'income' (ingreso) o 'expense' (gasto). Esto cambiará el color por CSS.
  @Input() type: string = 'expense'; 
}