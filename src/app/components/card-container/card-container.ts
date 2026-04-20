import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.html',
  styleUrls: ['./card-container.css']
})
export class CardContainerComponent {
  @Input() image: string = '';
  @Input() imageCaption: string = '';
  @Input() title: string = '';
  @Input() content: string = '';
}