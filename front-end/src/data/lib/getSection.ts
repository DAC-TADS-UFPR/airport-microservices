import { getPage } from "../config/api";

export default async function getSection(page: number, section?: string) {
  const queryKey = ["key", page, section];
  const data = await getPage({ key: "key", queryKey });
  return data;
}
