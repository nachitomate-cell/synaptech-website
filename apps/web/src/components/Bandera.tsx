import type { CodigoPais } from "@/content/paises";

/* Banderas dibujadas con franjas (sin escudos ni soles): los emojis de bandera
   no se ven en Windows (salen las letras "PE") y la imagen de vista previa
   (next/og) tendría que bajarlos de un CDN. Solo estilos en línea y flex, para
   que sirva igual en la página y en la imagen OG. Son <span> para poder ir
   dentro de un <p> (un <div> ahí rompe el HTML). */
const FRANJAS: Record<CodigoPais, { dir: "row" | "column"; franjas: [string, number][] }> = {
  pe: { dir: "row", franjas: [["#D91023", 1], ["#FFFFFF", 1], ["#D91023", 1]] },
  co: { dir: "column", franjas: [["#FCD116", 2], ["#003893", 1], ["#CE1126", 1]] },
  mx: { dir: "row", franjas: [["#006847", 1], ["#FFFFFF", 1], ["#CE1126", 1]] },
  ar: { dir: "column", franjas: [["#74ACDF", 1], ["#FFFFFF", 1], ["#74ACDF", 1]] },
};

export default function Bandera({ codigo, ancho = 21, radio = 3 }: { codigo: CodigoPais; ancho?: number; radio?: number }) {
  const f = FRANJAS[codigo];
  const alto = Math.round((ancho * 2) / 3);
  return (
    <span
      aria-hidden
      style={{
        display: "flex", flexDirection: f.dir, width: ancho, height: alto, borderRadius: radio,
        overflow: "hidden", flexShrink: 0, boxShadow: "0 0 0 1px rgba(15,26,43,0.14)",
      }}
    >
      {f.franjas.map(([color, peso], i) => (
        <span key={i} style={{ display: "flex", flexGrow: peso, flexBasis: 0, backgroundColor: color }} />
      ))}
    </span>
  );
}
