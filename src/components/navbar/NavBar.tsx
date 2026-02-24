"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Box, Button, Container, Flex, HStack, Link, VStack } from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";

import { ColorModeButton } from "@/components/ui/color-mode";
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

  const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className={styles.navLink}
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
      _focusVisible={{ outline: "2px solid", outlineOffset: "2px" }}
      onClick={close}
    >
      {children}
    </Link>
  );

  return (
  <Box
    as="nav"
    position="sticky"
    top={0}
    zIndex={10}
    bg={{ base: "white", _dark: "black" }}
    borderBottomWidth="1px"
    borderColor={{ base: "blackAlpha.200", _dark: "whiteAlpha.200" }}
  >
    <Container maxW="full" px={{ base: "1rem", md: "2rem" }} py="0.75rem">
      <Flex align="center" justify="space-between">
        {/* left: brand */}
        <HStack gap="0.6rem">
          <Box aria-hidden="true">✨</Box>
          <Box
            fontWeight="700"
            fontSize={{ base: "1.05rem", md: "1.2rem" }}
            className={styles.brandGradient}
            lineHeight="1"
          >
            {i18n.nav.brand}
          </Box>
        </HStack>

        {/* right: desktop menu */}
        <HStack gap="0.9rem" display={{ base: "none", md: "flex" }}>
          <Link
            href="#projects"
            className={styles.navLink}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            _focusVisible={{ outline: "2px solid", outlineOffset: "2px" }}
          >
            {i18n.nav.projects}
          </Link>

          <Link
            href="#education"
            className={styles.navLink}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            _focusVisible={{ outline: "2px solid", outlineOffset: "2px" }}
          >
            {i18n.nav.education}
          </Link>

          <Link
            href="#skills"
            className={styles.navLink}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            _focusVisible={{ outline: "2px solid", outlineOffset: "2px" }}
          >
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

          <ColorModeButton />
        </HStack>

        {/* right: mobile controls */}
        <HStack gap="0.5rem" display={{ base: "flex", md: "none" }}>
          <ColorModeButton />

          <Button
            onClick={() => setOpen((v) => !v)}
            variant="ghost"
            aria-label={i18n.nav.menuLabel}
          >
            <HStack gap="0.5rem">
              <Box as="span" aria-hidden="true">
                {open ? <FiX /> : <FiMenu />}
              </Box>
              <Box as="span">{open ? i18n.nav.close : i18n.nav.menu}</Box>
            </HStack>
          </Button>
        </HStack>
      </Flex>

      {/* Mobile panel */}
      {open && (
        <Box mt="0.75rem" borderWidth="1px" borderRadius="lg" p="0.75rem">
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
