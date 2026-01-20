import { cache } from "react";

import { QueryClient } from "@tanstack/react-query";

export const queryClientDefaultOptions = {
  defaultOptions: {
    queries: {
      staleTime: Number.POSITIVE_INFINITY,
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
};

export const getCachedQueryClient = cache(
  () =>
    new QueryClient({
      ...queryClientDefaultOptions,
    }),
);
