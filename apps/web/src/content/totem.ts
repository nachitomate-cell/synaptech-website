/* Tótem de autoservicio (28-10-2026): los ejemplos por rubro del simulador de
   /totem. Los locales, las personas y los precios son de EJEMPLO.

   Lo que el simulador muestra es lo que hace el tótem de verdad
   (plataforma, js/totem/*, capturas en devtools/guias-panel/totem-etapa1):
   - "Tengo cita reservada": el teléfono de 9 dígitos → "Tu cita de hoy" →
     "Confirmar mi llegada" → push "<Nombre> llegó · <hora> · <servicio> — está
     en el local." al celular de quien atiende (functions/totem-checkin.js).
   - "Atenderme sin cita": servicio → "El primero disponible" o un profesional
     → nombre y teléfono → la cita queda en la agenda con la llegada marcada
     (violeta) y el ícono del tótem (Agenda.jsx).
   - "Sin cita" se apaga por local (opcionesAvanzadas.totemSinCita): así lo
     muestra la clínica, donde todo se agenda antes.
   Los textos de la pantalla son los mismos en todos los rubros (el tótem no
   cambia sus frases por rubro), solo cambian el local, los servicios y el
   equipo. */

export type ServicioTotem = { nombre: string; min: number; precio: number };
export type RubroTotem = {
  id: string;
  rubro: string;          // pestaña del simulador
  local: string;
  club: string | null;
  servicios: ServicioTotem[];
  equipo: string[];
  sinCita: boolean;
  cita: { cliente: string; hora: string; servicio: string; con: string };
  walkin: { cliente: string; nombreCompleto: string; telefono: string; hora: string; con: string };
  href: string;           // página del rubro en el sitio
  uso: string;            // cómo lo usa un local de ese rubro (grilla de rubros)
};

export const RUBROS_TOTEM: RubroTotem[] = [
  {
    id: "barberia", rubro: "Barbería", local: "Barbería Norte", club: "Club Barbería Norte",
    servicios: [{ nombre: "Corte de Cabello", min: 45, precio: 14000 }, { nombre: "Corte + Barba", min: 60, precio: 24000 }, { nombre: "Perfilado de barba", min: 30, precio: 8000 }],
    equipo: ["Matías Rojas", "Felipe Soto", "Diego Muñoz"], sinCita: true,
    cita: { cliente: "Andrés", hora: "17:00", servicio: "Corte de Cabello", con: "Matías Rojas" },
    walkin: { cliente: "Pedro", nombreCompleto: "Pedro Lagos", telefono: "+56 9 7777 1234", hora: "17:00", con: "Felipe Soto" },
    href: "/barberias",
    uso: "El que llega sin hora se toma la próxima libre solo, y el barbero se entera de quién llegó sin dejar la tijera.",
  },
  {
    id: "peluqueria", rubro: "Peluquería", local: "Salón Aurora", club: "Club Aurora",
    servicios: [{ nombre: "Corte y brushing", min: 60, precio: 22000 }, { nombre: "Color raíz", min: 90, precio: 38000 }, { nombre: "Brushing", min: 30, precio: 12000 }],
    equipo: ["Camila Torres", "Javiera Paz", "Sofía Rivas"], sinCita: true,
    cita: { cliente: "Valentina", hora: "11:30", servicio: "Color raíz", con: "Camila Torres" },
    walkin: { cliente: "Fernanda", nombreCompleto: "Fernanda Silva", telefono: "+56 9 6543 2100", hora: "11:30", con: "Javiera Paz" },
    href: "/peluquerias",
    uso: "La estilista sigue con el color mientras la clienta que llegó se anuncia sola, y el mesón queda libre para cobrar.",
  },
  {
    id: "unas", rubro: "Uñas", local: "Studio Nails", club: "Club Studio Nails",
    servicios: [{ nombre: "Esmaltado permanente", min: 60, precio: 15000 }, { nombre: "Uñas acrílicas", min: 120, precio: 28000 }, { nombre: "Manicure express", min: 30, precio: 9000 }],
    equipo: ["Daniela Vega", "Antonia Ruiz", "Catalina Mora"], sinCita: true,
    cita: { cliente: "Josefa", hora: "16:00", servicio: "Esmaltado permanente", con: "Daniela Vega" },
    walkin: { cliente: "Isidora", nombreCompleto: "Isidora Lara", telefono: "+56 9 5432 1987", hora: "16:00", con: "Antonia Ruiz" },
    href: "/unas",
    uso: "Con las manos ocupadas nadie corre a la puerta: la clienta avisa en el tótem y a la manicurista le llega al celular.",
  },
  {
    id: "estetica", rubro: "Estética y spa", local: "Centro Lumière", club: "Club Lumière",
    servicios: [{ nombre: "Limpieza facial", min: 60, precio: 35000 }, { nombre: "Masaje relajante", min: 50, precio: 30000 }, { nombre: "Depilación láser axilas", min: 20, precio: 20000 }],
    equipo: ["Francisca Díaz", "Paula Núñez", "Carla Fuentes"], sinCita: true,
    cita: { cliente: "Constanza", hora: "18:30", servicio: "Limpieza facial", con: "Francisca Díaz" },
    walkin: { cliente: "Macarena", nombreCompleto: "Macarena Reyes", telefono: "+56 9 4321 6655", hora: "18:30", con: "Paula Núñez" },
    href: "/estetica",
    uso: "Las cabinas tienen la puerta cerrada: la clienta se anuncia en el tótem y la especialista sabe que llegó sin salir del box.",
  },
  {
    id: "clinica", rubro: "Clínica estética", local: "Clínica Dermasur", club: null,
    servicios: [{ nombre: "Evaluación", min: 30, precio: 25000 }, { nombre: "Toxina botulínica", min: 45, precio: 180000 }, { nombre: "Ácido hialurónico", min: 60, precio: 250000 }],
    equipo: ["Dra. Ignacia Soto", "Dr. Tomás Bravo", "Dra. Elisa Mena"], sinCita: false,
    cita: { cliente: "Carolina", hora: "10:00", servicio: "Evaluación", con: "Dra. Ignacia Soto" },
    walkin: { cliente: "", nombreCompleto: "", telefono: "", hora: "", con: "" },
    href: "/clinicas",
    uso: "Todo se agenda antes, así que apagan \"sin cita\": el tótem solo recibe la llegada y le avisa a quien la atiende.",
  },
  {
    id: "mascotas", rubro: "Mascotas", local: "Patitas Spa", club: "Club Patitas",
    servicios: [{ nombre: "Baño y corte", min: 90, precio: 25000 }, { nombre: "Baño", min: 60, precio: 15000 }, { nombre: "Corte de uñas", min: 15, precio: 5000 }],
    equipo: ["Ignacio Paredes", "Belén Castro", "Rodrigo Leiva"], sinCita: true,
    cita: { cliente: "Martina", hora: "12:00", servicio: "Baño y corte", con: "Belén Castro" },
    walkin: { cliente: "Joaquín", nombreCompleto: "Joaquín Herrera", telefono: "+56 9 3210 4477", hora: "12:00", con: "Ignacio Paredes" },
    href: "/mascotas",
    uso: "Con el perro de la correa y el teléfono en la otra mano: tres toques y ya avisó que llegó, o dejó a su mascota en la próxima hora.",
  },
];

export const clp = (n: number) => "$" + n.toLocaleString("es-CL");
