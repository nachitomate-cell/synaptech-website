import { waLink } from "@/content/catalogo";

const UTM = "utm_source=directorio&utm_medium=seo&utm_campaign=cta-duenos";

/* Para dueños de locales, en el directorio: discreto, al final de cada zona.
   Quien busca dónde cortarse el pelo no lo necesita ver arriba; el dueño que
   llegó buscando su comuna, sí. Dos salidas: el alta en bioo y hablar
   con SynapTech. */
export default function CtaDuenos({ zona, compacto = false }: { zona: string; compacto?: boolean }) {
  const texto = `¿Tienes una barbería, peluquería, spa o centro estético en ${zona}? Súmate al directorio y posiciona tu negocio en Google con agenda online 24/7.`;
  const botones = (
    <div className="flex flex-wrap gap-2">
      <a href={`https://bioo.cl/agenda?${UTM}`}
        className="inline-flex items-center bg-lime text-ink font-semibold px-4 py-2 rounded-full hover:brightness-95 text-[14px]">
        Crear mi agenda
      </a>
      {/* WhatsApp no lleva UTM: la marca viaja en el texto para saber de dónde vino. */}
      <a href={waLink(`Hola, tengo un local en ${zona} y quiero aparecer en el directorio de SynapTech (vengo de /locales)`)} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center border border-current font-semibold px-4 py-2 rounded-full text-[14px] opacity-90 hover:opacity-100">
        Hablar con SynapTech
      </a>
    </div>
  );
  if (compacto) {
    return (
      <div className="mt-4 rounded-2xl bg-mist p-4 text-[14px] text-text-secondary">
        <p className="mb-3">{texto}</p>
        {botones}
      </div>
    );
  }
  return (
    <div className="rounded-[24px] bg-ink text-white p-6 sm:p-8">
      <p className="text-lime text-xs font-bold uppercase tracking-[0.12em]">Para dueños</p>
      <p className="text-white/85 text-lg mt-2 mb-4 max-w-2xl">{texto}</p>
      {botones}
    </div>
  );
}
