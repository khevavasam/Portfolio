"use client";

import React, { useMemo } from "react";
import { Box, Circle, HStack, Marquee } from "@chakra-ui/react";

import { useColorModeValue } from "@/components/ui/color-mode";

function repeat<T>(arr: T[], times = 10) {
  return Array.from({ length: times }).flatMap(() => arr);
}

type Props = {
  border?: boolean;
};

export default function HeroVerticalMarquee({ border = true }: Props) {
  const items = useMemo(
    () =>
      repeat(
        [
          "2+ years React / Next.js",
          "6+ months commercial (gateway.fm)",
          "TypeScript",
          "SSR flows",
          "REST APIs",
          "API integrations",
          "Build / CI",
          "Performance",
          "Maintainable code",
          "Code reviews",
        ],
        12
      ),
    []
  );

  // theme-aware colors
  const borderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.850");
  const dotColor = useColorModeValue("blackAlpha.400", "whiteAlpha.400");

  // fog should match background
  const fogGradient = useColorModeValue(
    // light: fade to white
    `linear(to-r,
      rgba(255,255,255,0.98) 0%,
      rgba(255,255,255,0.75) 10%,
      rgba(255,255,255,0) 22%,
      rgba(255,255,255,0) 78%,
      rgba(255,255,255,0.75) 90%,
      rgba(255,255,255,0.98) 100%
    )`,
    // dark: fade to black
    `linear(to-r,
      rgba(0,0,0,0.98) 0%,
      rgba(0,0,0,0.75) 10%,
      rgba(0,0,0,0) 22%,
      rgba(0,0,0,0) 78%,
      rgba(0,0,0,0.75) 90%,
      rgba(0,0,0,0.98) 100%
    )`
  );

  return (
    <Box
      mt={{ base: "1.25rem", md: "1.75rem" }}
      borderTop={border ? "1px solid" : undefined}
      borderBottom={border ? "1px solid" : undefined}
      borderColor={borderColor}
      py={{ base: 4, md: 5 }}
      position="relative"
      overflow="hidden"
    >
      {/* edge fog */}
      <Box
        pointerEvents="none"
        position="absolute"
        inset={0}
        zIndex={1}
        bgGradient={fogGradient}
        style={{ filter: "blur(6px)" }}
      />

      <Box position="relative" zIndex={2}>
        <Marquee.Root speed={26}>
          <Marquee.Viewport>
            <Marquee.Content>
              {items.map((item, i) => (
                <Marquee.Item key={i} ps="8">
                  <HStack gap="8" textStyle={{ base: "sm", md: "md" }} fontWeight="600">
                    <Box whiteSpace="nowrap" color={textColor}>
                      {item}
                    </Box>
                    <Circle size="1.5" bg={dotColor} />
                  </HStack>
                </Marquee.Item>
              ))}
            </Marquee.Content>
          </Marquee.Viewport>
        </Marquee.Root>
      </Box>
    </Box>
  );
}
