import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ContentService } from '../../core/services/content.service';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, RouterLink, HeaderProfileComponent, FooterComponent]
})
export class LoginComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private contentService = inject(ContentService);

  ui: any = null;
  email = '';
  password = '';
  showPassword = false;
  errorMsg = '';
  cargando = false;

  ngOnInit(): void {
    this.contentService.obtener<any>('login')
      .subscribe((d: any) => this.ui = d);
  }

  async onSubmit(): Promise<void> {
    this.errorMsg = '';
    this.cargando = true;
    const result = await this.auth.login(this.email, this.password);
    this.cargando = false;
    if (result.ok) {
      this.router.navigate(['/movimientos']);
    } else {
      this.errorMsg = result.mensaje || 'Email o contraseña incorrectos.';
    }
  }
}
