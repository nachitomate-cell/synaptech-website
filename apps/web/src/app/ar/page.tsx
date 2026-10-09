import PaisLanding, { metadataPais } from "@/components/PaisLanding";

export const metadata = metadataPais("ar");

export default function Page() {
  return <PaisLanding codigo="ar" />;
}
