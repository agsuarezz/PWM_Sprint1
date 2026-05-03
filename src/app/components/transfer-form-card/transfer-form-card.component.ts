import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transfer-form-card',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <main class="transfer-page-wrapper">
      <div class="transfer-card">
        <form (ngSubmit)="submitted.emit()">
          <div class="transfer-body">
            <h2 class="transfer-title">{{ title }}</h2>
            <ng-content></ng-content>
          </div>
          <div class="transfer-footer">
            <div class="footer-left">
              <button type="button" class="btn-primary" (click)="cleared.emit()">Borrar</button>
            </div>
            <div class="footer-right">
              <a [routerLink]="cancelLink" class="btn-primary">Cancelar</a>
              <button type="submit" class="btn-primary">{{ submitLabel }}</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  `
})
export class TransferFormCardComponent {
  @Input() title: string = '';
  @Input() submitLabel: string = 'Enviar';
  @Input() cancelLink: string = '/movimientos';

  @Output() submitted = new EventEmitter<void>();
  @Output() cleared = new EventEmitter<void>();
}
