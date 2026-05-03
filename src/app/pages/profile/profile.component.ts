import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { StorageService } from '../../core/services/storage.service';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProfileItemComponent } from '../../components/profile-item/profile-item.component';
import { Usuario } from '../../models';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [TitleCasePipe, HeaderProfileComponent, FooterComponent, ProfileItemComponent]
})
export class ProfileComponent implements OnInit, OnDestroy {
  private authService    = inject(AuthService);
  private storageService = inject(StorageService);

  usuario: Usuario | null = null;
  progresoSubida = 0;
  errorSubida    = '';
  private sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.authService.usuario$.pipe(
      filter((u): u is Usuario => u !== null)
    ).subscribe(u => this.usuario = u);
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  onFotoSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length || !this.usuario?.uid) return;

    const archivo = input.files[0];
    this.progresoSubida = 0;
    this.errorSubida    = '';

    this.storageService.subirFotoPerfil(this.usuario.uid, archivo).subscribe({
      next: ({ progress, downloadURL, error }) => {
        this.progresoSubida = progress;

        if (error) {
          this.errorSubida = error;
        }

        // Cuando llega la URL de Storage, actualizar la foto en pantalla
        if (downloadURL && this.usuario) {
          this.usuario = { ...this.usuario, fotoPerfil: downloadURL };
        }
      }
    });
  }

  logout(): void { this.authService.logout(); }
}
