import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AccountData } from '../../models';

@Component({
  selector: 'app-account-page',
  standalone: true,
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
  imports: [RouterLink, HeaderComponent, FooterComponent]
})
export class AccountPageComponent {
  @Input() data: AccountData = {
    imageSrc: '', imageAlt: '', title: '', subtitle: '', benefits: []
  };
}
