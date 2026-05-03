import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { auth } from '../firebase/firebase.config';

/** Espera a que Firebase resuelva el estado de auth antes de decidir */
function esperarAuthEstado(): Promise<boolean> {
  return new Promise(resolve => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(!!user);
    });
  });
}

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const logueado = await esperarAuthEstado();
  if (logueado) return true;
  router.navigate(['/login']);
  return false;
};

export const guestGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const logueado = await esperarAuthEstado();
  if (!logueado) return true;
  router.navigate(['/movimientos']);
  return false;
};
