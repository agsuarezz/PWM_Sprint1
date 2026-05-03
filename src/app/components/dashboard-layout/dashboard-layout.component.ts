import { Component, Input } from '@angular/core';
import { BalanceCardComponent } from '../balance-card/balance-card.component';
import { ActionUserComponent } from '../action-user/action-user.component';
import { TabsNavComponent } from '../tabs-nav/tabs-nav.component';
import { DashboardAction } from '../../models';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [BalanceCardComponent, ActionUserComponent, TabsNavComponent],
  template: `
    <main class="dashboard">

      <section class="dashboard__balance">
        <app-balance-card [label]="balanceLabel" [amount]="balanceAmount"></app-balance-card>
      </section>

      <hr class="dashboard__divider">

      <section class="dashboard__actions">
        @for (action of actions; track action.label) {
          <app-action-user
            [link]="action.link"
            [icon]="action.icon"
            [label]="action.label">
          </app-action-user>
        }
      </section>

      <section class="dashboard__content">
        <app-tabs-nav [activeTab]="activeTab"></app-tabs-nav>
        <ng-content></ng-content>
      </section>

    </main>
  `
})
export class DashboardLayoutComponent {
  @Input() balanceLabel: string = 'Dinero disponible';
  @Input() balanceAmount: string = '0,00 €';
  @Input() actions: DashboardAction[] = [];
  @Input() activeTab: string = 'movimientos';
}
