import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  AuthError
} from 'firebase/auth';
import { ref, set, get, onValue, off } from 'firebase/database';
import { auth, database } from '../firebase/firebase.config';
import { Usuario, RegisterResult } from '../../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarioSesion = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this.usuarioSesion.asObservable();
  private offPerfilFn: (() => void) | null = null;

  constructor(private router: Router) {
    onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      // Cancelar listener anterior si existe
      if (this.offPerfilFn) {
        this.offPerfilFn();
        this.offPerfilFn = null;
      }

      if (firebaseUser) {
        // Escuchar el perfil en tiempo real → cada vez que cambia saldo, nombre, etc.
        // el BehaviorSubject se actualiza automáticamente
        const perfilRef = ref(database, `usuarios/${firebaseUser.uid}`);
        this.offPerfilFn = onValue(perfilRef, (snap) => {
          if (snap.exists()) {
            this.usuarioSesion.next(snap.val() as Usuario);
          } else {
            const partes = (firebaseUser.displayName || '').split(' ');
            this.usuarioSesion.next({
              uid: firebaseUser.uid,
              nombre: partes[0] || '',
              apellidos: partes.slice(1).join(' ') || '',
              email: firebaseUser.email || '',
              saldo: 0
            });
          }
        });
      } else {
        this.usuarioSesion.next(null);
      }
    });
  }

  getUsuario(): Usuario | null {
    return this.usuarioSesion.getValue();
  }

  isLoggedIn(): boolean {
    return !!auth.currentUser;
  }

  async login(email: string, password: string): Promise<{ ok: boolean; mensaje?: string }> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { ok: true };
    } catch (e) {
      const err = e as AuthError;
      const mensajes: Record<string, string> = {
        'auth/user-not-found': 'No existe ninguna cuenta con ese email.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/invalid-credential': 'Email o contraseña incorrectos.',
        'auth/too-many-requests': 'Demasiados intentos fallidos. Espera un momento.',
      };
      return { ok: false, mensaje: mensajes[err.code] || `Error: ${err.code}` };
    }
  }

  async register(datos: Omit<Usuario, 'uid'> & { password: string }): Promise<RegisterResult> {
    try {
      const { password, ...perfilDatos } = datos;
      const credencial = await createUserWithEmailAndPassword(auth, datos.email, password);
      const uid = credencial.user.uid;

      await updateProfile(credencial.user, {
        displayName: `${datos.nombre} ${datos.apellidos}`
      });

      try {
        const perfil: Usuario = { ...perfilDatos, uid, rol: 'cliente', saldo: 0 };
        await set(ref(database, `usuarios/${uid}`), perfil);
      } catch (dbErr) {
        console.warn('Perfil no guardado en DB (revisa reglas de Firebase):', dbErr);
      }

      return { ok: true };
    } catch (e) {
      const err = e as AuthError;
      console.error('Firebase register error:', err.code, err.message);
      const mensajes: Record<string, string> = {
        'auth/email-already-in-use': 'Este email ya tiene una cuenta registrada.',
        'auth/invalid-email': 'El formato del email no es válido.',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
        'auth/operation-not-allowed': 'El registro por email no está habilitado. Actívalo en Firebase Console → Authentication → Sign-in method.',
        'auth/network-request-failed': 'Sin conexión a internet.',
      };
      return {
        ok: false,
        code: err.code,
        mensaje: mensajes[err.code] || `Error inesperado (${err.code}): ${err.message}`
      };
    }
  }

  actualizarSesionLocal(datos: Partial<Usuario>): void {
    const actual = this.getUsuario();
    if (actual) this.usuarioSesion.next({ ...actual, ...datos });
  }

  async actualizarPerfil(uid: string, datos: Partial<Usuario>): Promise<void> {
    try {
      const snap = await get(ref(database, `usuarios/${uid}`));
      if (snap.exists()) {
        await set(ref(database, `usuarios/${uid}`), { ...snap.val(), ...datos });
      }
    } catch (e) {
      console.error('Error actualizando perfil:', e);
    }
  }

  async actualizarSaldo(uid: string, nuevoSaldo: number): Promise<void> {
    try {
      const snap = await get(ref(database, `usuarios/${uid}`));
      if (snap.exists()) {
        await set(ref(database, `usuarios/${uid}`), {
          ...snap.val(),
          saldo: nuevoSaldo
        });
      }
    } catch (e) {
      console.error('Error actualizando saldo:', e);
    }
  }

  logout(): void {
    signOut(auth).then(() => {
      if (this.offPerfilFn) {
        this.offPerfilFn();
        this.offPerfilFn = null;
      }
      this.usuarioSesion.next(null);
      this.router.navigate(['/login']);
    });
  }
}