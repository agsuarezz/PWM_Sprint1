import { Injectable } from '@angular/core';
import { ref as dbRef, set, get } from 'firebase/database';
import { database } from '../firebase/firebase.config';
import { Observable } from 'rxjs';
import { UploadProgress } from '../../models';

@Injectable({ providedIn: 'root' })
export class StorageService {

  /**
   * Comprime la imagen con Canvas y la guarda como Base64
   * en Realtime Database bajo usuarios/{uid}/fotoPerfil.
   * No requiere Firebase Storage (plan gratuito Spark).
   */
  subirFotoPerfil(uid: string, archivo: File): Observable<UploadProgress> {
    return new Observable(observer => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          observer.next({ progress: 30 });

          const base64Original = e.target?.result as string;
          const base64Comprimida = await this.comprimirImagen(base64Original, 300, 300, 0.7);

          observer.next({ progress: 70 });

          const snap = await get(dbRef(database, `usuarios/${uid}`));
          if (snap.exists()) {
            await set(dbRef(database, `usuarios/${uid}`), {
              ...snap.val(),
              fotoPerfil: base64Comprimida,
              fotoPerfilActualizada: new Date().toISOString()
            });
          }

          observer.next({ progress: 100, downloadURL: base64Comprimida });
          observer.complete();

        } catch (err: any) {
          observer.next({ progress: 0, error: err.message });
          observer.complete();
        }
      };

      reader.onerror = () => {
        observer.next({ progress: 0, error: 'Error al leer el archivo' });
        observer.complete();
      };

      reader.readAsDataURL(archivo);
    });
  }

  private comprimirImagen(
    base64: string,
    maxWidth: number,
    maxHeight: number,
    calidad: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) { height = Math.round(height * maxWidth / width); width = maxWidth; }
        } else {
          if (height > maxHeight) { width = Math.round(width * maxHeight / height); height = maxHeight; }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject('No canvas context'); return; }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', calidad));
      };
      img.onerror = () => reject('Error cargando imagen');
      img.src = base64;
    });
  }

  subirArchivo(uid: string, archivo: File, carpeta: string): Observable<UploadProgress> {
    return this.subirFotoPerfil(uid, archivo);
  }
}
