import { Injectable } from '@angular/core';
import { ref, push, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { database } from '../firebase/firebase.config';
import { Observable } from 'rxjs';
import { Movimiento } from '../../models';

@Injectable({ providedIn: 'root' })
export class OperacionesService {

  /** Req. 6 – Guarda movimiento en Firebase Realtime Database */
  async guardarMovimiento(datos: Omit<Movimiento, 'id' | 'fecha'>): Promise<void> {
    const movimiento: Omit<Movimiento, 'id'> = {
      ...datos,
      fecha: new Date().toLocaleDateString('es-ES'),
    };
    await push(ref(database, 'movimientos'), movimiento);
  }

  /** Req. 6 – Escucha movimientos en tiempo real (sincronización automática) */
  escucharMovimientos(usuarioId: string): Observable<Movimiento[]> {
    return new Observable(observer => {
      const movRef = query(
        ref(database, 'movimientos'),
        orderByChild('usuarioId'),
        equalTo(usuarioId)
      );
      const unsubscribe = onValue(movRef, (snapshot) => {
        const lista: Movimiento[] = [];
        snapshot.forEach(child => {
          lista.push({ id: child.key!, ...child.val() });
        });
        lista.sort((a, b) => {
          const fa = a.fecha?.split('/').reverse().join('-') || '';
          const fb = b.fecha?.split('/').reverse().join('-') || '';
          return fb.localeCompare(fa);
        });
        observer.next(lista);
      }, err => observer.error(err));

      return () => unsubscribe();
    });
  }
}
