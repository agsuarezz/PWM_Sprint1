# ImperiumBank

Aplicacion web de banca digital desarrollada con Angular 19 y Firebase.

## Caracteristicas

- Gestion de cuentas (Personal, Premium, Empresarial)
- Transferencias entre cuentas
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

---

## Estructura del código

El proyecto sigue la arquitectura de componentes standalone de Angular 19, organizado en tres capas principales: páginas, componentes reutilizables y servicios del núcleo.

```
src/app/
├── pages/          # Vistas completas de cada ruta
├── components/     # Componentes reutilizables de UI
├── core/           # Servicios, guards y configuración de Firebase
└── models/         # Interfaces y modelos de datos
```

### Páginas (`pages/`)

Cada página es un componente standalone con lazy loading configurado en `app.routes.ts`.

| Componente | Ruta | Descripcion |
|---|---|---|
| `HomeComponent` | `/` | Página de inicio pública. Carga dinámicamente hero, beneficios y tarjetas de producto desde Firebase a través de `ContentService`. |
| `LoginComponent` | `/login` | Formulario de inicio de sesión. Usa `AuthService` para autenticar con Firebase y redirige a `/movimientos` tras el login. Protegida por `guestGuard` (redirige si ya hay sesión activa). |
| `RegisterComponent` | `/registro` | Formulario de registro completo con campos de perfil (nombre, apellidos, email, teléfono, dirección, tipo de cuenta) y contraseña. Crea usuario en Firebase Auth y guarda el perfil en Realtime Database. Protegida por `guestGuard`. |
| `ServicesComponent` | `/servicios` | Página pública que lista los servicios disponibles del banco, cargando los datos desde Firebase vía `ContentService`. |
| `LoanSimulatorComponent` | `/simulador-prestamos` | Simulador de préstamos interactivo. Permite al usuario introducir capital, plazo e interés y calcula la cuota mensual mediante la fórmula de amortización francesa. |
| `AccountPageComponent` | `/cuentas/*` | Componente base compartido por `PersonalAccountComponent`, `PremiumAccountComponent` y `BusinessAccountComponent`, que inyectan sus propios datos estáticos de producto (imagen, título, beneficios). |
| `UserMovementsComponent` | `/movimientos` | Dashboard principal del usuario autenticado. Muestra el saldo actualizado en tiempo real y el historial de movimientos ordenado por fecha, escuchando Firebase con `OperacionesService`. |
| `UserCardsComponent` | `/tarjetas` | Vista del panel de tarjetas del usuario. Muestra las tarjetas asociadas (débito, crédito, travel) usando el mismo layout de dashboard que movimientos. |
| `TransferComponent` | `/transferencia` | Formulario de transferencia bancaria. Valida saldo disponible, descuenta el importe del usuario, registra el movimiento en Firebase y redirige a `/movimientos`. |
| `PayServicesComponent` | `/pagar-servicios` | Pago de suministros y servicios (luz, agua, internet, etc.). Igual flujo que transferencia: descuenta saldo y guarda movimiento en Firebase. |
| `TopUpComponent` | `/recargar` | Recarga de saldo de teléfono móvil. Permite seleccionar operador, introducir número e importe, y registra la operación como movimiento. |
| `ProfileComponent` | `/perfil` | Perfil del usuario autenticado. Muestra los datos de cuenta y permite subir/cambiar la foto de perfil, que se comprime con Canvas y se almacena en Base64 en Realtime Database. |

### Componentes reutilizables (`components/`)

Piezas de UI independientes, todas standalone, reutilizadas en varias páginas.

