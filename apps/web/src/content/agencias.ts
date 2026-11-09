/* Planes para agencias de viaje y turismo (09-11-2026, pedido de Ignacio).
   Precios netos en CLP: se suma IVA. Los usa /agencias (tarjetas, tabla,
   JSON-LD) y la imagen /og/agencias. Si cambia un precio, cambia acá y nada más.
   El alta de agencias no es autoservicio todavía: todos los botones van al
   WhatsApp comercial.
   09-11-2026 (tarde): también lo usan /agencias/[tipo] (content/agencias-tipos.ts),
   /agente-ia-omnicanal, /crm-whatsapp y la sección de agencias de /llms.txt. */

export type PlanAgencia = {
  id: string;
  nombre: string;
  mes: number;
  /** "+ IVA / mes" o, para lo que se suma a otro plan, "+ IVA / mes por marca". */
  unidad: string;
  /** Precio que se suma a un plan (se muestra con "+" delante). */
  suma?: boolean;
  para: string;
  incluye: string[];
  nota?: string;
  etiqueta?: string;
  /** Texto del WhatsApp prellenado de la tarjeta. */
  wa: string;
  /** Conversaciones al mes que trae (o suma) el plan. */
  conversaciones: number;
};

export const WA_AGENCIAS = "Hola, tengo una agencia y quiero saber de los planes para agencias";

const CONV_SOLO = 150;
const CONV_EQUIPO = 500;
const CONV_MARCA = 300;

export const AGENCIA_SOLO: PlanAgencia = {
  id: "agencia-solo",
  nombre: "Agencia Solo",
  mes: 24900,
  unidad: "+ IVA / mes",
  para: "Para quien vende solo o con un socio.",
  conversaciones: CONV_SOLO,
  incluye: [
    `Asistente con IA en tu WhatsApp, con ${CONV_SOLO} conversaciones al mes`,
    "Responde en español, portugués e inglés, y cotiza en pesos o en reales",
    "Cargas tu catálogo pegando la lista de precios o una foto del afiche",
    "Tablero de ventas con quién preguntó, a quién se le cotizó y quién compró",
    "A las 48 horas le pregunta \"¿sigues interesado?\" a quien quedó callado",
    "Syna, tu secretaria por WhatsApp",
  ],
  nota: "Instagram se suma por $19.900 + IVA al mes.",
  wa: "Hola, tengo una agencia y me interesa el plan Agencia Solo",
};

export const AGENCIA_EQUIPO: PlanAgencia = {
  id: "agencia-equipo",
  nombre: "Agencia Equipo",
  mes: 79900,
  unidad: "+ IVA / mes",
  para: "Para agencias con un equipo de vendedoras.",
  conversaciones: CONV_EQUIPO,
  incluye: [
    "Todo lo de Agencia Solo",
    "El asistente también en los mensajes de Instagram",
    `${CONV_EQUIPO} conversaciones al mes entre WhatsApp e Instagram`,
    "Vendedoras ilimitadas, cada una con su app y su cartera",
    "Reparto automático de chats y aviso al celular de quien le toca",
    "Cierre de venta desde el mismo chat, con monto y pasajeros",
    "Comisiones por vendedora calculadas solas a fin de mes",
    "Seguimiento en lote desde el tablero a quienes escribieron hoy",
    "Resultados de tus anuncios de Meta: cuántos escribieron y cuánto invertiste",
  ],
  etiqueta: "El más elegido",
  wa: "Hola, tengo una agencia y me interesa el plan Agencia Equipo",
};

/** Agencia Equipo pagado una vez al año: 10 meses, se usan 12. */
export const AGENCIA_EQUIPO_ANUAL = { anio: 799000, pagas: 10 };

export const MARCA_ADICIONAL: PlanAgencia = {
  id: "marca-adicional",
  nombre: "Marca o número adicional",
  mes: 39900,
  unidad: "+ IVA / mes",
  suma: true,
  para: "Si vendes con dos marcas o necesitas un segundo número.",
  conversaciones: CONV_MARCA,
  incluye: [
    "Un segundo WhatsApp con su propio asistente y su catálogo",
    `${CONV_MARCA} conversaciones más al mes`,
    "Las mismas vendedoras atienden las dos marcas desde una sola app",
    "Ventas y comisiones separadas por marca",
  ],
  nota: "Ejemplo: dos marcas con Instagram quedan en $119.800 + IVA al mes.",
  wa: "Hola, tengo una agencia con más de una marca y quiero saber cómo funciona la marca adicional",
};

export const PLANES_AGENCIA = [AGENCIA_SOLO, AGENCIA_EQUIPO, MARCA_ADICIONAL];

export type AdicionalAgencia = { id: string; nombre: string; mes: number; unidad: string; detalle: string };

export const ADICIONALES_AGENCIA: AdicionalAgencia[] = [
  { id: "meta", nombre: "Anuncios en Meta gestionados", mes: 49900, unidad: "+ IVA / mes",
    detalle: "Campañas en Facebook e Instagram, por ejemplo hacia pasajeros de Brasil. Los chats entran directo al asistente y cada semana te llega un reporte." },
  { id: "google", nombre: "Anuncios en Google gestionados", mes: 49900, unidad: "+ IVA / mes",
    detalle: "Campañas en Google armadas y revisadas por nosotros." },
  { id: "combo", nombre: "Combo Meta + Google", mes: 79900, unidad: "+ IVA / mes",
    detalle: "Las dos gestiones juntas." },
  { id: "presencia", nombre: "Presencia en Google", mes: 24900, unidad: "+ IVA / mes",
    detalle: "Página web con tu dominio y tu ficha de Google." },
  { id: "instagram", nombre: "Asistente en Instagram", mes: 19900, unidad: "+ IVA / mes",
    detalle: "Para Agencia Solo. En Agencia Equipo ya viene incluido." },
  { id: "conversaciones", nombre: "Conversaciones extra", mes: 9900, unidad: "+ IVA cada 100",
    detalle: "Si pasas las de tu plan, el asistente sigue contestando." },
];

/** Temporada baja: hasta 3 meses al año, Agencia Equipo a este precio. */
export const TEMPORADA_BAJA = { mes: 39900, meses: 3, conversaciones: 150 };

/** Lo que trae siempre la instalación (tarjeta "Sin costo de instalación"). En
    palabras de turismo: los otros tipos de agencia lo pasan por adaptar(). */
export const INSTALACION_AGENCIA = [
  "Conectamos tu WhatsApp e Instagram",
  "Cargamos tu catálogo de paseos y traslados",
  "Capacitamos a tus vendedoras por videollamada",
  "30 días de prueba",
  "Sin permanencia",
];

export const adicionalAgencia = (id: string) => ADICIONALES_AGENCIA.find((a) => a.id === id)!;

/** Pares [texto de la versión de turismo, texto para otro tipo de agencia]. */
export type Reemplazos = [string, string][];

/* Cambia las palabras de turismo ("vendedoras", "pasajeros", "paseos") por las
   de otro tipo de agencia. Los nombres de los planes y los precios no cambian. */
export function adaptar(texto: string, reemplazos: Reemplazos = []) {
  return reemplazos.reduce((t, [de, a]) => t.split(de).join(a), texto);
}

export function adaptarPlan(p: PlanAgencia, reemplazos: Reemplazos = []): PlanAgencia {
  if (!reemplazos.length) return p;
  const r = (t: string) => adaptar(t, reemplazos);
  return { ...p, para: r(p.para), incluye: p.incluye.map(r), nota: p.nota && r(p.nota), wa: r(p.wa) };
}
