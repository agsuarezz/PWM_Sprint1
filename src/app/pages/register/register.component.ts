import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ContentService } from '../../core/services/content.service';
import { HeaderProfileComponent } from '../../components/header-profile/header-profile.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { SelectFieldComponent } from '../../components/select-field/select-field.component';
import { RegisterFormCardComponent } from '../../components/register-form-card/register-form-card.component';
import { SelectOption } from '../../models';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    FormsModule,
    HeaderProfileComponent,
    FooterComponent,
    FormFieldComponent,
    SelectFieldComponent,
    RegisterFormCardComponent,
  ]
})
export class RegisterComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private contentService = inject(ContentService);

  ui: any = null;
  form = {
    nombre: '', apellidos: '', email: '', telefono: '',
    fechaNacimiento: '', direccion: '', codigoPostal: '', tipoCuenta: ''
  };
  password = '';
  confirmPassword = '';
  errorMsg = '';
  cargando = false;

  accountTypeOptions: SelectOption[] = [
    { value: 'personal', label: 'Personal' },
    { value: 'premium',  label: 'Premium'  },
    { value: 'business', label: 'Negocios' },
  ];

  ngOnInit(): void {
    this.contentService.obtener<any>('register').subscribe((d: any) => this.ui = d);
  }

  async onSubmit(): Promise<void> {
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Las contraseñas no coinciden.'; return;
    }
    this.errorMsg = '';
    this.cargando = true;
    const result = await this.auth.register({ ...this.form, password: this.password });
    this.cargando = false;
    if (result.ok) {
      alert('¡Usuario registrado con éxito en Firebase!');
      this.router.navigate(['/login']);
    } else {
      this.errorMsg = result.mensaje;
    }
  }
}
