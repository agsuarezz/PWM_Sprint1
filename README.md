# 🏦 Banco Imperium - Sprint 02

## 1. Nombre del Proyecto y Miembros del Equipo
* **Nombre del Proyecto:** Imperium Bank
* **Equipo (Subgrupo 1):** * Álvaro García Suárez
  * Naiara Díaz Hernández
  * Marcos González Gómez
  * Jesús Extraviz Suárez

## 2. Descripción del Proyecto
Banco Imperium es una plataforma digital bancaria diseñada para simplificar la gestión financiera de los usuarios mediante una experiencia intuitiva, accesible y de alta calidad. En este Sprint 02, el proyecto ha evolucionado de un prototipo estático a una aplicación web dinámica e interactiva. Ofrece un acceso seguro a servicios financieros, permitiendo consultar saldos y movimientos, realizar transferencias, y acceder a herramientas interactivas como un simulador de préstamos.

## 3. Novedades y Requisitos Cumplidos (Sprint 02)
Para este segundo entregable, la plataforma se ha reestructurado basándose en los tres pilares exigidos:

* **📊 Pilar 1 - Contenido Dinámico (JSON):** El 100% de la información (textos, imágenes) se ha extraído a ficheros `.json` independientes, simulando una base de datos real. Usando Vanilla JS (`Promise.all` y `fetch`), inyectamos estos datos en tiempo real en nuestras plantillas mediante Expresiones Regulares (Regex).
* **🔐 Pilar 2 - Validación, Interacción y Persistencia Local:** Hemos implementado una robusta validación híbrida (HTML5 + JS) que da feedback visual instantáneo. Además, hemos creado un sistema completo de persistencia de datos en el cliente (Frontend) sin necesidad de servidor:
  * **`localStorage`:** Lo utilizamos en `register.js` para guardar la base de datos de usuarios registrados y evitar duplicados, y en `operations.js` para almacenar el historial de transferencias, pagos y recargas.
  * **`sessionStorage`:** Lo utilizamos en `login.js` para crear una "sesión activa" una vez validadas las credenciales. Esto nos permite proteger rutas privadas mediante `dashboard.js` y personalizar el DOM (como el nombre en el header o los datos en `profile.html`).
* **📱 Pilar 3 - Diseño Universal (RWD):** Todo el ecosistema se ha adaptado utilizando Flexbox y CSS Grid dentro del archivo centralizado `responsive-pages.css`. El diseño fluye y se adapta perfectamente a 3 breakpoints: Desktop (Grande), Tablet (Medio) y Móvil (Pequeño).

## 4. Lista de Requisitos Funcionales Globales
Según lo definido en la planificación del proyecto, la plataforma cumple con los siguientes requisitos funcionales:
* **Navegación intuitiva:** Interfaz clara para facilitar la experiencia del usuario.
* **Creación de perfiles de usuario:** Sistema de registro y login (inicio de sesión) persistido localmente.
* **Gestión de cuentas:** Visualización de saldo, panel de control (dashboard), historial de movimientos y gestión de tarjetas.
* **Simulador de préstamos y herramientas financieras:** Calculadora integrada para estimar operativas.
* **Integración de plantillas dinámicas:** Sistema modular para la reutilización de componentes UI.

## 5. Diseño Visual y Mockups Adaptativos
* **Nombre del archivo PDF:** `Imperium Bank Presentation.pdf`

## 6. Lista de Páginas HTML
> **Página principal de la aplicación web (Homepage):** `index.html`

| Página HTML | Descripción | Nombre del Mockup Implementado |
| :--- | :--- | :--- |
| `index.html` | Homepage pública de captación | Home (Index) |
| `login.html` | Inicio de sesión | Inicio de Sesión (Login) |
| `register.html` | Alta de nuevo cliente | Registro de usuario |
| `loan-simulator.html` | Herramienta de cálculo financiero | Simulador de préstamos |
| `profile.html` | Perfil y datos del cliente | Perfil de Usuario |
| `services.html` | Catálogo de servicios | Servicios |
| `personal-account.html` | Info Cuenta Personal | Cuentas |
| `premium-account.html` | Info Cuenta Premium | Cuentas |
| `bussiness-account.html`| Info Cuenta Empresarial | Cuentas |
| `user-movements.html` | Vista de transacciones y saldo | Dashboard |
| `user-cards.html` | Vista de gestión de tarjetas | Dashboard |
| `transfer.html` | Operación: Transferencia bancaria | Transferencias |
| `pay-services.html` | Operación: Pago de facturas | Pago de Servicios |
| `top-up.html` | Operación: Recarga móvil | Recargas |

