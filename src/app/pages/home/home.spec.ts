import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home'; // Cambiado de Home a HomeComponent

describe('HomeComponent', () => { // Cambiado el nombre de la descripción
  let component: HomeComponent; // Cambiado de Home a HomeComponent
  let fixture: ComponentFixture<HomeComponent>; // Cambiado de Home a HomeComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent], // Cambiado de Home a HomeComponent
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent); // Cambiado de Home a HomeComponent
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});