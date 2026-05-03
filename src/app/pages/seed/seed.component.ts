import { Component, OnInit } from '@angular/core';
import { runSeed } from './firebase-seed';

@Component({
  selector: 'app-seed',
  standalone: true,
  template: `<p style="padding:2rem">Ejecutando seed... revisa la consola del navegador.</p>`
})
export class SeedComponent implements OnInit {
  async ngOnInit() {
    await runSeed();
  }
}