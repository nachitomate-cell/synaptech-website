/* Locales del directorio (Red Synaptech): datos que cambian poco, juntados el 09-10-2026.
   - Quién aparece lo decide la lista VIVA `_publico/metricas.directorio` (lib/directorio.ts):
     un local que deja de ser cliente o pide no aparecer sale solo, aunque siga acá.
   - Dirección: la que el local edita en su panel (`settings/general.direccion`), o la de
     `TENANT_META.local` en middleware.js de la plataforma.
   - Coordenadas: Google Places (placeId de `settings/googleReviews` o búsqueda por dirección).
   - Logo: el mejor archivo del local (repo de la plataforma, ícono PWA o tarjeta Wallet),
     recortado y centrado en public/directorio-logos/{id}.webp y {id}-pin.webp. Fuente y
     script para regenerarlos: devtools/guias-panel/sitio-web/directorio/.
   - `reserva: false` = el local no tiene reserva pública (TENANTS_SIN_RESERVA_PUBLICA). */

export type Rubro = "barberia" | "salon" | "estetica" | "pilates";
export type LocalBase = {
  id: string; nombre: string; rubro: Rubro; direccion: string; comuna: string; region: string;
  lat: number; lng: number; url: string; reserva: boolean; fondo: string; oscuro: boolean;
};

