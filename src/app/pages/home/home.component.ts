import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardContainerComponent } from '../../components/card-container/card-container.component';
import { BenefitComponent } from '../../components/benefit/benefit.component';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterLink, HeaderComponent, FooterComponent, CardContainerComponent, BenefitComponent]
})
export class HomeComponent implements OnInit {
  private contentService = inject(ContentService);

  hero: any = null;
  compromisoVerde: any = null;
  cards: any[] = [];
  benefits: any[] = [];

  ngOnInit(): void {
    this.contentService.obtener<any>('home/hero')
      .subscribe((d: any) => this.hero = d);
    this.contentService.obtener<any>('home/compromisoVerde')
      .subscribe((d: any) => this.compromisoVerde = d);
    this.contentService.obtener<any[]>('home/cards')
      .subscribe((d: any[]) => this.cards = d ?? []);
    this.contentService.obtener<any[]>('home/benefits')
      .subscribe((d: any[]) => this.benefits = d ?? []);
  }
}
