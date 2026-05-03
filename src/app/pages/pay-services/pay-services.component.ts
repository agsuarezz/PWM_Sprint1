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
  selector: 'app-pay-services',
  standalone: true,
  templateUrl: './pay-services.component.html',
  styleUrls: ['./pay-services.component.css'],
  imports: [FormsModule, HeaderProfileComponent, FooterComponent, FormFieldComponent, TransferFormCardComponent],
})
export class PayServicesComponent implements OnInit, OnDestroy {
  private auth = inject(AuthService);
  private ops = inject(OperacionesService);
  private router = inject(Router);
  private contentService = inject(ContentService);

  ui: any = null;
  form = { servicio: '', referencia: '', importe: undefined as number | undefined, concepto: '' };
  usuario: Usuario | null = null;
  private sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.auth.usuario$.subscribe((u: Usuario | null) => this.usuario = u);
    this.contentService.obtener<any>('payServices').subscribe((d: any) => this.ui = d);
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
  limpiar(): void { this.form = { servicio: '', referencia: '', importe: undefined, concepto: '' }; }

  async onSubmit(): Promise<void> {
    if (!this.usuario) { this.router.navigate(['/login']); return; }

    const importe = this.form.importe ?? 0;

    const { ref: dbRef, get: dbGet } = await import('firebase/database');
    const { database: db } = await import('../../core/firebase/firebase.config');
    const snap = await dbGet(dbRef(db, `usuarios/${this.usuario.uid}`));
    const saldoActual: number = snap.exists() ? (snap.val().saldo ?? 0) : 0;
    const nuevoSaldo = saldoActual - importe;

    await this.ops.guardarMovimiento({
      usuarioId: this.usuario.uid,
      tipo: 'Pago de servicio',
      concepto: this.form.servicio + (this.form.concepto ? ' — ' + this.form.concepto : ''),
      importe: -importe,
      servicio: this.form.servicio,
      referencia: this.form.referencia
    });

    await this.auth.actualizarSaldo(this.usuario.uid, nuevoSaldo);

    alert('¡Pago realizado con éxito!');
    this.router.navigate(['/movimientos']);
  }
}