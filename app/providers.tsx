"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient'; // 导入QueryClient实例

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}> 
    <HeroUIProvider navigate={router.push}>
      {/* <NextThemesProvider {...themeProps}> */}
        {children}
        {/* </NextThemesProvider> */}
    </HeroUIProvider>
        </QueryClientProvider>
  );
}
