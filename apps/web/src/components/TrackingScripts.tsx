"use client";

import Script from "next/script";
import { useConsentimiento } from "@/lib/useConsentimiento";

// "SynapTech Studio — Pixel" (cuenta de anuncios act_2625197834231867). La variable
// nunca se cargó en Vercel y el sitio salía sin Pixel: sin audiencias de quienes
// visitan la web ni forma de medir qué páginas llevan a WhatsApp. El id es público.
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1486229456859656";
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
// Pixel de OpenAI (ChatGPT Ads, origen de datos "synaptechspa.cl", 02-11-2026). Mide
// "Lead web (WhatsApp o alta)" = lead_created: el clic a WhatsApp o a un link de alta.
// El id es público. `?oaiq_debug=1` en la URL prende el modo debug del SDK.
const OPENAI_PIXEL_ID = process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID || "T1bJQ8QvzGekrsYn73SKVk";

/* Desde el 05-11-2026 los tres pixels se cargan SOLO si la persona aceptó
   "Anuncios" en el aviso de cookies (lib/consentimiento.ts). Antes se cargaban
   en cada visita mientras /privacidad decía que no usábamos cookies de
   publicidad. Si revoca, guardarConsentimiento recarga la página. */
export default function TrackingScripts() {
  const consentimiento = useConsentimiento();
  if (!consentimiento?.anuncios) return null;
  return (
    <>
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="lazyOnload">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
          (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${META_PIXEL_ID}');fbq('track','PageView');
          document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href*="wa.me"],a[href*="api.whatsapp.com"]');
            if(a&&window.fbq)fbq('track','Contact',{content_name:location.pathname});},true);
        `}</Script>
      )}

      {OPENAI_PIXEL_ID && (
        <Script id="openai-pixel" strategy="afterInteractive">{`
          !function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");
          oaiq("init",{pixelId:"${OPENAI_PIXEL_ID}",debug:/[?&]oaiq_debug=1/.test(location.search)});
          document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href*="wa.me"],a[href*="api.whatsapp.com"],a[href*="crear.synaptechspa.cl"],a[href*="crea.synaptechspa.cl"],a[href*="empieza.synaptechspa.cl"],a[href*="bioo.cl/agenda"]');
            if(a&&window.oaiq)oaiq("measure","lead_created",{type:"customer_action"});},true);
        `}</Script>
      )}

      {LINKEDIN_PARTNER_ID && (
        <Script id="linkedin-insight" strategy="lazyOnload">{`
          _linkedin_partner_id="${LINKEDIN_PARTNER_ID}";
          window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};
          window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];
          var b=document.createElement("script");b.type="text/javascript";b.async=true;
          b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
          s.parentNode.insertBefore(b,s)})(window.lintrk);
        `}</Script>
      )}
    </>
  );
}
