import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-action-user',
  templateUrl: './action-user.html',
  styleUrls: ['./action-user.css']
})
export class ActionUserComponent {
  @Input() href: string = '';
  @Input() icon: string = '';
  @Input() label: string = '';
}