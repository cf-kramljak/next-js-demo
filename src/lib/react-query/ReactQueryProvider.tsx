"use client";

import { type ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "@tanstack/react-query";

import { queryClientDefaultOptions } from "./queryClient";

interface IProps {
  children: ReactNode;
}

const ReactQueryProvider = ({ children }: IProps) => {
  const [client] = useState(
    () => new QueryClient({ ...queryClientDefaultOptions }),
  );

  const dehydratedState = dehydrate(client, {
    shouldDehydrateQuery: () => true,
  });

  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
