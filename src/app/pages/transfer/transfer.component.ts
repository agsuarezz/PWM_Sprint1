import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { OperacionesService } from '../../core/services/operaciones.service';
import { ContentService } from '../../core/services/content.service';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { TransferFormCardComponent } from '../../components/transfer-form-card/transfer-form-card.component';
import { Usuario } from '../../models';

@Component({
  selector: 'app-transfer',
  standalone: true,
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
  imports: [FormsModule, HeaderProfileComponent, FooterComponent, FormFieldComponent, TransferFormCardComponent],
})
export class TransferComponent implements OnInit, OnDestroy {
  private auth = inject(AuthService);
  private ops = inject(OperacionesService);
  private router = inject(Router);
  private contentService = inject(ContentService);

  ui: any = null;
  form = { nombre: '', iban: '', importe: undefined as number | undefined, concepto: '' };
  usuario: Usuario | null = null;
  private sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.auth.usuario$.subscribe((u: Usuario | null) => this.usuario = u);
    this.contentService.obtener<any>('transfer').subscribe((d: any) => this.ui = d);
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
  limpiar(): void { this.form = { nombre: '', iban: '', importe: undefined, concepto: '' }; }

  async onSubmit(): Promise<void> {
    if (!this.usuario) return;

    const importe = Number(this.form.importe) || 0;
    const nuevoSaldo = (this.usuario.saldo ?? 0) - importe;

    await this.ops.guardarMovimiento({
      usuarioId: this.usuario.uid,
      importe: -importe,
      tipo: 'Transferencia',
      concepto: 'Transferencia enviada'
    });

    await this.auth.actualizarSaldo(this.usuario.uid, nuevoSaldo);
  }
}