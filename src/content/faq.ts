/**
 * Preguntas frecuentes (auditoría 4.10). v1: las 7 primeras; la n.º 8 (plazo forzoso y factura) queda para la v2,
 * cuando esté decidida la política real (D12). Esta lista es la única fuente: la usa el acordeón y, en G7, el JSON-LD.
 * Sin "Mapa de Fugas" (v1) y con la respuesta de precios coherente con "cotización tras el diagnóstico".
 */
export type FaqItem = { question: string; answer: string };

export const FAQ_ITEMS: ReadonlyArray<FaqItem> = [
  {
    question: "¿Por dónde empiezo?",
    answer:
      "Por Detectar: una llamada de 15 minutos y te damos un diagnóstico claro de por dónde empezar. Es gratis y sin compromiso.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "Depende de lo que automaticemos; te damos una cotización clara tras el diagnóstico gratuito.",
  },
  {
    question: "¿Tengo que cambiar mi número de WhatsApp?",
    answer:
      "No. Conservas tu número y puedes seguir contestando desde tu celular cuando quieras.",
  },
  {
    question: "¿Y si el agente contesta algo mal?",
    answer: "Solo responde con la información que tú apruebas. Lo que no sabe te lo pasa a ti.",
  },
  {
    question: "¿Necesito saber de tecnología?",
    answer: "No. Te entregamos todo funcionando y te enseñamos a usar tu panel.",
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
