import PaginaDirectorio, { metadataDirectorio } from "@/components/PaginaDirectorio";

/* Directorio por rubro y zona, con datos vivos (ver lib/paginas-directorio.ts). */
export const revalidate = 3600;
export const generateMetadata = () => metadataDirectorio("barberias-quinta-region");
export default function Page() { return <PaginaDirectorio slug="barberias-quinta-region" />; }
