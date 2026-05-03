/**
 * ============================================================
 *  IMPERIUM BANK — Firebase Seed Script
 *  Sube todo el contenido estático a Realtime Database.
 *
 *  INSTRUCCIONES DE USO
 *  ─────────────────────
 *  Opción A — Componente temporal (recomendada):
 *    1. Crea un componente SeedComponent en tu proyecto Angular.
 *    2. Copia el método `runSeed()` dentro de ngOnInit().
 *    3. Añade la ruta /seed en app.routes.ts (solo en desarrollo).
 *    4. Navega a /seed → abre la consola del navegador → verás los logs.
 *    5. Una vez ejecutado, elimina el componente y la ruta.
 *
 *  Opción B — Script Node.js independiente:
 *    1. npm install firebase
 *    2. Ajusta las importaciones para usar el SDK de Node
 *       (firebase-admin o el SDK web con fetch polyfill).
 *    3. ts-node firebase-seed.ts
 * ============================================================
 */

import { ref, set } from 'firebase/database';
import { database } from '../../core/firebase/firebase.config';

// ─────────────────────────────────────────────
//  ESTRUCTURA COMPLETA DE CONTENIDO
// ─────────────────────────────────────────────

const contenido = {

  // ──────────────────────────────────────────
  //  HOME (index.json)
  // ──────────────────────────────────────────
  home: {
    hero: {
      imageSrc: 'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=500',
      imageAlt: 'Banca Premium',
      title: 'Cuenta Nómina Premium',
      subtitle: 'Exclusividad en cada movimiento.',
      benefits: [
        'Gestor personal 24/7',
        'Tarjetas Black sin coste',
      ],
      ctaLink: '/cuentas/premium',
      ctaText: 'Información',
    },

    compromisoVerde: {
      imageSrc: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800',
      imageAlt: 'Bosque Imperium Sostenible',
      title: 'Compromiso Verde Imperium',
      subtitle: 'Tu dinero crece mientras protegemos el planeta.',
      benefits: [
        'Inversión en energías 100% renovables',
        'Tarjetas fabricadas con plástico reciclado del océano',
        'Por cada nueva cuenta, plantamos un árbol en tu nombre',
      ],
    },

    cards: [
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/4149/4149883.png',
        title: 'Excelencia Avalada',
        content:
          'El 92% de nuestros clientes activos recomienda Imperium a su círculo cercano por nuestra gestión impecable.',
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/2488/2488749.png',
        title: 'Patrimonio Inteligente',
        content:
          'Rentabilice su capital desde el primer día con tipos de interés líderes en el mercado y total disponibilidad de sus fondos.',
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/1162/1162953.png',
        title: 'Libertad Operativa',
        content:
          'Únase a la banca premium sin costes de mantenimiento. Una transición simplificada para una gestión financiera sin ataduras.',
      },
    ],

    benefits: [
      {
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=500',
        imageCaption: 'Tecnología de pago',
        title: 'Pago Contactless',
        content: 'Vincule sus tarjetas para compras instantáneas.',
      },
      {
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=500',
        imageCaption: 'Viajes',
        title: 'Zero Comisiones',
        content: 'Retire efectivo en cualquier lugar del mundo.',
      },
      {
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=500',
        imageCaption: 'Seguridad digital',
        title: 'Control Total',
        content: 'Gestione su seguridad desde nuestra App.',
      },
    ],
  },

  // ──────────────────────────────────────────
  //  SERVICIOS (services.json)
  // ──────────────────────────────────────────
  services: {
    hero: {
      imageSrc: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000',
      imageAlt: 'Banca de Inversión',
    },

    items: [
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/602/602258.png',
        title: 'Hipoteca',
        content: 'Soluciones de financiación para su hogar con tipos de interés preferenciales.',
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
        title: 'Seguros',
        content: 'Protección integral diseñada a la medida de sus necesidades y las de su familia.',
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/2488/2488749.png',
        title: 'Plan de Pensiones',
        content: 'Asegure su futuro con una gestión patrimonial experta y máxima rentabilidad.',
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/512/3522/3522533.png',
        title: 'Tarjetas',
        content: 'Acceso a servicios exclusivos y beneficios premium en cada una de sus compras.',
      },
    ],
  },

  // ──────────────────────────────────────────
  //  CUENTAS (accounts.json)
  // ──────────────────────────────────────────
  accounts: {
    personal: {
      imageSrc: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800',
      imageAlt: 'Gestión Patrimonial',
      title: 'Cuenta Personal Imperium',
      subtitle: 'La base de su libertad financiera con la solvencia de siempre.',
      benefits: [
        'Transferencias instantáneas gratuitas',
        'Acceso a red de cajeros global',
        'Soporte digital prioritario 24/7',
        'Seguro de protección ante fraude digital incluido',
        'Programa de fidelización con reembolsos en comercios aliados',
      ],
    },

    premium: {
      imageSrc: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200',
      imageAlt: 'Banca Privada Premium',
      title: 'Cuenta Premium Imperium',
      subtitle: 'Distinción y gestión experta para patrimonios exigentes.',
      benefits: [
        'Gestor patrimonial personal y exclusivo',
        'Tarjetas de metal con acceso a Salas VIP en aeropuertos',
        'Servicio de Conserjería 24/7 para reservas y eventos',
        'Seguros de viaje y protección de compras con cobertura total',
        'Condiciones preferenciales en préstamos e inversión',
      ],
    },

    business: {
      imageSrc: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
      imageAlt: 'Banca Corporativa Imperium',
      title: 'Cuenta Empresarial Imperium',
      subtitle:
        'Potencia el crecimiento de su negocio con herramientas financieras de alto rendimiento.',
      benefits: [
        'Gestión multiusuario con permisos de acceso personalizados',
        'Emisión ilimitada de tarjetas corporativas físicas y virtuales',
        'Integración directa con software de contabilidad y ERP',
        'Líneas de crédito comerciales con aprobación preferente',
        'Transferencias masivas de nóminas y pagos a proveedores sin coste',
      ],
    },
  },

  // ──────────────────────────────────────────
  //  SIMULADOR DE PRÉSTAMOS (loans.json)
  // ──────────────────────────────────────────
  loans: {
    defaults: {
      amount: 10000,
      term: 24,
      rate: 4.50,
    },
    fields: [
      {
        fieldId: 'loan-amount',
        labelName: 'Capital solicitado (€)',
        fieldType: 'number',
        placeholder: 'Ej: 50000',
        defaultValue: 10000,
      },
      {
        fieldId: 'loan-term',
        labelName: 'Plazo de amortización (Meses)',
        fieldType: 'number',
        placeholder: 'Ej: 48',
        defaultValue: 24,
      },
      {
        fieldId: 'interest-rate',
        labelName: 'TIN Anual (%)',
        fieldType: 'number',
        placeholder: 'Ej: 5.25',
        defaultValue: 4.50,
      },
    ],
  },

  // ──────────────────────────────────────────
  //  LOGIN (login.json)
  // ──────────────────────────────────────────
  login: {
    imageSrc: 'https://images.unsplash.com/photo-1616803140344-6682afb13cda?auto=format&fit=crop&q=80&w=800',
    imageAlt: 'Imagen Decorativa Imperium',
    title: 'Te damos la bienvenida',
    subtitle: 'Hola, introduce tu usuario y clave de acceso para continuar.',
    labelUser: 'Usuario',
    placeholderUser: 'Email, NIF o NIE',
    labelPass: 'Contraseña',
    linkForgot: '¿Olvidó la contraseña?',
    linkSignup: '¿No eres cliente?',
    submitText: 'Entrar',
  },

  // ──────────────────────────────────────────
  //  REGISTRO (register.json)
  // ──────────────────────────────────────────
  register: {
    fields: [
      {
        fieldId: 'name',
        labelName: 'Nombre',
        fieldType: 'text',
        placeholder: 'Ej: Laura',
        validation: { required: true, pattern: '[a-zA-ZÁ-Úá-úÑñ ]+', title: 'Solo se permiten letras' },
      },
      {
        fieldId: 'surname',
        labelName: 'Apellidos',
        fieldType: 'text',
        placeholder: 'Ej: Pérez García',
        validation: { required: true, pattern: '[a-zA-ZÁ-Úá-úÑñ ]+', title: 'Solo se permiten letras' },
      },
      {
        fieldId: 'email',
        labelName: 'Correo Electrónico',
        fieldType: 'email',
        placeholder: 'usuario@correo.com',
        validation: { required: true },
      },
      {
        fieldId: 'phone',
        labelName: 'Teléfono',
        fieldType: 'tel',
        placeholder: '600 000 000',
        validation: { required: true, pattern: '[0-9]{9}', title: 'Debe introducir 9 dígitos' },
      },
      {
        fieldId: 'birthdate',
        labelName: 'Fecha de nacimiento',
        fieldType: 'date',
        placeholder: 'DD/MM/AAAA',
        validation: { required: true },
      },
      {
        fieldId: 'address',
        labelName: 'Dirección',
        fieldType: 'text',
        placeholder: 'Calle, num, piso, letra',
        validation: { required: true },
      },
      {
        fieldId: 'zip',
        labelName: 'Código Postal',
        fieldType: 'text',
        placeholder: '00000',
        validation: { required: true, pattern: '[0-9]{5}', title: 'Debe contener 5 números' },
      },
      {
        fieldId: 'password',
        labelName: 'Contraseña',
        fieldType: 'password',
        placeholder: 'Crea una contraseña',
        validation: { required: true, minlength: 8, title: 'Mínimo 8 caracteres' },
      },
      {
        fieldId: 'confirm-password',
        labelName: 'Confirmar Contraseña',
        fieldType: 'password',
        placeholder: 'Repite la contraseña',
        validation: {},
      },
    ],
    submitText: 'Completar Registro',
  },

  // ──────────────────────────────────────────
  //  OPERACIONES: TRANSFERENCIA (transfer.json)
  // ──────────────────────────────────────────
  transfer: {
    titulo: 'Realizar Transferencia',
    fields: [
      {
        fieldId: 'nombre',
        labelName: 'Nombre del beneficiario',
        fieldType: 'text',
        placeholder: 'Nombre Completo',
      },
      {
        fieldId: 'iban',
        labelName: 'Número de cuenta (IBAN)',
        fieldType: 'text',
        placeholder: 'ESXX XXXX XXXX XXXX XXXX XXXX',
      },
      {
        fieldId: 'importe',
        labelName: 'Importe',
        fieldType: 'number',
        placeholder: '0.0',
      },
      {
        fieldId: 'concepto',
        labelName: 'Concepto',
        fieldType: 'text',
        placeholder: 'Motivo de la transferencia',
      },
    ],
    buttons: {
      clear: 'Borrar',
      cancel: 'Cancelar',
      submit: 'Transferir',
    },
  },

  // ──────────────────────────────────────────
  //  OPERACIONES: PAGAR SERVICIOS (pay-services.json)
  // ──────────────────────────────────────────
  payServices: {
    titulo: 'Pagar Servicios',
    fields: [
      {
        fieldId: 'servicio',
        labelName: 'Tipo de servicio',
        fieldType: 'text',
        placeholder: 'Nombre Servicio',
      },
      {
        fieldId: 'referencia',
        labelName: 'Número de referencia',
        fieldType: 'text',
        placeholder: 'Ref. de la factura',
      },
      {
        fieldId: 'importe',
        labelName: 'Importe',
        fieldType: 'number',
        placeholder: '0.0',
      },
      {
        fieldId: 'concepto',
        labelName: 'Concepto (Opcional)',
        fieldType: 'text',
        placeholder: 'Detalles adicionales',
      },
    ],
    buttons: {
      clear: 'Borrar',
      cancel: 'Cancelar',
      submit: 'Pagar Ahora',
    },
  },

  // ──────────────────────────────────────────
  //  OPERACIONES: RECARGA (top-up.json)
  // ──────────────────────────────────────────
  topUp: {
    titulo: 'Recargar',
    fields: [
      {
        fieldId: 'operador',
        labelName: 'Operador',
        fieldType: 'text',
        placeholder: 'Nombre Operador',
      },
      {
        fieldId: 'telefono',
        labelName: 'Número de teléfono',
        fieldType: 'tel',
        placeholder: '600 000 000',
      },
      {
        fieldId: 'cantidad',
        labelName: 'Cantidad',
        fieldType: 'number',
        placeholder: '0.0',
      },
    ],
    buttons: {
      clear: 'Borrar',
      cancel: 'Cancelar',
      submit: 'Recargar',
    },
  },

  // ──────────────────────────────────────────
  //  FOOTER (footer.json)
  // ──────────────────────────────────────────
  footer: {
    copyright: 'Banco Imperium © 2026. Todos los derechos reservados.',
    links: {
      privacidad: '#',
      cookies: '#',
      legal: '#',
    },
    appstore: {
      link: '#',
      imgSrc: 'images/apple_logo.png',
      imgAlt: 'Descargar en App Store',
    },
    playstore: {
      link: '#',
      imgSrc: 'images/gp_logo.png',
      imgAlt: 'Descargar en Google Play',
    },
  },
};

