import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importamos los componentes que se usan en la vista de Home
// Nota: Asegúrate de que las rutas coincidan con la ubicación real de tus archivos
import { TextWithImageComponent } from '../../components/text-with-image/text-with-image';
import { ButtonComponent } from '../../components/button/button';
import { CardContainerComponent } from '../../components/card-container/card-container';
import { BenefitComponent } from '../../components/benefit/benefit';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TextWithImageComponent,
    ButtonComponent,
    CardContainerComponent,
    BenefitComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  // Aquí podrías definir variables si quisieras traer los datos de un servicio
  // Por ahora, como los pasamos directamente en el HTML, la clase puede estar vacía.
  
  constructor() {}
}