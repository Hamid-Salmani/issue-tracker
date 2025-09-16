import { useQuery } from "@tanstack/react-query";

export const useApiQuery = <TOutput>(
  key: string | unknown[],
  queryFn: () => Promise<TOutput>,
  enabled = true
) => {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn,
    enabled,
  });
};
