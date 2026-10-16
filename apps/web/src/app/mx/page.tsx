import PaisLanding, { metadataPais } from "@/components/PaisLanding";

/* Se regenera una vez al día con el tipo de cambio del día (lib/cambio.ts). */
export const revalidate = 86400;

export function generateMetadata() {
  return metadataPais("mx");
}

export default function Page() {
  return <PaisLanding codigo="mx" />;
}
