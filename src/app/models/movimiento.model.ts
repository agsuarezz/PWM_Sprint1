export interface Movimiento {
  id?: string;
  usuarioId: string;
  tipo: string;
  fecha: string;
  concepto?: string;
  importe?: number;
  nombre?: string;
  iban?: string;
  servicio?: string;
  referencia?: string;
  operador?: string;
  telefono?: string;
  cantidad?: number;
}
