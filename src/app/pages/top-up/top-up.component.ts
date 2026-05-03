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
  selector: 'app-top-up',
  standalone: true,
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.css'],
  imports: [FormsModule, HeaderProfileComponent, FooterComponent, FormFieldComponent, TransferFormCardComponent],
})
export class TopUpComponent implements OnInit, OnDestroy {
  private auth = inject(AuthService);
  private ops = inject(OperacionesService);
  private router = inject(Router);
  private contentService = inject(ContentService);

  ui: any = null;
  form = { operador: '', telefono: '', cantidad: undefined as number | undefined };
  usuario: Usuario | null = null;
  private sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.auth.usuario$.subscribe((u: Usuario | null) => this.usuario = u);
    this.contentService.obtener<any>('topUp').subscribe((d: any) => this.ui = d);
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
  limpiar(): void { this.form = { operador: '', telefono: '', cantidad: undefined }; }

  async onSubmit(): Promise<void> {
    if (!this.usuario) return;

    const cantidad = Number(this.form.cantidad) || 0;
    
    const nuevoSaldo = (this.usuario.saldo ?? 0) + cantidad;

    await this.ops.guardarMovimiento({
      usuarioId: this.usuario.uid,
      importe: cantidad,
      tipo: 'Ingreso',
      concepto: 'Recarga de cuenta'
    });

    await this.auth.actualizarSaldo(this.usuario.uid, nuevoSaldo);
  }
}