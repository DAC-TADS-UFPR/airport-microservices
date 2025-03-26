import { getPostsType } from "../config/api";

export default async function getItems(params: any, type: string) {
  const queryKey = ["key", params, type];
  const data = await getPostsType({ key: "key", queryKey });
  return data;
}
