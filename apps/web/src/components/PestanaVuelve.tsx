"use client";
import { useEffect } from "react";

/* "¡Vuelve!" en la pestaña (29-10-2026): si el visitante se va a otra pestaña,
   el título alterna entre dos avisos hasta que vuelve, y al volver se restaura
   el que había. Es el mismo truco que tienen las agendas de los locales
   (index.html, _aplicarPestanaVuelve). Sin precios ni promos en el texto: la
   prueba gratis no es igual en todos los países. Google no lo ve: solo corre
   con la pestaña oculta. */
const AVISOS = ["👋 ¡Vuelve!", "📅 Tu agenda te espera"];

export default function PestanaVuelve() {
  useEffect(() => {
    let original = "";
    let timer: ReturnType<typeof setInterval> | null = null;
    let i = 0;
    const alCambiar = () => {
      if (document.hidden) {
        if (timer) return;
        original = document.title;
        i = 0;
        document.title = AVISOS[0];
        timer = setInterval(() => {
          i = (i + 1) % AVISOS.length;
          document.title = AVISOS[i];
        }, 2000);
      } else if (timer) {
        clearInterval(timer);
        timer = null;
        document.title = original;
      }
    };
    document.addEventListener("visibilitychange", alCambiar);
    return () => {
      document.removeEventListener("visibilitychange", alCambiar);
      if (timer) {
        clearInterval(timer);
        document.title = original;
      }
    };
  }, []);
  return null;
}
