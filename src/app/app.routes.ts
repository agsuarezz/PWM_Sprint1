import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', canActivate: [guestGuard], loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'registro', canActivate: [guestGuard], loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'servicios', loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent) },
  { path: 'simulador-prestamos', loadComponent: () => import('./pages/loan-simulator/loan-simulator.component').then(m => m.LoanSimulatorComponent) },
  { path: 'cuentas/personal', loadComponent: () => import('./pages/accounts/personal/personal-account.component').then(m => m.PersonalAccountComponent) },
  { path: 'cuentas/premium', loadComponent: () => import('./pages/accounts/premium/premium-account.component').then(m => m.PremiumAccountComponent) },
  { path: 'cuentas/empresarial', loadComponent: () => import('./pages/accounts/business/business-account.component').then(m => m.BusinessAccountComponent) },
  { path: 'movimientos', canActivate: [authGuard], loadComponent: () => import('./pages/user-movements/user-movements.component').then(m => m.UserMovementsComponent) },
  { path: 'tarjetas', canActivate: [authGuard], loadComponent: () => import('./pages/user-cards/user-cards.component').then(m => m.UserCardsComponent) },
  { path: 'transferencia', canActivate: [authGuard], loadComponent: () => import('./pages/transfer/transfer.component').then(m => m.TransferComponent) },
  { path: 'pagar-servicios', canActivate: [authGuard], loadComponent: () => import('./pages/pay-services/pay-services.component').then(m => m.PayServicesComponent) },
  { path: 'recargar', canActivate: [authGuard], loadComponent: () => import('./pages/top-up/top-up.component').then(m => m.TopUpComponent) },
  { path: 'perfil', canActivate: [authGuard], loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
  { path: '**', redirectTo: '' }
];
