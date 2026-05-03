import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tabs-nav',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="dashboard__tabs">
      <nav class="tabs">
        <a routerLink="/movimientos" class="tabs__tab" [class.tabs__tab--active]="activeTab === 'movimientos'" [attr.aria-current]="activeTab === 'movimientos' ? 'page' : null">
          <span class="tabs__icon">★</span>
          <span class="tabs__text">Movimientos</span>
        </a>
        <a routerLink="/tarjetas" class="tabs__tab" [class.tabs__tab--active]="activeTab === 'tarjetas'" [attr.aria-current]="activeTab === 'tarjetas' ? 'page' : null">
          <span class="tabs__icon">★</span>
          <span class="tabs__text">Tarjetas</span>
        </a>
      </nav>
    </div>
  `
})
export class TabsNavComponent {
  /** 'movimientos' | 'tarjetas' */
  @Input() activeTab: string = 'movimientos';
}
