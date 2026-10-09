import PaisLanding, { metadataPais } from "@/components/PaisLanding";

export const metadata = metadataPais("co");

export default function Page() {
  return <PaisLanding codigo="co" />;
}
