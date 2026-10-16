import { timingSafeEqual } from "crypto";
import { revalidatePath, revalidateTag } from "next/cache";

/* La llama la plataforma (functions → directorioAdmin) cuando el superadmin
   oculta o muestra un local: /locales, las landings por zona, la portada y los
   llms.txt se regeneran en el acto en vez de esperar a la hora. Solo con el
   secreto compartido (REVALIDAR_DIRECTORIO_SECRET, en Vercel y en Secret
   Manager); sin él, 401. */
export const runtime = "nodejs";

function igual(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export async function POST(req: Request) {
  const esperado = process.env.REVALIDAR_DIRECTORIO_SECRET || "";
  const recibido = req.headers.get("x-secreto") || "";
  if (!esperado || !igual(recibido, esperado)) return Response.json({ ok: false }, { status: 401 });
  revalidateTag("directorio");
  for (const ruta of ["/locales", "/", "/llms.txt", "/llms-full.txt", "/sitemap.xml"]) revalidatePath(ruta);
  revalidatePath("/locales/[zona]", "page");
  return Response.json({ ok: true });
}
