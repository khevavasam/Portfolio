"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { NextIntlClientProvider } from "next-intl";

import { ColorModeProvider } from "@/components/ui/color-mode";

import { en } from "@/i18n/i18n";
import type { I18n } from "@/i18n/i18n";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
        <NextIntlClientProvider locale="en" messages={en as I18n}>
          {children}
        </NextIntlClientProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
