import type { CardData } from "@/config/services";
import { WHATSAPP_NUMBER } from "@/config/site";
import type { FaqItem } from "@/content/faq";

/**
 * Servicio de tesis (otro público: personas, no pymes). Plan multiservicio v2: secciones 1.1, 3.8 (banda de la
 * home) y 3.9 (página /tesis). Todo el contenido de tesis vive aquí; el servicio NO va en services.ts.
 *
 * REGLA DE CONTENIDO OBLIGATORIA: el autor es el tesista. Nunca se escribe "te escribimos/redactamos tu tesis",
 * "tesis lista", "entrega garantizada" ni nada que ofrezca evadir detectores de IA o plagio. Esas frases solo
 * pueden aparecer NEGADAS, en "Lo que no hacemos".
 */

/**
 * Interruptor de la página /tesis. Con `false`: el CTA de la banda y el enlace del footer van a WhatsApp con el
 * texto de tesis, y /tesis no se enlaza desde ningún sitio.
 */
export const TESIS_PAGE_ENABLED = true;

/** Texto precargado de WhatsApp para todo lo de tesis. */
export const TESIS_WA_TEXT = "Hola, estoy haciendo mi tesis y necesito ayuda";

export const TESIS_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(TESIS_WA_TEXT)}`;

export const TESIS_PATH = "/tesis";

/* ------------------------------------------------------------------ *
 * SEO de /tesis (plan 3.7)
 * ------------------------------------------------------------------ */
export const TESIS_SEO = {
  title: "Te ayudamos con tu tesis: ordena tu información y cita bien con IA | ERVIA",
  description:
    "Ordenamos tus fuentes, verificamos tus citas y damos formato a la norma de tu universidad. Tú sigues siendo el autor. Diagnóstico gratis de 15 minutos.",
} as const;

/* ------------------------------------------------------------------ *
 * Banda de la home (3.8)
 * ------------------------------------------------------------------ */
export type TesisPunto = { icon: "fuentes" | "citas" | "formato"; text: string };

export const TESIS_BANDA = {
  eyebrow: "Para estudiantes e investigadores",
  /** [antes, destacada en verde, después]: el verde va solo en "montaña". */
  h2: ["¿Tu tesis es una ", "montaña", " de información?"] as const,
  text: "Te ayudamos a ordenarla, sacar conclusiones y entregar a tiempo. Tú sigues siendo el autor.",
  puntos: [
    { icon: "fuentes", text: "Ordenamos tus fuentes y te damos un resumen de cada una" },
    { icon: "citas", text: "Verificamos que cada cita exista y diga lo que afirmas" },
    { icon: "formato", text: "Formato a la norma de tu universidad (APA, Vancouver, IEEE…)" },
  ] as ReadonlyArray<TesisPunto>,
  cta: "Ver cómo te ayudamos",
  ctaSecundario: "Escríbenos por WhatsApp",
  altDemo:
    "Ejemplo: una pila de PDF desordenados se acomoda en una tabla de fuentes (autor, año y hallazgo) y una cita recibe la marca “Verificada”.",
} as const;

/* ------------------------------------------------------------------ *
 * Página /tesis (3.9)
 * ------------------------------------------------------------------ */

/** Nav propio de /tesis: Cómo te ayudamos · Cómo trabajamos · FAQ · [WhatsApp] [Diagnóstico gratis]. */
export const TESIS_NAV_LINKS = [
  { href: "/tesis#como-te-ayudamos", label: "Cómo te ayudamos" },
  { href: "/tesis#como-trabajamos", label: "Cómo trabajamos" },
  { href: "/tesis#faq", label: "FAQ" },
] as const;

export const TESIS_HEADER_CTA = { href: "/tesis#contacto", label: "Diagnóstico gratis" } as const;

/** 1. Hero */
export const TESIS_HERO = {
  eyebrow: "Acompañamiento de tesis con IA · Licenciatura, maestría y doctorado",
  /**
   * H1, opción A (recomendada): [antes, destacada en verde, después].
   * Opción B: "De una montaña de PDF a una tesis <verde>clara y bien citada</verde>."
   * Opción C: "Termina tu tesis a tiempo, <verde>sin arriesgar tu título</verde>."
   */
  h1: ["Tienes la información. Te ayudamos a convertirla en ", "tu tesis", "."] as const,
  subtitle:
    "Ordenamos tus fuentes, te ayudamos a sacar conclusiones y revisamos que cada cita sea real y esté en el formato que pide tu universidad. Tú escribes con tu voz; nosotros quitamos el trabajo pesado.",
  ctaPrimario: "Diagnóstico gratis (15 min)",
  ctaSecundario: "Escríbenos por WhatsApp",
} as const;

/** 2. "Cómo te ayudamos": 5 tarjetas con el mismo tipo que las de services.ts. */
export const TESIS_AYUDA = {
  eyebrow: "Cómo te ayudamos",
  /** [antes, destacada en verde, después]: el verde va solo en "pesado". Texto indicado por Elias el 3/11/2026. */
  h2: ["Te quitamos el trabajo ", "pesado", ". Tú pones las ideas."] as const,
} as const;

export const TESIS_CARDS: ReadonlyArray<CardData> = [
  {
    id: "tesis-ordenar",
    nombre: "Ordenamos tu montaña de información",
    promesa: "Clasificamos tus artículos, libros y notas, y te damos un resumen de cada uno.",
    demo: "tesis-ordenar",
    waText: "Hola, estoy haciendo mi tesis y me interesa ordenar mi información",
    altDemo: "Ejemplo: PDF sueltos caen en carpetas por tema.",
  },
  {
    id: "tesis-tabla",
    nombre: "Tabla comparativa de tus fuentes",
    promesa:
      "Todas tus fuentes en una tabla: autor, método, hallazgos y en qué coinciden o se contradicen.",
    demo: "tesis-tabla",
    waText: "Hola, estoy haciendo mi tesis y me interesa la tabla comparativa de mis fuentes",
    altDemo: "Ejemplo: las filas de una tabla se llenan solas con autor, año, método y hallazgo de cada fuente.",
  },
  {
    id: "tesis-asistente",
    nombre: "Tu asistente privado de investigación",
    promesa:
      "Pregúntale a tus documentos y te responde citando la página exacta. Solo usa tus fuentes y es solo para ti.",
    demo: "tesis-asistente",
    waText: "Hola, estoy haciendo mi tesis y me interesa el asistente privado de investigación",
    altDemo: "Ejemplo: una pregunta sobre tus documentos recibe una respuesta con la etiqueta de la página, “p. 42”.",
  },
  {
    id: "tesis-esquema",
    nombre: "Esquema y borradores de apoyo",
    promesa:
      "Te proponemos la estructura de capítulos y borradores de apoyo a partir de tus notas. Tú los reescribes con tu voz.",
    demo: "tesis-esquema",
    waText: "Hola, estoy haciendo mi tesis y me interesa el esquema y los borradores de apoyo",
    altDemo:
      "Ejemplo: un índice de capítulos se arma y un párrafo de apoyo lleva el sello “Borrador: reescríbelo tú”.",
  },
  {
    id: "tesis-citas",
    nombre: "Citas verificadas y formato a la norma",
    promesa:
      "Comprobamos que cada referencia exista y diga lo que afirmas. Y damos formato APA, Vancouver, IEEE o el que pida tu universidad.",
    demo: "tesis-citas",
    waText: "Hola, estoy haciendo mi tesis y me interesa la verificación de citas y el formato",
    altDemo:
      "Ejemplo: en una lista de referencias, una marca “No existe” y las demás “Verificada”; después se ordenan en formato APA.",
  },
];

/** 3. "Lo que hacemos y lo que no": el elemento de confianza. */
export const TESIS_LIMITES = {
  h2: ["Lo que ", "hacemos", " y lo que no"] as const,
  si: {
    titulo: "Sí hacemos",
    items: [
      "Ordenar tus fuentes",
      "Resumir",
      "Comparar fuentes",
      "Proponer estructura",
      "Borradores de apoyo",
      "Verificar citas",
      "Formato",
      "Corrección de estilo",
      "Ayudarte a redactar tu declaración de uso de IA",
    ],
  },
  no: {
    titulo: "No hacemos",
    items: [
      "Escribir tu tesis por ti",
      "Entregar texto para que lo presentes como propio sin revisarlo",
      "Inventar datos o referencias",
      "“Maquillar” texto para engañar detectores",
    ],
  },
  remate:
    "Así usas la IA como herramienta, como lo permiten las universidades, y tu título queda protegido.",
} as const;

/** 4. "Cómo trabajamos": 3 pasos (no son los del Método ERVIA). */
export const TESIS_PASOS = {
  eyebrow: "Cómo trabajamos",
  /** [antes, destacada en verde]. Título nuestro (el plan solo nombra el bloque): pendiente de tu visto bueno. */
  h2: ["Así te acompañamos, ", "paso a paso"] as const,
  steps: [
    {
      n: 1,
      name: "Diagnóstico gratis (15 min)",
      text: "Nos cuentas tu tema, cuánto llevas, tu fecha de entrega y la norma de tu universidad.",
      free: true,
    },
    {
      n: 2,
      name: "Ordenamos y te acompañamos",
      text: "Recibimos tus documentos, armamos la tabla y tu asistente privado, y revisamos avances contigo.",
    },
    {
      n: 3,
      name: "Revisión final",
      text: "Verificamos citas, damos formato y te ayudamos con la declaración de uso de IA antes de entregar.",
    },
  ] as ReadonlyArray<{ n: 1 | 2 | 3; name: string; text: string; free?: boolean }>,
  /** Sin cifras (decisión M3). */
  precio: "Cotización tras el diagnóstico, según tu avance y el número de fuentes.",
} as const;

/** 5. FAQ: las 6 preguntas, en este orden (las usan el acordeón y, en la Fase 5, el JSON-LD FAQPage). */
export const TESIS_FAQ: ReadonlyArray<FaqItem> = [
  {
    question: "¿Esto está permitido por mi universidad?",
    answer:
      "Las universidades permiten usar la IA como herramienta y piden que el autor revise todo y lo declare. Trabajamos así: tú eres el autor y te ayudamos a declarar el uso de IA. Revisa siempre el reglamento de tu programa; te ayudamos a leerlo.",
  },
  {
    question: "¿Mis documentos están seguros?",
    answer:
      "Sí. Tus documentos se guardan en un servidor privado que administra ERVIA y solo los ven las personas que te acompañan. No se publican ni se comparten. Para analizarlos usamos la IA de Claude (Anthropic) con sus condiciones comerciales, que no usan tus documentos para entrenar sus modelos. Al terminar, los borramos de nuestro servidor en un máximo de 30 días, o antes si lo pides.",
  },
  {
    question: "¿Sirve para licenciatura, maestría y doctorado?",
    answer: "Sí. También para artículos, tesinas e informes de investigación.",
  },
  {
    question: "¿Qué normas manejan?",
    answer: "APA 7, Vancouver, IEEE, Chicago, Harvard, ISO 690 o la guía propia de tu universidad.",
  },
  {
    question: "¿Me escriben la tesis?",
    answer:
      "No. Te damos borradores de apoyo, estructura y revisión, pero el texto final lo escribes tú. Es lo que protege tu título.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "Depende de tu avance y del número de fuentes. Te damos una cotización clara tras el diagnóstico gratuito.",
  },
];

/** 6. CTA final + formulario. */
export const TESIS_CTA = {
  /** [antes, destacada en verde, después]: el verde va solo en "tesis". */
  h2: ["Empieza con un diagnóstico gratis: cuéntanos cómo va tu ", "tesis", "."] as const,
  subtitle: "15 minutos. Gratis. Sin compromiso.",
} as const;
