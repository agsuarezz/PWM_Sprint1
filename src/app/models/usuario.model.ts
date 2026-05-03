export interface Usuario {
  uid: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono?: string;
  fechaNacimiento?: string;
  direccion?: string;
  codigoPostal?: string;
  tipoCuenta?: string;
  fotoPerfil?: string;
  rol?: string;
  saldo?: number;
}

export type RegisterResult =
  | { ok: true }
  | { ok: false; code: string; mensaje: string };

export interface AccountData {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  benefits: string[];
}