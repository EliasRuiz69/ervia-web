import { ChartColumn, MessageCircle, Search, type LucideIcon } from "lucide-react";

import { WHATSAPP_NUMBER } from "@/config/site";

/**
 * ÚNICA fuente de datos de los servicios de la home (plan multiservicio v2, sección 3.2).
 * La banda y la página de tesis NO van aquí: tienen su propio src/config/tesis.ts (Fase 4b).
 *
 * Quién lo usa: chips del hero, sección Servicios (pestañas y tarjetas), formulario ("¿Qué te interesa?"),
 * footer, JSON-LD (hasOfferCatalog) y llms.txt. Los textos son los del plan, sin cambios.
 */

/** Bloques por resultado (decisión M2). El id es el que se usa en el hash de la pestaña: #servicios-<id>. */
export type BloqueId = "encuentren" | "atiende" | "ordena";

export type Bloque = {
  id: BloqueId;
  titulo: string;
  icono: LucideIcon;
};

export const BLOQUES: readonly Bloque[] = [
  { id: "encuentren", titulo: "Que te encuentren", icono: Search },
  { id: "atiende", titulo: "Atiende y vende solo", icono: MessageCircle },
  { id: "ordena", titulo: "Ordena y decide", icono: ChartColumn },
];

/** Pestaña abierta por defecto (WhatsApp es la estrella). */
export const BLOQUE_POR_DEFECTO: BloqueId = "atiende";

export type ServiceId =
  | "pagina-web"
  | "correo-profesional"
  | "whatsapp"
  | "llamadas"
  | "recordatorios"
  | "crm"
  | "tareas-automaticas"
  | "facturas"
  | "tablero";

/** Id del componente de mini-demo (src/components/demos/, Fases 2 y 3). */
export type DemoId =
  | "pagina-web"
  | "correo"
  | "whatsapp"
  | "llamadas"
  | "recordatorios"
  | "crm"
  | "tareas"
  | "facturas"
  | "tablero";

export type Service = {
  /** Slug estable: id de la tarjeta en el DOM (`servicio-<id>`) y valor de la lista blanca del formulario. */
  id: ServiceId;
  bloque: BloqueId;
  nombre: string;
  /** Término técnico, pequeño y en gris entre paréntesis; solo si existe. */
  nombreTecnico?: string;
  /** Etiqueta corta del chip del hero (plan 3.1). */
  chip: string;
  promesa: string;
  ejemplo: string;
  demo: DemoId;
  /** Tarjeta destacada (badge "El más pedido"). */
  destacado: boolean;
  /** Texto precargado de WhatsApp al pulsar "Lo quiero →". Distinto en cada servicio. */
  waText: string;
  /** Texto alternativo de la mini-demo (la animación va con aria-hidden). */
  altDemo: string;
};

