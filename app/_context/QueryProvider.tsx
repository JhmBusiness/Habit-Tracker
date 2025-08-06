// src/app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // Optional: for debugging
import { childrenAndStyles } from "../_lib/interfaces/childrenAndStyles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

export function TanstackQueryProvider({ children }: childrenAndStyles) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
