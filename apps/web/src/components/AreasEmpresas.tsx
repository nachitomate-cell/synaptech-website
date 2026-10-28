"use client";
import { useState } from "react";

/* Áreas de /empresas (28-10-2026): la empresa elige qué quiere delegar y ve
   qué hace el agente y cómo se vería en rubros distintos. Los ejemplos son
   configuraciones de lo que la plataforma ya hace (catálogo, datos que pide,
   reparto, seguimiento, agenda por persona, abonos): si algo no está en
   content/catalogo.ts o content/recorrido.ts, no va acá. */

type Area = { id: string; nombre: string; titular: string; hace: string[]; ejemplos: { rubro: string; caso: string }[] };

const AREAS: Area[] = [
  {
    id: "ventas",
    nombre: "Ventas",
    titular: "Atiende al interesado en el minuto en que escribe, y no lo suelta.",
    hace: [
      "Responde y cotiza con tu catálogo y tu lista de precios.",
      "Pregunta lo que necesitas para calificar: presupuesto, comuna, fecha.",
      "Reparte cada conversación entre tus vendedores, por turnos.",
      "Retoma al que preguntó y dejó de responder.",
    ],
    ejemplos: [
      { rubro: "Inmobiliaria", caso: "Responde por cada proyecto, pregunta presupuesto y comuna, y le pasa el interesado al corredor de turno." },
      { rubro: "Alimentos", caso: "Toma el pedido de cafeterías y restaurantes con la lista de precios y el pedido mínimo, y se lo deja al vendedor." },
      { rubro: "Agencia digital", caso: "Pregunta qué sitio necesita y su presupuesto, y agenda la primera reunión con el ejecutivo." },
    ],
  },
  {
    id: "atencion",
    nombre: "Atención al cliente",
    titular: "Las mismas preguntas de siempre, respondidas al instante y bien.",
    hace: [
      "Responde con tu información: horarios, precios, políticas, despachos.",
      "Atiende WhatsApp e Instagram en una sola bandeja, con su historial.",
      "Pasa la conversación a tu equipo cuando el tema lo pide.",
      "Tú decides qué temas no toca nunca.",
    ],
    ejemplos: [
      { rubro: "Educación", caso: "Responde por cursos, horarios y aranceles, y pasa a secretaría lo que es de matrícula." },
      { rubro: "Logística", caso: "Responde tarifas y cobertura; si preguntan por un envío, pide el número y se lo pasa al equipo." },
      { rubro: "Salud", caso: "Explica cada prestación y su preparación, y deja los temas clínicos al equipo." },
    ],
  },
  {
    id: "agenda",
    nombre: "Agenda",
    titular: "Agenda visitas, evaluaciones y reuniones dentro del chat.",
    hace: [
      "Ofrece las horas que de verdad están libres, por persona o por sede.",
      "Pide los datos que definas antes de confirmar.",
      "Manda la confirmación, el recordatorio y la cita al calendario del cliente.",
      "Cada persona del equipo ve su día; tú ves todo.",
    ],
    ejemplos: [
      { rubro: "Servicio técnico", caso: "Agenda la visita con el técnico que tiene hora, con la dirección y el problema ya anotados." },
      { rubro: "Logística", caso: "Agenda el retiro en la bodega del cliente, con la dirección y el tamaño de la carga anotados." },
      { rubro: "Estudios y gimnasios", caso: "Agenda la clase de prueba y reserva cupos por sede." },
    ],
  },
  {
    id: "cobros",
    nombre: "Cobros",
    titular: "La hora o el cupo, asegurados con un pago.",
    hace: [
      "Pide un abono para confirmar, con Mercado Pago.",
      "El pago queda en la ficha del cliente, junto a su conversación.",
      "En el mesón, cobras con la máquina TUU y queda en la misma ficha.",
      "Ves lo cobrado por persona y por período.",
    ],
    ejemplos: [
      { rubro: "Servicio técnico", caso: "Cobra la visita por adelantado para que nadie deje al técnico esperando." },
      { rubro: "Educación", caso: "Cobra la reserva del cupo al inscribirse en un curso o taller." },
      { rubro: "Salud y estética", caso: "Pide un abono al agendar la evaluación, y la hora queda asegurada." },
    ],
  },
];

export default function AreasEmpresas() {
  const [activa, setActiva] = useState(AREAS[0].id);
  const area = AREAS.find((a) => a.id === activa) ?? AREAS[0];

  return (
    <section className="py-16 md:py-24 bg-mist">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-3xl mb-8">
          <p className="eyebrow mb-4">¿Qué quieres delegar?</p>
          <h2 className="text-ink">Elige un área y mira cómo trabaja.</h2>
          <p className="text-text-secondary text-lg mt-4 leading-relaxed">
            Un mismo agente para cualquier empresa cuyos clientes escriben para preguntar, cotizar,
            agendar o pagar. Partes con un área y sumas las otras cuando quieras.
          </p>
        </div>

        <div role="tablist" aria-label="Áreas" className="flex flex-wrap gap-2 mb-6">
          {AREAS.map((a) => (
            <button key={a.id} role="tab" aria-selected={a.id === activa} onClick={() => setActiva(a.id)}
              className={`px-5 py-2.5 rounded-full text-[15px] font-semibold transition-colors ${a.id === activa ? "bg-ink text-white" : "bg-white text-ink hover:bg-white/70"}`}>
              {a.nombre}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="grid lg:grid-cols-[1fr_1.1fr] gap-5">
          <div className="rounded-[28px] bg-white p-7 sm:p-9">
            <h3 className="font-display font-bold text-ink text-2xl tracking-tight">{area.titular}</h3>
            <ul className="mt-6 flex flex-col gap-3.5">
              {area.hace.map((h) => (
                <li key={h} className="flex gap-3 text-text-secondary leading-relaxed">
                  <span className="w-6 h-6 shrink-0 mt-0.5 rounded-full bg-lime flex items-center justify-center text-ink">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden><path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] bg-ink text-white p-7 sm:p-9">
            <p className="text-lime text-xs font-bold uppercase tracking-[0.12em]">Así se ve en distintos rubros</p>
            <ul className="mt-5 flex flex-col divide-y divide-white/10">
              {area.ejemplos.map((e) => (
                <li key={e.rubro} className="py-4 first:pt-0 last:pb-0">
                  <p className="font-display font-bold text-lg">{e.rubro}</p>
                  <p className="text-white/70 leading-relaxed mt-1">{e.caso}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
