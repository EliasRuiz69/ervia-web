/**
 * Conversaciones de ejemplo del mockup del hero (auditoría 3.4).
 * v1: SOLO la del taller. Para la v2, añade las de consultorio y restaurante (solo los giros con demo, D3):
 * con más de una entrada el mockup muestra pestañas de giro y las rota.
 *
 * Texto literal de la auditoría. El único dato añadido es el precio ($1,200), indicado por el dueño.
 * Es una conversación de ejemplo: así se etiqueta en pantalla ("Conversación de ejemplo").
 */
export type ChatMessage = {
  from: "client" | "agent";
  text: string;
  /** Hora visible en la burbuja (HH:MM). */
  time: string;
};

export type Conversation = {
  id: string;
  /** Giro que aparece en la pestaña cuando hay más de una conversación. */
  vertical: string;
  /** Nombre del negocio en la cabecera del chat (genérico: no es un cliente real). */
  contactName: string;
  messages: ChatMessage[];
  /** Chips de resultado al final (verde = resultado, regla D-J). */
  results: string[];
  /** Resumen para lectores de pantalla (el mockup es decorativo). */
  summary: string;
};

export const HERO_CONVERSATIONS: Conversation[] = [
  {
    id: "taller",
    vertical: "Taller",
    contactName: "Taller mecánico",
    messages: [
      {
        from: "client",
        text: "Buenas noches, ¿cuánto cuesta una afinación para un Versa 2021?",
        time: "22:47",
      },
      {
        from: "agent",
        text: "¡Hola! La afinación empieza en $1,200. ¿Te agendo? Tengo lugar mañana a las 9:00 o a las 11:00.",
        time: "22:47",
      },
      { from: "client", text: "Mañana a las 9 👍", time: "22:47" },
      { from: "agent", text: "Listo, te espero mañana a las 9:00 ✅", time: "22:47" },
    ],
    results: ["Cita agendada", "Cliente registrado", "0 mensajes pendientes"],
    summary:
      "Ejemplo de conversación de WhatsApp en un taller: un cliente pregunta de noche cuánto cuesta una afinación, el agente le responde al instante con el precio y dos horarios, el cliente elige las 9:00 de mañana y el agente confirma la cita. Resultado: cita agendada, cliente registrado y 0 mensajes pendientes.",
  },
];