// ─────────────────────────────────────────────
//  FUNCIÓN PRINCIPAL DE SEED
// ─────────────────────────────────────────────

export async function runSeed(): Promise<void> {
  console.log('🌱 Iniciando seed de contenido en Firebase...\n');

  const secciones = Object.entries(contenido) as [string, unknown][];

  for (const [clave, valor] of secciones) {
    try {
      await set(ref(database, `contenido/${clave}`), valor);
      console.log(`  ✅ contenido/${clave}`);
    } catch (error) {
      console.error(`  ❌ contenido/${clave} →`, error);
    }
  }

  console.log('\n✨ Seed completado. Estructura en Firebase:');
  console.log('   contenido/');
  secciones.forEach(([clave]) => console.log(`     ├── ${clave}`));
}

// ─────────────────────────────────────────────
//  CÓMO USARLO EN UN COMPONENTE ANGULAR
// ─────────────────────────────────────────────
//
//  // seed.component.ts
//  import { Component, OnInit } from '@angular/core';
//  import { runSeed } from './firebase-seed';
//
//  @Component({
//    selector: 'app-seed',
//    standalone: true,
//    template: `<p>Ejecutando seed... revisa la consola.</p>`
//  })
//  export class SeedComponent implements OnInit {
//    async ngOnInit() {
//      await runSeed();
//    }
//  }
//
//  // app.routes.ts (solo en development)
//  { path: 'seed', component: SeedComponent }
