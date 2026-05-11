"use client";
import { useEffect, useState } from "react";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(pct >= 0.5);
    };
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <a
      href="https://wa.me/56983568212?text=Hola%20Synaptech%2C%20quiero%20saber%20m%C3%A1s%20sobre%20sus%20servicios"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className={`group fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#25d366] flex items-center justify-center shadow-lg
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.528 5.847L.057 23.882a.5.5 0 0 0 .614.614l6.035-1.471A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.887 9.887 0 0 1-5.031-1.372l-.361-.213-3.732.91.927-3.63-.234-.374A9.898 9.898 0 0 1 2.1 12C2.1 6.529 6.529 2.1 12 2.1c5.47 0 9.9 4.43 9.9 9.9 0 5.471-4.43 9.9-9.9 9.9z"/>
      </svg>
      {/* Tooltip */}
      <span className="absolute right-14 bg-bg-secondary text-text-primary text-xs font-mono px-3 py-1.5 rounded-lg border border-border-subtle whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Conversemos
      </span>
    </a>
  );
}
