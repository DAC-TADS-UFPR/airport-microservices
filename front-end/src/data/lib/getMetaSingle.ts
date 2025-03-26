import { notFound } from "next/navigation";
import { getMeta } from "../config/api";
import he from "he";

export default async function getMetaSingle(params: { slug: string }, type: string) {
  try {
    const { title, excerpt, acf } = await getMeta(params.slug, type);
    const data = acf?.header_seo;
    const blog = {
      titulo: he.decode(title?.rendered) + " | Cassol",
      descricao: excerpt?.rendered
    };
    return {
      title: data?.titulo || blog?.titulo,
      description: data?.descricao || blog?.descricao,
      openGraph: {
        images: [acf?.sectionOne?.image_desktop?.url || acf?.sectionOne?.image?.url]
      }
    };
  } catch (error) {
    notFound();
  }
}
