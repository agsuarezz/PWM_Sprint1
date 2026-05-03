import { Injectable } from '@angular/core';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/firebase.config';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ContentService {

  /**
   * Lee cualquier nodo de contenido/firebase y lo devuelve como Observable.
   * Uso: this.contentService.obtener<MiTipo>('home/cards')
   */
  obtener<T>(ruta: string): Observable<T> {
    return from(get(ref(database, `contenido/${ruta}`))).pipe(
      map(snapshot => snapshot.val() as T)
    );
  }
}
