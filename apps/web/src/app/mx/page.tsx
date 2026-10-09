import PaisLanding, { metadataPais } from "@/components/PaisLanding";

export const metadata = metadataPais("mx");

export default function Page() {
  return <PaisLanding codigo="mx" />;
}
