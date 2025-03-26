import { getPostType } from "../config/api";

export default async function getItem(search: any, type: string, section?: string) {
  const queryKey = ["key", search, section, type];
  const data = await getPostType({ key: "key", queryKey });
  return data;
}
