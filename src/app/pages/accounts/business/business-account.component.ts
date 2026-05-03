import { Component, OnInit, inject } from '@angular/core';
import { AccountPageComponent } from '../account-page.component';
import { ContentService } from '../../../core/services/content.service';
import { AccountData } from '../../../models';

@Component({
  selector: 'app-business-account',
  standalone: true,
  imports: [AccountPageComponent],
  template: `@if (data) { <app-account-page [data]="data"></app-account-page> }`
})
export class BusinessAccountComponent implements OnInit {
  private contentService = inject(ContentService);
  data: AccountData | null = null;

  ngOnInit(): void {
    this.contentService.obtener<AccountData>('accounts/business')
      .subscribe((d: AccountData) => this.data = d);
  }
}
