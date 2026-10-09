import { SIGNUP_URL, waLink } from "@/content/catalogo";

export default function CtaFinal() {
  return (
    <section className="py-16 md:py-24 bg-mist">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-ink">Empieza hoy con SynapTech.</h2>
        <p className="text-text-secondary text-lg mt-5 leading-relaxed">
          Crea tu local en minutos o escríbenos y te lo dejamos andando.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <a href={`${SIGNUP_URL}?ref=home-final`}
            className="inline-flex justify-center items-center bg-ink text-white font-semibold px-7 py-4 rounded-full hover:bg-black transition-colors">
            Empezar gratis
          </a>
          <a href={waLink("Hola, quiero conocer SynapTech para mi local")} target="_blank" rel="noopener noreferrer"
            className="inline-flex justify-center items-center border border-ink/15 bg-white text-ink font-semibold px-7 py-4 rounded-full hover:border-ink/40 transition-colors">
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
