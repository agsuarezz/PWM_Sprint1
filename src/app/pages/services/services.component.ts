import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardContainerComponent } from '../../components/card-container/card-container.component';
import { ServicesLayoutComponent } from '../../components/services-layout/services-layout.component';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  imports: [HeaderComponent, FooterComponent, CardContainerComponent, ServicesLayoutComponent]
})
export class ServicesComponent implements OnInit {
  private contentService = inject(ContentService);

  hero: any = null;
  services: any[] = [];

  ngOnInit(): void {
    this.contentService.obtener<any>('services/hero')
      .subscribe((d: any) => this.hero = d);
    this.contentService.obtener<any[]>('services/items')
      .subscribe((d: any[]) => this.services = d ?? []);
  }
}
