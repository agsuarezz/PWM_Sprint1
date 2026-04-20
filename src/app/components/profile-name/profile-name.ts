import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-name',
  templateUrl: './profile-name.html',
  styleUrls: ['./profile-name.css']
})
export class ProfileNameComponent {
  @Input() title: string = 'Nombre';
  @Input() value: string = 'Usuario Imperium';
}