export const SERVICES: readonly Service[] = [
  /* ---------------------------- Que te encuentren ---------------------------- */
  {
    id: "pagina-web",
    bloque: "encuentren",
    nombre: "Tu página web a medida",
    chip: "Página web",
    promesa: "Una página rápida que explica lo que vendes y te manda clientes a WhatsApp.",
    ejemplo: "Ejemplo: alguien busca “taller en Mérida”, te encuentra y te escribe.",
    demo: "pagina-web",
    destacado: false,
    waText: "Hola, me interesa una página web a medida para mi negocio.",
    altDemo:
      "Ejemplo: los bloques de una página web se acomodan y aparece el aviso “Nuevo cliente desde tu web”.",
  },
  {
    id: "correo-profesional",
    bloque: "encuentren",
    nombre: "Tu dominio y correo profesional",
    chip: "Correo profesional",
    promesa: "Deja el @gmail. Usa tunegocio.com y ventas@tunegocio.com.",
    ejemplo: "Da confianza desde el primer correo.",
    demo: "correo",
    destacado: false,
    waText: "Hola, me interesa un dominio y correo profesional para mi negocio.",
    altDemo:
      "Ejemplo: en una tarjeta de presentación, un correo de gmail se tacha y se escribe uno con el dominio del negocio.",
  },

  /* --------------------------- Atiende y vende solo --------------------------- */
  {
    id: "whatsapp",
    bloque: "atiende",
    nombre: "Asistente de WhatsApp",
    chip: "WhatsApp",
    promesa: "Contesta, cotiza y agenda las 24 horas, con tu mismo número.",
    ejemplo: "Ejemplo: a las 11 de la noche alguien pide precio y sale con cita.",
    demo: "whatsapp",
    destacado: true,
    waText: "Hola, me interesa el asistente de WhatsApp para mi negocio.",
    altDemo:
      "Ejemplo: un cliente pregunta precio por WhatsApp, el asistente contesta y aparece “Cita agendada”.",
  },
  {
    id: "llamadas",
    bloque: "atiende",
    nombre: "Asistente de llamadas",
    chip: "Llamadas",
    promesa: "Contesta el teléfono cuando tú no puedes y agenda la cita.",
    ejemplo: "Ninguna llamada se va al buzón.",
    demo: "llamadas",
    destacado: false,
    waText: "Hola, me interesa el asistente de llamadas para mi negocio.",
    altDemo:
      "Ejemplo: un teléfono vibra, el asistente contesta y aparece la tarjeta “Cita: jueves 10:00”.",
  },
  {
    id: "recordatorios",
    bloque: "atiende",
    nombre: "Recordatorios y clientes que regresan",
    chip: "Recordatorios",
    promesa: "Confirma citas un día antes y escribe a quien hace tiempo no viene.",
    ejemplo: "Ejemplo: “Hace 6 meses de tu último servicio. ¿Agendamos?”",
    demo: "recordatorios",
    destacado: false,
    waText: "Hola, me interesan los recordatorios de citas y reactivar clientes.",
    altDemo:
      "Ejemplo: en un calendario aparecen palomitas de confirmación y un mensaje sale hacia un cliente que no ha vuelto.",
  },

  /* ------------------------------ Ordena y decide ------------------------------ */
  {
    id: "crm",
    bloque: "ordena",
    nombre: "Tus clientes en un solo lugar",
    nombreTecnico: "CRM a medida",
    chip: "Clientes (CRM)",
    promesa: "Quién preguntó, quién compró y a quién llamar hoy. Todo en una pantalla.",
    ejemplo: "Hecho a la medida de cómo vendes tú.",
    demo: "crm",
    destacado: false,
    waText: "Hola, me interesa tener mis clientes en un solo lugar (CRM a medida).",
    altDemo:
      "Ejemplo: las tarjetas de clientes pasan de la columna “Preguntó” a “Cotizado” y luego a “Cliente”.",
  },
  {
    id: "tareas-automaticas",
    bloque: "ordena",
    nombre: "Tareas repetitivas en automático",
    chip: "Tareas automáticas",
    promesa: "Lo que haces a mano todos los días (copiar, pegar, avisar, enviar) se hace solo.",
    ejemplo: "Ejemplo: llega un pedido y se avisa a tu equipo sin que muevas un dedo.",
    demo: "tareas",
    destacado: false,
    waText: "Hola, me interesa automatizar tareas repetitivas de mi negocio.",
    altDemo:
      "Ejemplo: tres íconos en cadena (correo, hoja de cálculo y aviso) se encienden en orden sin intervención.",
  },
  {
    id: "facturas",
    bloque: "ordena",
    nombre: "Captura de facturas",
    chip: "Facturas",
    promesa:
      "Mándanos tus facturas por WhatsApp o correo. Se leen solas y quedan en tu hoja, listas para tu contador.",
    ejemplo: "Funciona con XML y PDF del SAT.",
    demo: "facturas",
    destacado: false,
    waText: "Hola, me interesa la captura de facturas.",
    altDemo:
      "Ejemplo: una factura se lee sola y sus datos (RFC, fecha y total) pasan a una tabla.",
  },
  {
    id: "tablero",
    bloque: "ordena",
    nombre: "El tablero de tu negocio",
    nombreTecnico: "dashboard",
    chip: "Tablero",
    promesa: "Ventas, citas y gastos del mes en una sola pantalla, desde tu celular.",
    ejemplo: "Decides con datos, no con corazonadas.",
    demo: "tablero",
    destacado: false,
    waText: "Hola, me interesa el tablero de mi negocio (ventas, citas y gastos).",
    altDemo:
      "Ejemplo: unas barras crecen y una cifra sube en un tablero de ventas. Los datos son de ejemplo.",
  },
];

/** Servicios de un bloque, en el orden del plan. */
export function serviciosDeBloque(bloque: BloqueId): Service[] {
  return SERVICES.filter((s) => s.bloque === bloque);
}

/** Hash de la pestaña de un bloque (`#servicios-atiende`); lo usan los chips del hero y, en la Fase 2, las pestañas. */
export function bloqueHash(bloque: BloqueId): string {
  return `#servicios-${bloque}`;
}

/** https://wa.me/<número>?text=<waText del servicio>. */
export function serviceWhatsappUrl(service: Pick<Service, "waText">): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(service.waText)}`;
}
