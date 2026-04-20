import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.html',
  styleUrls: ['./service-info.css']
})
export class ServiceInfoComponent {
  @Input() icon: string = '';
  @Input() title: string = 'Servicio';
  @Input() content: string = 'Descripción del servicio';
}