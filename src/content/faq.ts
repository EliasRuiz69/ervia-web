/**
 * Preguntas frecuentes (plan multiservicio v2, 3.5): 6 preguntas, en este orden. Esta lista es la única fuente:
 * la usa el acordeón y el JSON-LD FAQPage. Quitadas respecto a la v1: "¿Por dónde empiezo?" (la responde la 1),
 * "¿Tengo que cambiar mi número de WhatsApp?" (pasa al microcopy de la tarjeta de WhatsApp) y
 * "¿Y si el agente contesta algo mal?" (puede volver después). Respuestas con "texto actual" tomadas de la v1.
 */
export type FaqItem = { question: string; answer: string };

export const FAQ_ITEMS: ReadonlyArray<FaqItem> = [
  {
    question: "¿Tengo que contratar todo?",
    answer:
      "No. La mayoría empieza por un servicio, normalmente WhatsApp o la página web, y suma otros cuando ve resultados.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "Depende de lo que automaticemos; te damos una cotización clara tras el diagnóstico gratuito.",
  },
  {
    question: "¿Necesito saber de tecnología?",
    answer: "No. Te entregamos todo funcionando y te enseñamos a usar tu panel.",
  },
  {
    question: "¿Funciona con lo que ya uso?",
    answer:
      "Sí. Trabajamos con tu WhatsApp, tu correo, tus hojas de cálculo y tu facturación actual. No tienes que cambiar de sistema.",
  },
  {
    question: "¿Dónde quedan mis datos y los de mis clientes?",
    answer:
      "En un servidor dedicado solo para tu negocio. Cumplimos la Ley Federal de Protección de Datos Personales (LFPDPPP).",
  },
  {
    question: "¿Cuánto tarda?",
    answer: "Detectar: 1 semana. Automatizar: de 2 a 4 semanas.",
  },
];
