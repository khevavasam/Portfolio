"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Box, Button, Container, Flex, HStack, Link, VStack } from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";

import { i18n } from "@/i18n";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={10}
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
    >
      <Container maxW="6xl" py="0.75rem">
        <Flex align="center" justify="space-between">
          <HStack gap="0.5rem">
            <Box aria-hidden="true">✨</Box>
            <Box fontWeight="600" className={styles.brandGradient}>
              {i18n.nav.brand}
            </Box>
          </HStack>

          <HStack gap="0.75rem" display={{ base: "none", md: "flex" }}>
            <Link href="#projects" className={styles.navLink}>
              {i18n.nav.projects}
            </Link>
            <Link href="#education" className={styles.navLink}>
              {i18n.nav.education}
            </Link>
            <Link href="#skills" className={styles.navLink}>
              {i18n.nav.skills}
            </Link>

            <Link
              as={NextLink}
              href="/CV.pdf"
              target="_blank"
              rel="noreferrer"
              _hover={{ textDecoration: "none" }}
            >
              <Button size="sm">{i18n.nav.cv}</Button>
            </Link>
          </HStack>

            <Button
            onClick={() => setOpen((v) => !v)}
            variant="ghost"
            display={{ base: "inline-flex", md: "none" }}
            aria-label={i18n.nav.menuLabel}
            >
            <HStack gap="0.5rem">
                <Box as="span" aria-hidden="true">
                {open ? <FiX /> : <FiMenu />}
                </Box>
                <Box as="span">{open ? i18n.nav.close : i18n.nav.menu}</Box>
            </HStack>
            </Button>
        </Flex>

        {/* Mobile panel */}
        {open && (
          <Box mt="0.75rem">
            <VStack align="stretch" gap="0.5rem">
              <Link href="#projects" onClick={close}>
                {i18n.nav.projects}
              </Link>
              <Link href="#education" onClick={close}>
                {i18n.nav.education}
              </Link>
              <Link href="#skills" onClick={close}>
                {i18n.nav.skills}
              </Link>

              <Link
                as={NextLink}
                href="/CV.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={close}
                _hover={{ textDecoration: "none" }}
              >
                <Button w="100%">{i18n.nav.cv}</Button>
              </Link>
            </VStack>
          </Box>
        )}
      </Container>
    </Box>
  );
}
