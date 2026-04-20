import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-eye',
  templateUrl: './icon-eye.html',
  styleUrls: ['./icon-eye.css']
})
export class IconEyeComponent {
  @Input() width: string = '24';
  @Input() height: string = '24';
  @Input() color: string = '#000000';
}