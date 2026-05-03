import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { OperacionesService } from '../../core/services/operaciones.service';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DashboardLayoutComponent } from '../../components/dashboard-layout/dashboard-layout.component';
import { MovementItemComponent } from '../../components/movement-item/movement-item.component';
import { Usuario, Movimiento, DashboardAction } from '../../models';

@Component({
  selector: 'app-user-movements',
  standalone: true,
  templateUrl: './user-movements.component.html',
  styleUrls: ['./user-movements.component.css'],
  imports: [
    CommonModule,
    HeaderProfileComponent,
    FooterComponent,
    DashboardLayoutComponent,
    MovementItemComponent,
  ]
})
export class UserMovementsComponent implements OnInit, OnDestroy {
  usuario: Usuario | null = null;
  movimientos: Movimiento[] = [];
  cargando = true;
  saldoFormateado: string = '0,00 €';

  private sub!: Subscription;
  private movSub!: Subscription;

  actions: DashboardAction[] = [
    { link: '/transferencia',   icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828640.png', label: 'Transferir' },
    { link: '/pagar-servicios', icon: 'https://cdn-icons-png.flaticon.com/512/126/126083.png',   label: 'Pagar'      },
    { link: '/recargar',        icon: 'https://cdn-icons-png.flaticon.com/512/929/929426.png',   label: 'Recargar'   },
  ];

  constructor(
    private authService: AuthService,
    private operacionesService: OperacionesService,
  ) {}

  ngOnInit(): void {
  this.sub = this.authService.usuario$.pipe(
    filter((u): u is Usuario => u !== null)
  ).subscribe(usuario => {
    this.usuario = usuario;

    // 1. CARGA RÁPIDA: Saldo del perfil de Firebase
    this.actualizarPantalla(usuario.saldo ?? 0);

    // 2. CARGA PRECISA: Suma de movimientos
    if (!this.movSub || this.movSub.closed) {
      this.movSub = this.operacionesService.escucharMovimientos(usuario.uid).subscribe(movs => {
        this.movimientos = movs;

        const totalCalculado = movs.reduce((acc, m) => {
          // Convertimos a String primero para que no dé error 'never'
          const rawImporte = String(m.importe || '0');
          const valor = parseFloat(rawImporte.replace(/\./g, '').replace(',', '.'));
          return acc + (valor || 0);
        }, 0);

        this.actualizarPantalla(totalCalculado);
        this.cargando = false;
      });
    }
  });
}

private actualizarPantalla(monto: number): void {
  this.saldoFormateado = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(monto);
}

  private formatearSaldo(valor: number | string): void {
    const limpio = typeof valor === 'string' 
      ? parseFloat(valor.replace('.', '').replace(',', '.')) 
      : valor;

    this.saldoFormateado = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(limpio || 0);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.movSub?.unsubscribe();
  }
}