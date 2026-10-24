/* Cursos en video para /aprende (24-10-2026).
   Copia de los cursos del Centro de Ayuda del panel (admin-panel/src/views/ayuda/cursosData.js,
   generado por devtools/videos-pipeline/cursos-panel.py): mismos títulos, resúmenes y capítulos.
   Los videos viven en Firebase Storage (assets/curso-<id>.mp4, lectura pública), los mismos que ve el
   panel, salvo la lección 1, que ya estaba en public/capsulas. Si un curso cambia en el panel, se
   vuelve a copiar de ahí. Lecciones con pais "CL": cifras y trámites de Chile. */

export type Capitulo = { t: number; texto: string };
export type Leccion = {
  id: string; slug: string; titulo: string; resumen: string;
  duracion: string; segundos: number; src: string; poster: string;
  pais?: string; capitulos: Capitulo[];
};
export type Curso = { slug: string; titulo: string; bajada: string; lecciones: Leccion[] };

export const CURSOS: Curso[] = [
  {
    "slug": "administra-tu-local",
    "titulo": "Administra tu local",
    "bajada": "Formaliza tu negocio, entiende tus impuestos y conoce tus números.",
    "lecciones": [
      {
        "id": "leccion1-sueldo-comision-arriendo",
        "slug": "sueldo-comision-o-arriendo",
        "titulo": "¿Sueldo, comisión o arriendo?",
        "resumen": "¿Le pagas a tu equipo con sueldo, con comisión, o le arriendas el sillón? Lo que cambia en IVA, riesgo y control.",
        "duracion": "2:09",
        "segundos": 129,
        "src": "/capsulas/leccion1-sueldo-comision-arriendo.mp4",
        "poster": "/capsulas/leccion1-sueldo-comision-arriendo.jpg",
        "pais": "CL",
        "capitulos": [
          {
            "t": 0,
            "texto": "Introducción"
          },
          {
            "t": 10.3,
            "texto": "El ejemplo"
          },
          {
            "t": 17.8,
            "texto": "Con sueldo"
          },
          {
            "t": 36,
            "texto": "Con comisión"
          },
          {
            "t": 57.3,
            "texto": "Con arriendo de sillón"
          },
          {
            "t": 73.6,
            "texto": "Ojo con el arriendo"
          },
          {
            "t": 92.1,
            "texto": "Resumen"
          },
          {
            "t": 104.2,
            "texto": "En SynapTech"
          },
          {
            "t": 115.9,
            "texto": "Cierre"
          }
        ]
      },
      {
        "id": "leccion2-formaliza-tu-barberia",
        "slug": "formaliza-tu-barberia",
        "titulo": "Formaliza tu barbería",
        "resumen": "Persona natural, EIRL o SpA; IVA; Tu Empresa en un Día; inicio de actividades; boleta electrónica y régimen tributario.",
        "duracion": "2:12",
        "segundos": 132,
        "src": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-leccion2-formaliza-tu-barberia.mp4?alt=media",
        "poster": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-leccion2-formaliza-tu-barberia.jpg?alt=media",
        "pais": "CL",
        "capitulos": [
          {
            "t": 0,
            "texto": "Introducción"
          },
          {
            "t": 7.3,
            "texto": "¿Para qué formalizarte?"
          },
          {
            "t": 16.8,
            "texto": "Paso 1 · ¿Cómo vas a funcionar?"
          },
          {
            "t": 30.8,
            "texto": "¿Cobras IVA?"
          },
          {
            "t": 44,
            "texto": "Paso 2 · Crea tu empresa"
          },
          {
            "t": 57.6,
            "texto": "Paso 3 · Inicio de actividades en el SII"
          },
          {
            "t": 73.4,
            "texto": "Paso 4 · Boleta electrónica"
          },
          {
            "t": 84.9,
            "texto": "Paso 5 · Elige tu régimen"
          },
          {
            "t": 102.2,
            "texto": "Y una cuenta a nombre de la empresa"
          },
          {
            "t": 110.2,
            "texto": "Ya formalizado, en SynapTech"
          },
          {
            "t": 120.5,
            "texto": "Cierre"
          }
        ]
      },
      {
        "id": "leccion3-permisos-para-abrir-tu-local",
        "slug": "permisos-para-abrir",
        "titulo": "Permisos para abrir tu local",
        "resumen": "Zonificación, patente municipal, autorización sanitaria y las reglas de tu comuna, en el orden correcto.",
        "duracion": "1:54",
        "segundos": 114,
        "src": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-leccion3-permisos-para-abrir-tu-local.mp4?alt=media",
        "poster": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-leccion3-permisos-para-abrir-tu-local.jpg?alt=media",
        "pais": "CL",
        "capitulos": [
          {
            "t": 0,
            "texto": "Introducción"
          },
          {
            "t": 8.1,
            "texto": "El orden importa"
          },
          {
            "t": 20.8,
            "texto": "1 · ¿Tu dirección permite el giro?"
          },
          {
            "t": 31.5,
            "texto": "2 · Patente municipal"
          },
          {
            "t": 45.7,
            "texto": "Lo que suelen pedir"
          },
          {
            "t": 61.5,
            "texto": "3 · ¿Autorización sanitaria?"
          },
          {
            "t": 77.9,
            "texto": "4 · Las reglas de tu comuna"
          },
          {
            "t": 94.4,
            "texto": "Abre con todo listo en SynapTech"
          },
          {
            "t": 101.6,
            "texto": "Cierre"
          }
        ]
      },
      {
        "id": "leccion4-impuestos-del-mes",
        "slug": "impuestos-del-mes",
        "titulo": "Los impuestos del mes, sin miedo",
        "resumen": "El formulario 29 con un ejemplo: IVA, PPM, retenciones de honorarios, fechas y qué pasa si te atrasas.",
        "duracion": "2:14",
        "segundos": 134,
        "src": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-leccion4-impuestos-del-mes.mp4?alt=media",
        "poster": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-leccion4-impuestos-del-mes.jpg?alt=media",
        "pais": "CL",
        "capitulos": [
          {
            "t": 0,
            "texto": "Introducción"
          },
          {
            "t": 8.2,
            "texto": "El formulario 29, todos los meses"
          },
          {
            "t": 21.2,
            "texto": "1 · El IVA que pagas"
          },
          {
            "t": 30.1,
            "texto": "Un mes de ejemplo"
          },
          {
            "t": 45.2,
            "texto": "Compra con factura, no con boleta"
          },
          {
            "t": 54,
            "texto": "2 · El PPM: un adelanto de la renta"
          },
          {
            "t": 72.7,
            "texto": "3 · Las boletas de honorarios de tus barberos"
          },
          {
            "t": 85.7,
            "texto": "4 · ¿Hasta cuándo?"
          },
          {
            "t": 98.8,
            "texto": "Si te atrasas"
          },
          {
            "t": 112.1,
            "texto": "Todo registrado en SynapTech"
          },
          {
            "t": 122,
            "texto": "Cierre"
          }
        ]
      },
      {
        "id": "leccion5-contratar-a-tu-equipo",
        "slug": "contratar-a-tu-equipo",
        "titulo": "Contratar a tu equipo",
        "resumen": "Cuándo una boleta se vuelve contrato, el sueldo mínimo y lo que cuesta de verdad contratar.",
        "duracion": "1:31",
        "segundos": 91,
        "src": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-leccion5-contratar-a-tu-equipo.mp4?alt=media",
        "poster": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-leccion5-contratar-a-tu-equipo.jpg?alt=media",
        "pais": "CL",
        "capitulos": [
          {
            "t": 0,
            "texto": "Introducción"
          },
          {
            "t": 7.6,
            "texto": "¿A boleta, pero como empleado?"
          },
          {
            "t": 21.5,
            "texto": "Dos caminos ordenados"
          },
          {
            "t": 34.8,
            "texto": "Con jornada completa"
          },
          {
            "t": 44.8,
            "texto": "Lo que cuesta un sueldo de $600.000"
          },
          {
            "t": 58.5,
            "texto": "Si contratas, no olvides"
          },
          {
            "t": 71.1,
            "texto": "Tu equipo ordenado en SynapTech"
          },
          {
            "t": 79.4,
            "texto": "Cierre"
          }
        ]
      },
      {
        "id": "leccion6-cuanto-cobrar-por-un-corte",
        "slug": "cuanto-cobrar-por-un-corte",
        "titulo": "¿Cuánto cobrar por un corte?",
        "resumen": "Calcula el precio mínimo de un corte con tus gastos fijos, tus horas, los insumos, el barbero y el IVA.",
        "duracion": "2:00",
        "segundos": 120,
        "src": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-leccion6-cuanto-cobrar-por-un-corte.mp4?alt=media",
        "poster": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-leccion6-cuanto-cobrar-por-un-corte.jpg?alt=media",
        "pais": "CL",
        "capitulos": [
          {
            "t": 0,
            "texto": "Introducción"
          },
          {
            "t": 8.2,
            "texto": "El error: copiar el precio del vecino"
          },
          {
            "t": 18.5,
            "texto": "1 · Suma tus gastos fijos del mes"
          },
          {
            "t": 29.5,
            "texto": "2 · ¿Cuántas horas atiendes de verdad?"
          },
          {
            "t": 39.6,
            "texto": "3 · Lo que te cuesta cada hora"
          },
          {
            "t": 50.6,
            "texto": "4 · Lo que se lleva cada corte"
          },
          {
            "t": 60.3,
            "texto": "5 · El IVA no es tuyo"
          },
          {
            "t": 71.3,
            "texto": "Lo que le queda al local por corte"
          },
          {
            "t": 83.5,
            "texto": "La regla rápida: precio mínimo para no perder"
          },
          {
            "t": 98.7,
            "texto": "Tus números reales, a mano en SynapTech"
          },
          {
            "t": 109.9,
            "texto": "Cierre"
          }
        ]
      },
      {
        "id": "leccion7-tu-sueldo-y-la-plata-del-negocio",
        "slug": "tu-sueldo-y-la-plata-del-negocio",
        "titulo": "Tu sueldo y la plata del negocio",
        "resumen": "Ponte un sueldo, separa las cuentas y calcula cuántos cortes necesitas al mes.",
        "duracion": "1:56",
        "segundos": 116,
        "src": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-leccion7-tu-sueldo-y-la-plata-del-negocio.mp4?alt=media",
        "poster": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-leccion7-tu-sueldo-y-la-plata-del-negocio.jpg?alt=media",
        "capitulos": [
          {
            "t": 0,
            "texto": "Introducción"
          },
          {
            "t": 8.4,
            "texto": "El error: sacar de la caja cuando necesitas"
          },
          {
            "t": 21.4,
            "texto": "La solución: ponte un sueldo"
          },
          {
            "t": 34.3,
            "texto": "La regla"
          },
          {
            "t": 44.4,
            "texto": "¿Y las ganancias?"
          },
          {
            "t": 58.2,
            "texto": "¿Cuánto deja cada corte?"
          },
          {
            "t": 75.3,
            "texto": "Tu punto de equilibrio"
          },
          {
            "t": 85.6,
            "texto": "Con tu sueldo incluido"
          },
          {
            "t": 96.5,
            "texto": "Tu número, a la vista en SynapTech"
          },
          {
            "t": 104,
            "texto": "Cierre"
          }
        ]
      }
    ]
  },
  {
    "slug": "productos",
    "titulo": "Vende más con tus productos",
    "bajada": "Carga tu catálogo, controla el stock, haz ofertas y vende en tu tienda online.",
    "lecciones": [
      {
        "id": "tienda1-carga-tu-catalogo",
        "slug": "carga-tu-catalogo",
        "titulo": "Carga tu catálogo como un pro",
        "resumen": "Foto, nombre, categoría, precio, costo y stock mínimo: cómo cargar un producto para que se venda y sepas cuánto ganas.",
        "duracion": "1:41",
        "segundos": 101,
        "src": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-tienda1-carga-tu-catalogo.mp4?alt=media",
        "poster": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-tienda1-carga-tu-catalogo.jpg?alt=media",
        "capitulos": [
          {
            "t": 0,
            "texto": "Introducción"
          },
          {
            "t": 8.9,
            "texto": "Agregar un producto"
          },
          {
            "t": 16.4,
            "texto": "La foto"
          },
          {
            "t": 25.4,
            "texto": "Nombre, categoría y descripción"
          },
          {
            "t": 35.7,
            "texto": "Precio y stock"
          },
          {
            "t": 44.2,
            "texto": "Costo y margen real"
          },
          {
            "t": 56.1,
            "texto": "Stock mínimo"
          },
          {
            "t": 62.8,
            "texto": "Mostrar en la tienda"
          },
          {
            "t": 73.8,
            "texto": "Ordenar el catálogo"
          },
          {
            "t": 84,
            "texto": "Para partir hoy"
          },
          {
            "t": 93.9,
            "texto": "Cierre"
          }
        ]
      },
      {
        "id": "tienda2-tu-stock-y-cuanto-ganas",
        "slug": "tu-stock-y-cuanto-ganas",
        "titulo": "Tu stock y cuánto ganas",
        "resumen": "Alertas de reposición, el valor de tu inventario, los más vendidos y el margen de cada producto.",
        "duracion": "1:19",
        "segundos": 79,
        "src": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-tienda2-tu-stock-y-cuanto-ganas.mp4?alt=media",
        "poster": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-tienda2-tu-stock-y-cuanto-ganas.jpg?alt=media",
        "capitulos": [
          {
            "t": 0,
            "texto": "Introducción"
          },
          {
            "t": 8.3,
            "texto": "Alerta de reposición"
          },
          {
            "t": 16.8,
            "texto": "Sumar stock"
          },
          {
            "t": 24.2,
            "texto": "Filtros de stock"
          },
          {
            "t": 29.8,
            "texto": "Pestaña Stock"
          },
          {
            "t": 34.3,
            "texto": "Valor del inventario"
          },
          {
            "t": 43.4,
            "texto": "Más vendidos"
          },
          {
            "t": 53.4,
            "texto": "Rentabilidad por producto"
          },
          {
            "t": 61.1,
            "texto": "La regla del stock"
          },
          {
            "t": 71.7,
            "texto": "Cierre"
          }
        ]
      },
      {
        "id": "tienda3-vende-en-el-local",
        "slug": "vende-en-el-local",
        "titulo": "Vende en el local",
        "resumen": "Vender desde la Agenda o Productos, con cliente, vendedor, comisión y pago dividido. Historial, reservas del club y devoluciones.",
        "duracion": "1:32",
        "segundos": 92,
        "src": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-tienda3-vende-en-el-local.mp4?alt=media",
        "poster": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-tienda3-vende-en-el-local.jpg?alt=media",
        "capitulos": [
          {
            "t": 0,
            "texto": "Introducción"
          },
          {
            "t": 8.7,
            "texto": "El botón Vender"
          },
          {
            "t": 16.7,
            "texto": "Producto, cantidad y descuento"
          },
          {
            "t": 27.1,
            "texto": "Cliente y vendedor"
          },
          {
            "t": 35.8,
            "texto": "Método de pago"
          },
          {
            "t": 42.9,
            "texto": "Con el cliente en el sillón"
          },
          {
            "t": 50.1,
            "texto": "Historial de ventas"
          },
          {
            "t": 60.5,
            "texto": "Reservas del club"
          },
          {
            "t": 70.2,
            "texto": "Devoluciones, venta y uso interno"
          },
          {
            "t": 83.3,
            "texto": "Cierre"
          }
        ]
      },
      {
        "id": "tienda4-ofertas-que-venden",
        "slug": "ofertas-que-venden",
        "titulo": "Ofertas que venden",
        "resumen": "Ofertas por producto o por categoría, con fecha de término, y cómo se aplican en la caja, la agenda y la tienda.",
        "duracion": "1:16",
        "segundos": 76,
        "src": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-tienda4-ofertas-que-venden.mp4?alt=media",
        "poster": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-tienda4-ofertas-que-venden.jpg?alt=media",
        "capitulos": [
          {
            "t": 0,
            "texto": "Introducción"
          },
          {
            "t": 7.5,
            "texto": "Oferta por producto"
          },
          {
            "t": 17.3,
            "texto": "Cómo se ve"
          },
          {
            "t": 24.3,
            "texto": "Oferta por categoría"
          },
          {
            "t": 36.9,
            "texto": "Cómo se aplican"
          },
          {
            "t": 48.5,
            "texto": "En tu tienda"
          },
          {
            "t": 55.2,
            "texto": "Antes de bajar el precio"
          },
          {
            "t": 64,
            "texto": "La urgencia vende"
          },
          {
            "t": 70.4,
            "texto": "Cierre"
          }
        ]
      },
      {
        "id": "tienda5-tu-tienda-online",
        "slug": "tu-tienda-online",
        "titulo": "Tu tienda online",
        "resumen": "Publica tu tienda, conecta Mercado Pago, elige la entrega y compártela. Así la ve tu cliente.",
        "duracion": "1:32",
        "segundos": 92,
        "src": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-tienda5-tu-tienda-online.mp4?alt=media",
        "poster": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-tienda5-tu-tienda-online.jpg?alt=media",
        "capitulos": [
          {
            "t": 0,
            "texto": "Introducción"
          },
          {
            "t": 9,
            "texto": "Publicar tu tienda"
          },
          {
            "t": 17.3,
            "texto": "Unidades que quedan"
          },
          {
            "t": 24.1,
            "texto": "Entrega"
          },
          {
            "t": 31.6,
            "texto": "Mercado Pago"
          },
          {
            "t": 43.2,
            "texto": "Lo que ve tu cliente"
          },
          {
            "t": 49.9,
            "texto": "Carrito o apartar para la cita"
          },
          {
            "t": 57.1,
            "texto": "Productos a pedido"
          },
          {
            "t": 64.3,
            "texto": "Finalizar la compra"
          },
          {
            "t": 73,
            "texto": "Compartir tu tienda"
          },
          {
            "t": 85.9,
            "texto": "Cierre"
          }
        ]
      },
      {
        "id": "tienda6-pedidos-y-entregas",
        "slug": "pedidos-y-entregas",
        "titulo": "Pedidos y entregas",
        "resumen": "Qué pasa cuando te compran: avisos, estados del pedido y cómo entregar desde la pantalla Entregas.",
        "duracion": "1:19",
        "segundos": 79,
        "src": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-tienda6-pedidos-y-entregas.mp4?alt=media",
        "poster": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-tienda6-pedidos-y-entregas.jpg?alt=media",
        "capitulos": [
          {
            "t": 0,
            "texto": "Introducción"
          },
          {
            "t": 7.8,
            "texto": "Cuando un cliente paga"
          },
          {
            "t": 14.7,
            "texto": "Ventas de la tienda"
          },
          {
            "t": 25.3,
            "texto": "Estados del pedido"
          },
          {
            "t": 36.8,
            "texto": "Marcar entregado"
          },
          {
            "t": 42.3,
            "texto": "La pantalla Entregas"
          },
          {
            "t": 51.6,
            "texto": "Buscar y entregar"
          },
          {
            "t": 63.6,
            "texto": "Tu mejor vendedor"
          },
          {
            "t": 71.9,
            "texto": "Cierre"
          }
        ]
      }
    ]
  },
  {
    "slug": "clientes-que-vuelven",
    "titulo": "Haz que tus clientes vuelvan",
    "bajada": "Sorteos y herramientas para que tus clientes vuelvan y te recomienden.",
    "lecciones": [
      {
        "id": "sorteos1-haz-un-sorteo",
        "slug": "haz-un-sorteo",
        "titulo": "Haz un sorteo en tu local",
        "resumen": "Crea el sorteo y su premio, arma el formulario y las bases, comparte el QR, mira a tus inscritos y elige al ganador con la ruleta.",
        "duracion": "1:48",
        "segundos": 108,
        "src": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-sorteos1-haz-un-sorteo.mp4?alt=media",
        "poster": "https://firebasestorage.googleapis.com/v0/b/barberia-elegance.firebasestorage.app/o/assets%2Fcurso-sorteos1-haz-un-sorteo.jpg?alt=media",
        "capitulos": [
          {
            "t": 0.3,
            "texto": "Introducción"
          },
          {
            "t": 5.8,
            "texto": "Nuevo sorteo"
          },
          {
            "t": 10.3,
            "texto": "Tipo, nombre y foto"
          },
          {
            "t": 21.3,
            "texto": "Premio y fechas"
          },
          {
            "t": 30.3,
            "texto": "Qué datos pides"
          },
          {
            "t": 39.2,
            "texto": "Tus preguntas"
          },
          {
            "t": 47.2,
            "texto": "Bases del sorteo"
          },
          {
            "t": 56.7,
            "texto": "Compártelo"
          },
          {
            "t": 64.2,
            "texto": "Tu cliente se inscribe"
          },
          {
            "t": 74.2,
            "texto": "Tus inscritos"
          },
          {
            "t": 82.2,
            "texto": "Gira la ruleta"
          },
          {
            "t": 92.2,
            "texto": "Avísale al ganador"
          },
          {
            "t": 100.2,
            "texto": "Cierre"
          }
        ]
      }
    ]
  }
];
