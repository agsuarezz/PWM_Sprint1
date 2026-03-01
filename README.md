# 🏦 Banco Imperium

## 1. Nombre del Proyecto y Miembros del Equipo
* **Nombre del Proyecto:** Imperium Bank
* **Equipo:** 
  * Álvaro García Suárez
  * Naiara Díaz Hernández
  * Marcos González Gómez
  * Jesús Extraviz Suárez

## 2. Descripción del Proyecto
Banco Imperium es una plataforma digital bancaria diseñada para simplificar la gestión financiera de los usuarios mediante una experiencia intuitiva, accesible y de alta calidad. El proyecto ofrece un acceso seguro a servicios financieros, permitiendo consultar saldos y movimientos, realizar transferencias, y acceder a herramientas interactivas como un simulador de préstamos.

## 3. Lista de Requisitos Funcionales
Según lo definido en la planificación del proyecto, la plataforma cumple con los siguientes requisitos funcionales:
* **Navegación intuitiva:** Interfaz clara para facilitar la experiencia del usuario.
* **Creación de perfiles de usuario:** Sistema de registro y login (inicio de sesión).
* **Gestión de cuentas:** Visualización de saldo, panel de control (dashboard), historial de movimientos y gestión de tarjetas.
* **Simulador de préstamos y herramientas financieras:** Calculadora integrada para estimar operativas.
* **Integración de plantillas dinámicas:** Sistema modular para la reutilización de componentes UI.

## 4. PDF de Mockups y Storyboard
* **Nombre del archivo PDF:** `Imperium Bank Presentation.pdf` *(Este archivo contiene tanto los mockups como el storyboard visualizado a través de las diapositivas de la presentación).*

## 5. Lista de Páginas HTML
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

## 6. Lista de Archivos de Plantilla (Templates)
El proyecto utiliza un sistema de inyección dinámica mediante el motor `xLuIncludeFile()` para cargar secciones repetitivas.

| Archivo Template (`/templates`) | Cargado en los siguientes HTML |
| :--- | :--- |
| `header.html` | `index.html`, `personal-account.html`, `premium-account.html`, `bussiness-account.html`, `loan-simulator.html`, `services.html` |
| `header-profile.html` | `login.html`, `register.html`, `user-movements.html`, `user-cards.html`, `transfer.html`, `pay-services.html`, `top-up.html`, `profile.html` |
| `footer.html` | Cargado en **todas** las páginas HTML de la raíz. |
| `nav.html` | Cargado dentro de `header.html` |
| `nav-accounts.html` | `personal-account.html`, `premium-account.html`, `bussiness-account.html` |
| `button.html` | `index.html`, `login.html`, `register.html`, `transfer.html`, `pay-services.html`, `top-up.html`, `profile.html`, `profile-field-text.html` |
| `field-template.html` | `register.html`, `transfer.html`, `pay-services.html`, `top-up.html`, `loan-simulator.html` |
| `card-container.html` | `index.html` |
| `text-with-image.html`| `index.html`, `personal-account.html`, `premium-account.html`, `bussiness-account.html` |
| `benefit.html` | `index.html` |
| `service-info.html` | `services.html` |
| `balance-template.html`| `user-movements.html`, `user-cards.html` |
| `action-user.html` | `user-movements.html`, `user-cards.html` |
| `selection-cards.html`| `user-movements.html`, `user-cards.html` |
| `money-moves.html` | `user-movements.html` |
| `card-info.html` | `user-cards.html` |
| `profile-field-text.html`| `profile.html` |

## 7. Otros elementos considerados en la evaluación

* **Tareas implementadas con JavaScript:** Se ha desarrollado un motor de plantillas personalizado (`script.js`). Mediante el uso de la API `fetch()` asíncrona y la manipulación del DOM, el sistema busca etiquetas HTML específicas, carga componentes externos y reemplaza variables al vuelo, simulando el comportamiento de frameworks modernos sin salir de Vanilla JS.
* **Organización de las hojas de estilo:** La carpeta `/styles` sigue una arquitectura modular separada por contextos. Existe un archivo base (`shared.css`) con variables CSS para la paleta de colores y el layout global. El resto de estilos se dividen por área (ej. `operations-style.css`, `login-style.css`), asegurando un código escalable.
* **Aspectos de Look & Feel:** Interfaz premium basada en una paleta de tonos dorados, negros y blancos (Marble, Pure White).
  * Tipografía dual: *Playfair Display* para transmitir elegancia en los titulares e *Inter* para alta legibilidad en la interfaz.
  * Uso de transiciones fluidas para mejorar la Experiencia de Usuario (UX) en botones, tarjetas y navegación.
