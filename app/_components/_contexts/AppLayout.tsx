"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppProvider from "./AppContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppProvider>
  );
}
