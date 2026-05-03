import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { OperacionesService } from '../../core/services/operaciones.service';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardInfoComponent } from '../../components/card-info/card-info.component';
import { DashboardLayoutComponent } from '../../components/dashboard-layout/dashboard-layout.component';
import { Usuario, DashboardAction } from '../../models';

@Component({
  selector: 'app-user-cards',
  standalone: true,
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css'],
  imports: [
    HeaderProfileComponent,
    FooterComponent,
    CardInfoComponent,
    DashboardLayoutComponent,
  ]
})
export class UserCardsComponent implements OnInit, OnDestroy {
  usuario: Usuario | null = null;
  saldoFormateado: string = '0,00 €';

  private sub!: Subscription;
  private movSub!: Subscription;

  actions: DashboardAction[] = [
    { link: '/transferencia',   icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828640.png', label: 'Transferir' },
    { link: '/pagar-servicios', icon: 'https://cdn-icons-png.flaticon.com/512/126/126083.png',   label: 'Pagar'      },
    { link: '/recargar',        icon: 'https://cdn-icons-png.flaticon.com/512/929/929426.png',   label: 'Recargar'   },
  ];

  cards = [
    { title: 'Tarjeta Black',   subtitle: 'Débito • Activa'         },
    { title: 'Tarjeta Premium', subtitle: 'Crédito • Activa'        },
    { title: 'Tarjeta Travel',  subtitle: 'Crédito • Internacional' },
  ];

  constructor(
    private auth: AuthService,
    private operacionesService: OperacionesService,
  ) {}

  ngOnInit(): void {
    this.sub = this.auth.usuario$.pipe(
      filter((u): u is Usuario => u !== null)
    ).subscribe(usuario => {
      this.usuario = usuario;

      this.actualizarPantalla(usuario.saldo ?? 0);

      if (!this.movSub || this.movSub.closed) {
        this.movSub = this.operacionesService.escucharMovimientos(usuario.uid).subscribe(movs => {
          const totalCalculado = movs.reduce((acc, m) => {
            const rawImporte = String(m.importe || '0');
            const valor = parseFloat(rawImporte.replace(/\./g, '').replace(',', '.'));
            return acc + (valor || 0);
          }, 0);

          this.actualizarPantalla(totalCalculado);
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

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.movSub?.unsubscribe();
  }
}
