import { useMutation } from "@tanstack/react-query";

export const useApiMutation = <TInput, TOutput>(
  mutationFn: (input: TInput) => Promise<TOutput>
) => {
  return useMutation({
    mutationFn,
  });
};
