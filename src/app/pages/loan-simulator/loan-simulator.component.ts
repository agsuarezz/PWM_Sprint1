import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-loan-simulator',
  standalone: true,
  templateUrl: './loan-simulator.component.html',
  styleUrls: ['./loan-simulator.component.css'],
  imports: [FormsModule, HeaderComponent, FooterComponent]
})
export class LoanSimulatorComponent implements OnInit {
  private contentService = inject(ContentService);

  ui: any = null;
  amount = 10000;
  term = 24;
  rate = 4.50;
  resultado = '0.00€';

  ngOnInit(): void {
    this.contentService.obtener<any>('loans')
      .subscribe((d: any) => {
        this.ui = d;
        if (d?.defaults) {
          this.amount = d.defaults.amount;
          this.term   = d.defaults.term;
          this.rate   = d.defaults.rate;
        }
      });
  }

  calcular(): void {
    const r = this.rate / 100 / 12;
    const n = this.term;
    const P = this.amount;
    if (r === 0) { this.resultado = (P / n).toFixed(2) + '€'; return; }
    const cuota = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    this.resultado = cuota.toFixed(2) + '€';
  }
}
