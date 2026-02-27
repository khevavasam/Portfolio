"use client";

import { Box, Stack, Text } from "@chakra-ui/react";
import styles from "@/app/page.module.css";
import { i18n } from "@/i18n";

export default function HeroTitle() {
  return (
    <Stack gap="1rem" align="center" textAlign="center">
      <Box as="div" aria-label={i18n.home.hero.avatarLabel} className={styles.avatarHero} />

      <Box
        as="span"
        className={styles.textGradient}
        fontWeight="800"
        fontSize={{ base: "2rem", md: "3rem" }}
      >
        {i18n.home.hero.name}
      </Box>

      <Text maxW="60ch" opacity={0.85} fontSize={{ base: "1rem", md: "1.125rem" }}>
        {i18n.home.hero.subtitle}
      </Text>
    </Stack>
  );
}