export const LOCALES_BASE: LocalBase[] = [
  {"id": "aura", "nombre": "Aura Salón & Male Grooming", "rubro": "barberia", "direccion": "2 Oriente 124, Local 3", "comuna": "Viña del Mar", "region": "Valparaíso", "lat": -33.021511, "lng": -71.548534, "url": "https://aurasalon.synaptechspa.cl", "reserva": true, "fondo": "#fefefe", "oscuro": false},
  {"id": "elegance", "nombre": "Elegance Barbershop", "rubro": "barberia", "direccion": "Ecuador 243", "comuna": "Viña del Mar", "region": "Valparaíso", "lat": -33.024414, "lng": -71.559849, "url": "https://barberiaelegance.synaptechspa.cl", "reserva": true, "fondo": "#000201", "oscuro": true},
  {"id": "chameleon", "nombre": "Chameleon Barber Studio", "rubro": "barberia", "direccion": "Av. Libertad 868", "comuna": "Viña del Mar", "region": "Valparaíso", "lat": -33.013664, "lng": -71.549411, "url": "https://chameleonbarber.synaptechspa.cl", "reserva": true, "fondo": "#000000", "oscuro": true},
  {"id": "clinicalglow", "nombre": "Clinical Glow · Clínica Estética", "rubro": "estetica", "direccion": "2 Oriente 124, oficina 312", "comuna": "Viña del Mar", "region": "Valparaíso", "lat": -33.021511, "lng": -71.548534, "url": "https://clinicalglow.synaptechspa.cl", "reserva": true, "fondo": "#ffffff", "oscuro": false},
  {"id": "lumen", "nombre": "D'Jones Barber", "rubro": "barberia", "direccion": "Viana 405, Local 3", "comuna": "Viña del Mar", "region": "Valparaíso", "lat": -33.025347, "lng": -71.557023, "url": "https://barberiadjones.synaptechspa.cl", "reserva": true, "fondo": "#030712", "oscuro": true},
  {"id": "el10salonmasculino", "nombre": "El 10 Salón Masculino", "rubro": "barberia", "direccion": "1 Sur esquina Victoria, Local 1", "comuna": "Parral", "region": "Maule", "lat": -36.146018, "lng": -71.830739, "url": "https://el10salonmasculino.synaptechspa.cl", "reserva": true, "fondo": "#010101", "oscuro": true},
  {"id": "elbarberomoderno", "nombre": "El Barbero Moderno", "rubro": "barberia", "direccion": "San Diego 333", "comuna": "Santiago", "region": "Metropolitana", "lat": -33.449779, "lng": -70.650841, "url": "https://elbarberomoderno.synaptechspa.cl", "reserva": true, "fondo": "#0d0c0f", "oscuro": true},
  {"id": "estudioluxury", "nombre": "Estudio Luxury", "rubro": "barberia", "direccion": "Los Clarines 1764", "comuna": "Talagante", "region": "Metropolitana", "lat": -33.670057, "lng": -70.933293, "url": "https://estudioluxury.synaptechspa.cl", "reserva": true, "fondo": "#0a0404", "oscuro": true},
  {"id": "glowstudio", "nombre": "Glow Studio", "rubro": "salon", "direccion": "1 Norte 649, Local 2", "comuna": "Viña del Mar", "region": "Valparaíso", "lat": -33.022059, "lng": -71.552059, "url": "https://glowstudio.synaptechspa.cl", "reserva": false, "fondo": "#0f1a2b", "oscuro": true},
  {"id": "goldensheep", "nombre": "Golden Sheep Barbershop Studio", "rubro": "barberia", "direccion": "Aires del Monte 92", "comuna": "El Monte", "region": "Metropolitana", "lat": -33.685553, "lng": -71.017378, "url": "https://goldensheep.synaptechspa.cl", "reserva": true, "fondo": "#ffffff", "oscuro": false},
  {"id": "infinity", "nombre": "Infinity Studio", "rubro": "barberia", "direccion": "Traslaviña 114", "comuna": "Viña del Mar", "region": "Valparaíso", "lat": -33.023257, "lng": -71.558337, "url": "https://infinity.synaptechspa.cl", "reserva": true, "fondo": "#121214", "oscuro": true},
  {"id": "kronnos_limache", "nombre": "Kronnos Studio Limache", "rubro": "barberia", "direccion": "Paseo Las Araucarias 405, Local 5", "comuna": "Limache", "region": "Valparaíso", "lat": -33.00186, "lng": -71.267874, "url": "https://kronnoslimache.synaptechspa.cl", "reserva": true, "fondo": "#000000", "oscuro": true},
  {"id": "kronnos_penablanca", "nombre": "Kronnos Studio Peñablanca", "rubro": "barberia", "direccion": "Av. Bernardo Leighton 20, Local 13", "comuna": "Villa Alemana", "region": "Valparaíso", "lat": -33.04686, "lng": -71.354013, "url": "https://kronnospenablanca.synaptechspa.cl", "reserva": true, "fondo": "#000000", "oscuro": true},
  {"id": "kronnos_woman", "nombre": "Kronnos Woman", "rubro": "salon", "direccion": "Palmira Romano Sur 405, Local 3", "comuna": "Limache", "region": "Valparaíso", "lat": -33.001739, "lng": -71.267876, "url": "https://kronnoswoman.synaptechspa.cl", "reserva": true, "fondo": "#010101", "oscuro": true},
  {"id": "newglow", "nombre": "New Glow Salón", "rubro": "salon", "direccion": "3 Poniente 482", "comuna": "Viña del Mar", "region": "Valparaíso", "lat": -33.01717, "lng": -71.554144, "url": "https://newglowsalon.synaptechspa.cl", "reserva": true, "fondo": "#ffffff", "oscuro": false},
  {"id": "oren", "nombre": "Oren Barber", "rubro": "barberia", "direccion": "Av. Borgoño 14580, Local 21, Mall Plaza Reñaca", "comuna": "Viña del Mar", "region": "Valparaíso", "lat": -32.970935, "lng": -71.543268, "url": "https://orenbarber.synaptechspa.cl", "reserva": true, "fondo": "#000000", "oscuro": true},
  {"id": "renacer", "nombre": "Peluquería y Barbería Renacer", "rubro": "salon", "direccion": "Ecuador 266", "comuna": "Viña del Mar", "region": "Valparaíso", "lat": -33.024241, "lng": -71.560032, "url": "https://renacer.synaptechspa.cl", "reserva": true, "fondo": "#1c1c1c", "oscuro": true},
  {"id": "puntopilates", "nombre": "Punto Pilates", "rubro": "pilates", "direccion": "Caletera Gral. San Martín 8521, Chicureo", "comuna": "Colina", "region": "Metropolitana", "lat": -33.261289, "lng": -70.698448, "url": "https://puntopilates.synaptechspa.cl", "reserva": true, "fondo": "#ffffff", "oscuro": false},
  {"id": "sion", "nombre": "Sion Barbería", "rubro": "barberia", "direccion": "1 Oriente 985", "comuna": "Viña del Mar", "region": "Valparaíso", "lat": -33.012677, "lng": -71.548341, "url": "https://sion.synaptechspa.cl", "reserva": true, "fondo": "#2c3941", "oscuro": true},
  {"id": "sionbarberia", "nombre": "Studio Dieciséis", "rubro": "barberia", "direccion": "Simón Bolívar 515", "comuna": "Valparaíso", "region": "Valparaíso", "lat": -33.048783, "lng": -71.60961, "url": "https://studiodieciseis.synaptechspa.cl", "reserva": true, "fondo": "#000000", "oscuro": true},
  {"id": "latincaribe", "nombre": "The Latin Caribe", "rubro": "barberia", "direccion": "Manuel Rodríguez 299", "comuna": "Copiapó", "region": "Atacama", "lat": -27.361472, "lng": -70.335353, "url": "https://latincaribe.synaptechspa.cl", "reserva": true, "fondo": "#0a0a0a", "oscuro": true},
  {"id": "tinkay", "nombre": "Tinkay Estética y Salud", "rubro": "estetica", "direccion": "Alcázar 464", "comuna": "Rancagua", "region": "O'Higgins", "lat": -34.171336, "lng": -70.739235, "url": "https://tinkay.synaptechspa.cl", "reserva": true, "fondo": "#fefefe", "oscuro": false},
  {"id": "viggomhc", "nombre": "Viggo Men's Hair Club", "rubro": "barberia", "direccion": "Av. Cristóbal Colón 6555, Local 8", "comuna": "Las Condes", "region": "Metropolitana", "lat": -33.41719, "lng": -70.560958, "url": "https://viggomhc.synaptechspa.cl", "reserva": true, "fondo": "#000000", "oscuro": true},
  {"id": "villarrealstudio", "nombre": "Villarreal Studio", "rubro": "salon", "direccion": "Av. Irarrázaval 4896", "comuna": "Ñuñoa", "region": "Metropolitana", "lat": -33.454304, "lng": -70.57927, "url": "https://villarrealstudio.synaptechspa.cl", "reserva": false, "fondo": "#0f1a2b", "oscuro": true},
  {"id": "yugen", "nombre": "Yūgen Studio", "rubro": "barberia", "direccion": "La Concepción 164", "comuna": "Quillota", "region": "Valparaíso", "lat": -32.880563, "lng": -71.244857, "url": "https://yugenstudio.synaptechspa.cl", "reserva": true, "fondo": "#000000", "oscuro": true},
];
