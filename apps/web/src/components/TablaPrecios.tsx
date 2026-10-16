import { clp, type FilaPrecio } from "@/lib/precios";

/* "Precios referenciales de servicios en {zona}": desde · típico · hasta, con
   enlaces a los locales que ofrecen cada servicio. Todo en el HTML del servidor. */
export default function TablaPrecios({ titulo, filas, id }: { titulo: string; filas: FilaPrecio[]; id?: string }) {
  if (!filas.length) return null;
  return (
    <div id={id} className="rounded-[20px] bg-white border border-border-subtle p-5 sm:p-6 scroll-mt-28">
      <h3 className="font-display font-bold text-ink text-lg tracking-tight mb-3">{titulo}</h3>
      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-[14px] min-w-[480px]">
          <thead>
            <tr className="text-left text-text-muted">
              <th className="font-semibold py-1.5 px-1">Servicio</th>
              <th className="font-semibold py-1.5 px-1">Desde</th>
              <th className="font-semibold py-1.5 px-1">Típico</th>
              <th className="font-semibold py-1.5 px-1">Hasta</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((f) => (
              <tr key={f.tipo} className="border-t border-border-subtle align-top">
                <td className="py-2 px-1">
                  <span className="font-semibold text-ink">{f.nombre}</span>
                  <span className="block text-[12.5px] text-text-muted">
                    {f.locales.map((l, i) => (
                      <span key={l.id}>{i > 0 && ", "}<a href={`/locales#local-${l.id}`} className="hover:text-ink hover:underline underline-offset-2">{l.nombre}</a></span>
                    ))}
                  </span>
                </td>
                <td className="py-2 px-1 whitespace-nowrap">{clp(f.min)}</td>
                <td className="py-2 px-1 whitespace-nowrap">{clp(f.mediana)}</td>
                <td className="py-2 px-1 whitespace-nowrap">{clp(f.max)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[12px] text-text-muted mt-3">El precio más bajo de cada servicio en cada local, según su reserva online. Cada local confirma el valor final.</p>
    </div>
  );
}
