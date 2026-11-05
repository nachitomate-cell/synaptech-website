"use client";
import { useState } from "react";

/* Galería del producto por dentro (04-11-2026). Idea tomada de las "cartas"
   de pymerp.cl, pero con pantallas REALES de la plataforma, no diseños de
   marcas inventadas: lo que se muestra es el producto, nunca un portafolio. */

type Pantalla = { src: string; alt: string; w: number; h: number; pie: string };
type Area = { id: string; nombre: string; bajada: string; pantallas: Pantalla[] };

const ESC = { w: 2880, h: 1800 };
const CEL = { w: 780, h: 1688 };

export const AREAS: Area[] = [
  { id: "reserva", nombre: "Reserva del cliente", bajada: "Lo que ve tu cliente: elige servicio, profesional y hora desde el celular, sin descargar nada.", pantallas: [
    { src: "/panel/reserva-1-servicio.webp", alt: "Paso 1 de la reserva: elegir el servicio", ...CEL, pie: "1 · Elige el servicio" },
    { src: "/panel/reserva-2-horario.webp", alt: "Paso 2 de la reserva: elegir día y hora", ...CEL, pie: "2 · Elige día y hora" },
    { src: "/panel/reserva-3-confirmar.webp", alt: "Paso 3 de la reserva: confirmar la cita", ...CEL, pie: "3 · Confirma" },
  ] },
  { id: "syna", nombre: "Syna, el asistente", bajada: "El asistente con IA conversa por WhatsApp e Instagram, ofrece horas libres reales y deja la cita agendada.", pantallas: [
    { src: "/panel/asistente-bandeja.webp", alt: "Bandeja de chats con una cita agendada por Syna", ...ESC, pie: "La bandeja: cada chat con la ficha del cliente y su próxima cita" },
    { src: "/panel/asistente-orden.webp", alt: "Ajustes de qué pregunta el asistente y en qué orden", w: 2880, h: 2080, pie: "El dueño decide qué pregunta y en qué orden" },
  ] },
  { id: "agenda", nombre: "Agenda", bajada: "La agenda del día por profesional, en el escritorio del local y en el celular de cada uno.", pantallas: [
    { src: "/panel/agenda-escritorio.webp", alt: "Agenda del día con varios profesionales", ...ESC, pie: "La agenda del día, por profesional" },
    { src: "/panel/agenda-nueva-cita.webp", alt: "Crear una cita nueva desde el panel", ...ESC, pie: "Una cita nueva en segundos" },
    { src: "/panel/app-barbero-celular.webp", alt: "La agenda del profesional en su celular", ...CEL, pie: "Cada profesional, su agenda en la app" },
  ] },
  { id: "cobros", nombre: "Caja y comisiones", bajada: "Cada cobro con su medio de pago, la caja cuadrada al cierre y la comisión de cada profesional calculada.", pantallas: [
    { src: "/panel/caja.webp", alt: "Caja del día con saldo esperado y medios de pago", ...ESC, pie: "La caja del día, cuadrada" },
    { src: "/panel/comisiones.webp", alt: "Liquidación de comisiones por profesional", ...ESC, pie: "Comisiones por profesional" },
  ] },
  { id: "club", nombre: "Club de clientes", bajada: "Sellos por visita, premios y rangos, con la tarjeta guardada en el teléfono del cliente.", pantallas: [
    { src: "/panel/club-premios.webp", alt: "Configuración de premios del club de fidelización", ...ESC, pie: "Premios y sellos" },
    { src: "/panel/club-clientes.webp", alt: "Clientes del club con su rango y visitas", ...ESC, pie: "Cada cliente con su rango y sus visitas" },
  ] },
  { id: "tienda", nombre: "Tienda online", bajada: "Los productos del local a la venta por internet, para retirar en la cita.", pantallas: [
    { src: "/panel/tienda-portada.webp", alt: "Portada de la tienda online del local", ...CEL, pie: "La tienda del local" },
    { src: "/panel/tienda-producto.webp", alt: "Ficha de un producto en la tienda", ...CEL, pie: "Ficha del producto" },
  ] },
  { id: "numeros", nombre: "Números", bajada: "Ingresos, utilidad, ticket promedio y ocupación del mes, comparados con el anterior.", pantallas: [
    { src: "/panel/metricas.webp", alt: "Métricas del local: ingresos, utilidad y ocupación", ...ESC, pie: "Métricas y estado de resultados" },
  ] },
];

export default function GaleriaProducto() {
  const [activa, setActiva] = useState(AREAS[0].id);
  const area = AREAS.find((a) => a.id === activa) ?? AREAS[0];
  const soloCel = area.pantallas.every((p) => p.w < p.h);

  return (
    <div>
      <div role="tablist" aria-label="Áreas del producto" className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {AREAS.map((a) => (
          <button key={a.id} role="tab" aria-selected={a.id === activa} onClick={() => setActiva(a.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${a.id === activa ? "bg-ink text-white border-ink" : "bg-white text-ink border-border-subtle hover:border-ink"}`}>
            {a.nombre}
          </button>
        ))}
      </div>

      <p className="text-text-secondary text-lg leading-relaxed mt-6 max-w-2xl">{area.bajada}</p>

      <div className={`mt-8 grid gap-6 ${soloCel ? "grid-cols-1 sm:grid-cols-3 max-w-4xl" : area.pantallas.length > 1 ? "lg:grid-cols-2" : ""}`}>
        {area.pantallas.map((p) => (
          <figure key={p.src} className={`rounded-[24px] bg-mist p-2.5 ${p.w < p.h && !soloCel ? "max-w-xs" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="w-full h-auto rounded-[16px] border border-border-subtle bg-white" />
            <figcaption className="text-sm font-semibold text-ink px-2 pt-3 pb-1">{p.pie}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
