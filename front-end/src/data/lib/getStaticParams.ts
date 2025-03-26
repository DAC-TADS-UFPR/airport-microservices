import { notFound } from "next/navigation";
import { getPostsType } from "../config/api";

export default async function getStaticParams(type: string) {
  try {
    const queryKey = ["getPostsTypePosts", "per_page=999&order=desc&", type];
    const posts = await getPostsType({ key: "key", queryKey });
    const array = posts.map((post: any) => {
      return { category: post?._embedded?.["wp:term"]?.[0]?.[0]?.slug, slug: post.slug };
    });
    return array;
  } catch (error) {
    notFound();
  }
}