| Componente | Descripcion |
|---|---|
| `HeaderComponent` | Cabecera de las páginas públicas. Incluye navegación principal y acceso a login/registro. Implementa menú hamburguesa responsivo para móviles. |
| `HeaderProfileComponent` | Cabecera de las páginas del área privada. Muestra el nombre del usuario, el número de cuenta y un acceso al perfil. |
| `FooterComponent` | Pie de página global con enlaces legales (privacidad, cookies, legal) y badges de descarga de App Store y Google Play. Los textos se cargan desde `ContentService`. |
| `DashboardLayoutComponent` | Layout del área privada. Compone `BalanceCardComponent`, una fila de `ActionUserComponent` y `TabsNavComponent`, más un `<ng-content>` para el contenido específico de cada página. |
| `BalanceCardComponent` | Tarjeta que muestra una etiqueta y un importe formateado. Recibe `label` y `amount` como `@Input`. |
| `ActionUserComponent` | Botón de acción rápida con icono, texto y enlace de ruta. Usado en el dashboard para Transferir, Pagar y Recargar. |
| `TabsNavComponent` | Barra de pestañas del dashboard con navegación entre Movimientos y Tarjetas. Marca la pestaña activa según el `@Input activeTab`. |
| `MovementItemComponent` | Fila de movimiento individual. Muestra icono, concepto, fecha e importe con color verde/rojo según sea ingreso o gasto. |
| `CardInfoComponent` | Tarjeta de información de una tarjeta bancaria. Muestra nombre, número enmascarado e imagen de la tarjeta. |
| `FormFieldComponent` | Campo de formulario genérico (`<input>`) con soporte de two-way binding, validaciones HTML5 (pattern, min, max, minlength) y placeholder configurable. |
| `SelectFieldComponent` | Campo `<select>` genérico con two-way binding. Acepta un array de `SelectOption` como opciones. |
| `TransferFormCardComponent` | Contenedor de formulario de operaciones (transferencia, pago, recarga). Incluye cabecera con título, proyección de contenido (`<ng-content>`) y barra de acciones (Borrar, Cancelar, Enviar). |
| `RegisterFormCardComponent` | Contenedor del formulario de registro. Gestiona el estado de carga, mensajes de error y el botón de envío. Proyecta los campos del formulario con `<ng-content>`. |
| `BenefitComponent` | Tarjeta de beneficio para la página de inicio. Muestra imagen, título y descripción. |
| `CardContainerComponent` | Tarjeta genérica con icono, título y texto. Usada en Home y Servicios para mostrar productos o servicios. |
| `ServicesLayoutComponent` | Layout de dos columnas para la página de servicios: grid de tarjetas a la izquierda e imagen hero a la derecha. |
| `ProfileItemComponent` | Elemento de lista del perfil. Muestra una etiqueta, su valor y opcionalmente un botón "Modificar". |

### Servicios del núcleo (`core/services/`)

| Servicio | Descripcion |
|---|---|
| `AuthService` | Gestiona todo el ciclo de autenticación. Usa `BehaviorSubject<Usuario>` para exponer el estado de sesión como observable reactivo. Escucha cambios de perfil en tiempo real con `onValue` de Firebase, y expone métodos `login`, `register`, `logout`, `actualizarPerfil` y `actualizarSaldo`. |
| `OperacionesService` | Gestiona los movimientos financieros. Guarda nuevos movimientos en Firebase con `push` y expone `escucharMovimientos(uid)` como `Observable<Movimiento[]>`, con suscripción en tiempo real y ordenación descendente por fecha. |
| `StorageService` | Maneja la subida de imágenes de perfil sin necesidad de Firebase Storage (compatible con el plan Spark gratuito). Lee el archivo con `FileReader`, lo comprime con Canvas API (máx. 300×300 px, calidad 0.7) y lo almacena como Base64 en Realtime Database. Devuelve un `Observable<UploadProgress>` con progreso (30% → 70% → 100%). |
| `ContentService` | Servicio genérico de lectura de contenido desde Firebase Realtime Database. Expone un método `obtener<T>(path)` que devuelve un `Observable<T>`, utilizado por las páginas públicas para cargar textos, imágenes y configuración sin hardcodearlos. |

### Guards (`core/guards/`)

| Guard | Descripcion |
|---|---|
| `authGuard` | Protege las rutas privadas. Espera a que Firebase resuelva el estado de autenticación antes de decidir; si no hay sesión activa, redirige a `/login`. |
| `guestGuard` | Protege las rutas de login y registro para usuarios no autenticados. Si ya hay sesión activa, redirige a `/movimientos`. |

### Modelos (`models/`)

| Modelo | Descripcion |
|---|---|
| `Usuario` | Datos del usuario: `uid`, `nombre`, `apellidos`, `email`, `saldo`, `telefono`, `rol`, `fotoPerfil` y otros campos de perfil. |
| `Movimiento` | Registro de operación financiera: `id`, `usuarioId`, `tipo`, `concepto`, `importe`, `fecha`. |
| `DashboardAction` | Estructura de una acción rápida del dashboard: `link`, `icon`, `label`. |
| `SelectOption` | Par `value`/`label` para los campos `<select>`. |
| `UploadProgress` | Estado de progreso de subida de imagen: `progress`, `downloadURL`, `error`. |
