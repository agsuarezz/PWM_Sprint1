import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-operation-title',
  templateUrl: './operation-title.html',
  styleUrls: ['./operation-title.css']
})
export class OperationTitleComponent {
  @Input() title: string = 'Nueva Operación';
}