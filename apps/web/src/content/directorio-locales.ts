/* Ajustes a mano del directorio (Red Synaptech). OPCIONALES desde el 16-10-2026.

   Quién aparece y casi todos sus datos salen SOLOS de la plataforma (lib/directorio.ts):
   `_publico/metricas.directorio` dice quién es cliente, y `_publico/directorio_seo`
   (functions/metricas-publicas.js, a diario a las 04:10) trae comuna, región,
   coordenadas, URL de reserva, logo, servicios, precios y nota de Google. Un cliente
   nuevo aparece completo sin tocar este archivo.

   Acá va solo lo que la plataforma no sabe decir bien. Cada campo es opcional y,
   si está, manda sobre el automático:
   - nombre: como se escribe la marca ("AURA SALÓN" → "Aura Salón & Male Grooming").
   - rubro: el filtro del directorio, cuando `tipo` no alcanza (mixto, estudio, otro).
   - etiqueta: el "{etiqueta} en {comuna}" visible, cuando el rubro genérico no lo dice.
   - direccion: la versión limpia (la del panel la escribe el dueño, a veces con
     indicaciones como "frente a Sherwin Williams"). Sin comuna: va aparte.
   - logo + fondo + oscuro: hay logo recortado y centrado en
     public/directorio-logos/{id}.webp y {id}-pin.webp, sobre ese color (script en
     devtools/guias-panel/sitio-web/directorio/). Sin esto se usa el logo del panel.
   - reserva: false = sin reserva pública (TENANTS_SIN_RESERVA_PUBLICA). */

export type Rubro = "barberia" | "salon" | "estetica" | "pilates";
export type AjusteLocal = {
  nombre?: string; rubro?: Rubro; etiqueta?: string; direccion?: string;
  reserva?: boolean; logo?: boolean; fondo?: string; oscuro?: boolean;
};

