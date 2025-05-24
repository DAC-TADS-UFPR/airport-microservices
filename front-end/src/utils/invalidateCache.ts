import { queryClient } from "@/components/Provider/QueryProvider/QueryProvider";

export function invalidateCache(mainKey: string | string[]): void {
  const keys = Array.isArray(mainKey) ? mainKey : [mainKey];
  queryClient.invalidateQueries({
    predicate: ({ queryKey }) => keys.includes(queryKey[0] as string),
    exact: false
  });
}
