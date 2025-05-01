import { QueryClient, QueryClientProvider as BaseQueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

export function QueryClientProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  )

  return <BaseQueryClientProvider client={queryClient}>{children}</BaseQueryClientProvider>
}
