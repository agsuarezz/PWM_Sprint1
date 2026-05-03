// ─────────────────────────────────────────────────────────────
//  personal-account.component.ts
// ─────────────────────────────────────────────────────────────
import { Component, OnInit } from '@angular/core';
import { AccountPageComponent } from '../account-page.component';
import { ContentService } from '../../../core/services/content.service';
import { AccountData } from '../../../models';

@Component({
  selector: 'app-personal-account',
  standalone: true,
  imports: [AccountPageComponent],
  template: `@if (data) { <app-account-page [data]="data"></app-account-page> }`
})
export class PersonalAccountComponent implements OnInit {
  data: AccountData | null = null;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.obtener<AccountData>('accounts/personal')
      .subscribe(d => this.data = d);
  }
}


// ─────────────────────────────────────────────────────────────
//  premium-account.component.ts
// ─────────────────────────────────────────────────────────────
import { Component, OnInit } from '@angular/core';
import { AccountPageComponent } from '../account-page.component';
import { ContentService } from '../../../core/services/content.service';
import { AccountData } from '../../../models';

@Component({
  selector: 'app-premium-account',
  standalone: true,
  imports: [AccountPageComponent],
  template: `@if (data) { <app-account-page [data]="data"></app-account-page> }`
})
export class PremiumAccountComponent implements OnInit {
  data: AccountData | null = null;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.obtener<AccountData>('accounts/premium')
      .subscribe(d => this.data = d);
  }
}


// ─────────────────────────────────────────────────────────────
//  business-account.component.ts
// ─────────────────────────────────────────────────────────────
import { Component, OnInit } from '@angular/core';
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
  data: AccountData | null = null;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.obtener<AccountData>('accounts/business')
      .subscribe(d => this.data = d);
  }
}
