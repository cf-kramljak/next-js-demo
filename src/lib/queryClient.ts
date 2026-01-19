import { cache } from "react";

import { QueryClient } from "@tanstack/react-query";

export const queryClientDefaultOptions = {
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: true,
      refetchOnMount: false,
    },
    mutations: {
      retry: false,
    },
  },
};

export const getSSRQueryClient = cache(
  () => new QueryClient(queryClientDefaultOptions),
);
