import PaisLanding, { metadataPais } from "@/components/PaisLanding";

export const metadata = metadataPais("pe");

export default function Page() {
  return <PaisLanding codigo="pe" />;
}
