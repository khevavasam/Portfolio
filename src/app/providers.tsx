"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { NextIntlClientProvider } from "next-intl";

import { en } from "@/i18n/i18n";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="en" messages={en as any}>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </NextIntlClientProvider>
  );
}
