import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-balance-card',
  standalone: true,
  template: `
    <div class="balance-card">
      <div class="balance-content">
        <span class="balance-label">{{ label }}</span>
        <h2 class="balance-amount">{{ amount }}</h2>
      </div>
    </div>
  `
})
export class BalanceCardComponent {
  @Input() label: string = 'Dinero disponible';
  @Input() amount: string = '0,00 €';
}
