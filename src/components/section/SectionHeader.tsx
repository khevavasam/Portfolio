"use client";

import { Box, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

type Props = {
  title: string;
  subtitle: string;
  gradientClassName: string;
};

/** Единый стиль заголовка секции (как в Projects): градиентный заголовок + подзаголовок с учётом темы */
export default function SectionHeader({ title, subtitle, gradientClassName }: Props) {
  const subtitleColor = useColorModeValue("blackAlpha.700", "whiteAlpha.800");

  return (
    <Stack gap="0.5rem" align="center" textAlign="center" mb="2rem">
      <Box
        as="span"
        className={gradientClassName}
        fontWeight="800"
        fontSize={{ base: "1.75rem", md: "2.25rem" }}
      >
        {title}
      </Box>
      <Text color={subtitleColor} fontSize={{ base: "md", md: "lg" }} maxW="3xl">
        {subtitle}
      </Text>
    </Stack>
  );
}
