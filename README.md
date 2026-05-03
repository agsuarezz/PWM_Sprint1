# ImperiumBank

Aplicacion web de banca digital desarrollada con Angular 19 y Firebase.

## Caracteristicas

- Gestion de cuentas (Personal, Premium, Empresarial)
- Transferencias entre cuentas
- Pago de servicios (luz, agua, internet, etc.)
- Recargas de saldo telefonico
- Historial de movimientos en tiempo real
- Gestion de tarjetas
- Simulador de prestamos
- Perfil de usuario

## Tech Stack

- Angular 19
- Firebase (Auth + Realtime Database)
- TypeScript
- RxJS

## Requisitos

- Node.js 18+
- Angular CLI 19
- Cuenta de Firebase

## Instalacion

```bash
npm install
```

## Ejecucion

```bash
npm start
```

Acceder a: http://localhost:4200

## Rutas

| Ruta | Descripcion |
|------|-------------|
| `/` | Inicio |
| `/login` | Inicio de sesion |
| `/registro` | Registro de usuario |
| `/servicios` | Servicios disponibles |
| `/simulador-prestamos` | Simulador de prestamos |
| `/cuentas/*` | Gestion de cuentas |
| `/movimientos` | Historial (requiere auth) |
| `/tarjetas` | Tarjetas (requiere auth) |
| `/transferencia` | Transferencias (requiere auth) |
| `/pagar-servicios` | Pago de servicios (requiere auth) |
| `/recargar` | Recarga movil (requiere auth) |
| `/perfil` | Perfil de usuario (requiere auth) |

## Construccion

```bash
npm run build
```

## Pruebas

```bash
npm test
```