## 7. Lista de Archivos de Plantilla (Templates)
El proyecto utiliza un sistema de inyección dinámica mediante el motor `xLuIncludeFile()` para cargar secciones repetitivas.

| Archivo Template (`/templates`) | Cargado en los siguientes HTML |
| :--- | :--- |
| `header.html` | `index.html`, `personal-account.html`, `premium-account.html`, `bussiness-account.html`, `loan-simulator.html`, `services.html` |
| `header-profile.html` | `login.html`, `register.html`, `user-movements.html`, `user-cards.html`, `transfer.html`, `pay-services.html`, `top-up.html`, `profile.html` |
| `footer.html` | Cargado en **todas** las páginas HTML de la raíz. |
| `nav.html` | Cargado dentro de `header.html` |
| `nav-accounts.html` | `personal-account.html`, `premium-account.html`, `bussiness-account.html` |
| `button-submit.html` | `register.html`, `login.html` |
| `button.html` | `index.html`, `transfer.html`, `pay-services.html`, `top-up.html`, y dentro de `profile-field-text.html` |
| `field-template.html` | `register.html`, `transfer.html`, `pay-services.html`, `top-up.html`, `loan-simulator.html` |
| `operation-title.html` | `top-up.html`, `transfer.html`, `pay-services.html` |
| `card-container.html` | `index.html` |
| `text-with-image.html`| `index.html`, `personal-account.html`, `premium-account.html`, `bussiness-account.html` |
| `benefit.html` | `index.html` |
| `service-info.html` | `services.html` |
| `services-image.html` | `services.html`, `login.html` |
| `balance-template.html`| `user-movements.html`, `user-cards.html` |
| `action-user.html` | `user-movements.html`, `user-cards.html` |
| `selection-cards.html`| `user-movements.html`, `user-cards.html` |
| `money-moves.html` | `user-movements.html` |
| `card-info.html` | `user-cards.html` |
| `profile-field-text.html`| `profile.html` |
| `profile-image.html` | `profile.html` |
| `profile-name.html`| `profile.html` |
| `icon-eye.html` | `login.html` |

## 8. Otros elementos considerados en la evaluación

* **Tareas implementadas con JavaScript:** Se ha desarrollado un motor de plantillas personalizado (`script.js`). Mediante el uso de la API `fetch()` asíncrona y la manipulación del DOM, el sistema busca etiquetas HTML específicas, carga componentes externos y reemplaza variables al vuelo, simulando el comportamiento de frameworks modernos sin salir de Vanilla JS. Además, se han creado scripts específicos (`login.js`, `register.js`, `operations.js`, `dashboard.js`, `profile.js`) para manejar la lógica de negocio y el almacenamiento local.
* **Organización de las hojas de estilo:** La carpeta `/styles` sigue una arquitectura modular separada por contextos. Existe un archivo base (`shared.css`) con variables CSS, y hemos implementado el archivo maestro **`responsive-pages.css`** que controla todo el diseño adaptativo para pantallas grandes, medianas y pequeñas.
* **Aspectos de Look & Feel:** Interfaz premium basada en una paleta de tonos dorados, negros y blancos (Marble, Pure White).
  * Tipografía dual: *Playfair Display* para transmitir elegancia en los titulares e *Inter* para alta legibilidad en la interfaz.
  * Uso de transiciones fluidas para mejorar la Experiencia de Usuario (UX) en botones, tarjetas y navegación.

## 9. Instrucciones de Ejecución (¡IMPORTANTE!)
Debido a que el proyecto utiliza la API `fetch` de JavaScript para inyectar los archivos JSON y los templates modulares dinámicamente, **es estrictamente necesario ejecutar el proyecto a través de un servidor local**. 

Si se abren los archivos HTML directamente con doble clic en el explorador, el navegador bloqueará la carga de datos por políticas de seguridad (CORS).

**Pasos para ejecutar el proyecto correctamente:**
1. Abre la carpeta del proyecto en Visual Studio Code.
2. Instala la extensión **Live Server** (si no la tienes ya instalada).
3. Haz clic derecho sobre el archivo `index.html` y selecciona **"Open with Live Server"**.