export const AJUSTES: Record<string, AjusteLocal> = {
  "aura": {"nombre": "Aura Salón & Male Grooming", "rubro": "barberia", "direccion": "2 Oriente 124, Local 3", "logo": true, "fondo": "#fefefe", "oscuro": false},
  "brz": {"nombre": "Barbería BRZ", "rubro": "barberia", "direccion": "Los Arándanos 5101", "logo": true, "fondo": "#000000", "oscuro": true},
  "chameleon": {"nombre": "Chameleon Barber Studio", "rubro": "barberia", "direccion": "Av. Libertad 868", "logo": true, "fondo": "#000000", "oscuro": true},
  "claudialeonspa": {"nombre": "Claudia León Spa & Wellness", "rubro": "estetica", "etiqueta": "Spa y bienestar", "direccion": "España 512, Local 204", "logo": true, "fondo": "#313732", "oscuro": true},
  "clinicalglow": {"nombre": "Clinical Glow · Clínica Estética", "rubro": "estetica", "etiqueta": "Clínica estética", "direccion": "2 Oriente 124, oficina 312", "logo": true, "fondo": "#ffffff", "oscuro": false},
  "el10salonmasculino": {"nombre": "El 10 Salón Masculino", "rubro": "barberia", "direccion": "1 Sur esquina Victoria, Local 1", "logo": true, "fondo": "#010101", "oscuro": true},
  "elbarberomoderno": {"nombre": "El Barbero Moderno", "rubro": "barberia", "direccion": "San Diego 333", "logo": true, "fondo": "#0d0c0f", "oscuro": true},
  "elegance": {"nombre": "Elegance Barbershop", "rubro": "barberia", "direccion": "Ecuador 243", "logo": true, "fondo": "#000201", "oscuro": true},
  "estudioluxury": {"nombre": "Estudio Luxury", "rubro": "barberia", "direccion": "Los Clarines 1764", "logo": true, "fondo": "#0a0404", "oscuro": true},
  "fsbarberstudios": {"nombre": "FS Barber Studios", "rubro": "barberia", "direccion": "Av. Quilín 3143", "logo": true, "fondo": "#0d0d0e", "oscuro": true},
  "garagebarbershop": {"nombre": "Garage Barbershop", "rubro": "barberia", "direccion": "Grajales 1994", "logo": true, "fondo": "#1a1a1a", "oscuro": true},
  "glowstudio": {"nombre": "Glow Studio", "rubro": "salon", "direccion": "1 Norte 649, Local 2", "reserva": false, "logo": true, "fondo": "#0f1a2b", "oscuro": true},
  "goldensheep": {"nombre": "Golden Sheep Barbershop Studio", "rubro": "barberia", "direccion": "Aires del Monte 92", "logo": true, "fondo": "#ffffff", "oscuro": false},
  "infinity": {"nombre": "Infinity Studio", "rubro": "barberia", "direccion": "Traslaviña 114", "logo": true, "fondo": "#121214", "oscuro": true},
  "kronnos_limache": {"nombre": "Kronnos Studio Limache", "rubro": "barberia", "direccion": "Paseo Las Araucarias 405, Local 5", "logo": true, "fondo": "#000000", "oscuro": true},
  "kronnos_penablanca": {"nombre": "Kronnos Studio Peñablanca", "rubro": "barberia", "direccion": "Av. Bernardo Leighton 20, Local 13", "logo": true, "fondo": "#000000", "oscuro": true},
  "kronnos_woman": {"nombre": "Kronnos Woman", "rubro": "salon", "direccion": "Palmira Romano Sur 405, Local 3", "logo": true, "fondo": "#010101", "oscuro": true},
  "latincaribe": {"nombre": "The Latin Caribe", "rubro": "barberia", "direccion": "Manuel Rodríguez 299", "logo": true, "fondo": "#0a0a0a", "oscuro": true},
  "lumen": {"nombre": "D'Jones Barber", "rubro": "barberia", "direccion": "Viana 405, Local 3", "logo": true, "fondo": "#030712", "oscuro": true},
  "newglow": {"nombre": "New Glow Salón", "rubro": "salon", "etiqueta": "Salón de belleza", "direccion": "3 Poniente 482", "logo": true, "fondo": "#ffffff", "oscuro": false},
  "oren": {"nombre": "Oren Barber", "rubro": "barberia", "direccion": "Av. Borgoño 14580, Local 21, Mall Plaza Reñaca", "logo": true, "fondo": "#000000", "oscuro": true},
  "paolaleiva": {"nombre": "Paola Leiva · Estilista", "rubro": "salon", "etiqueta": "Estilista y peluquería", "direccion": "San José 6087", "logo": true, "fondo": "#000000", "oscuro": true},
  "puntopilates": {"nombre": "Punto Pilates", "rubro": "pilates", "direccion": "Caletera Gral. San Martín 8521, Chicureo", "logo": true, "fondo": "#ffffff", "oscuro": false},
  "renacer": {"nombre": "Peluquería y Barbería Renacer", "rubro": "salon", "direccion": "Ecuador 266", "logo": true, "fondo": "#1c1c1c", "oscuro": true},
  "sion": {"nombre": "Sion Barbería", "rubro": "barberia", "direccion": "1 Oriente 985", "logo": true, "fondo": "#2c3941", "oscuro": true},
  "sionbarberia": {"nombre": "Studio Dieciséis", "rubro": "barberia", "direccion": "Simón Bolívar 515", "logo": true, "fondo": "#000000", "oscuro": true},
  "tinkay": {"nombre": "Tinkay Estética y Salud", "rubro": "estetica", "direccion": "Alcázar 464", "logo": true, "fondo": "#fefefe", "oscuro": false},
  "viggomhc": {"nombre": "Viggo Men's Hair Club", "rubro": "barberia", "direccion": "Av. Cristóbal Colón 6555, Local 8", "logo": true, "fondo": "#000000", "oscuro": true},
  "villarrealstudio": {"nombre": "Villarreal Studio", "rubro": "salon", "direccion": "Av. Irarrázaval 4896", "reserva": false, "logo": true, "fondo": "#0f1a2b", "oscuro": true},
  "yugen": {"nombre": "Yūgen Studio", "rubro": "barberia", "direccion": "La Concepción 164", "logo": true, "fondo": "#000000", "oscuro": true},
};
