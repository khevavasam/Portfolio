"use client";

import { useMemo, useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  HStack,
  Link,
  Menu,
  Text,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import { i18n } from "@/i18n";

type NavItem = { value: string; label: string; href: string };

const MotionBox = motion(Box);

export default function NavBar() {
  const [active, setActive] = useState("projects");
  const [hovered, setHovered] = useState<string | null>(null);

  const items: NavItem[] = useMemo(
    () => [
      { value: "projects", label: i18n.nav.projects, href: "#projects" },
      { value: "education", label: i18n.nav.education, href: "#education" },
      { value: "skills", label: i18n.nav.skills, href: "#skills" },
    ],
    []
  );

  const goTo = (href: string, value: string) => {
    setActive(value);

    if (typeof window === "undefined") return;

    const id = href.startsWith("#") ? href.slice(1) : href;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = href;
  };

  // theme-aware styling
  const navBg = useColorModeValue("white", "black");
  const border = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const tabText = useColorModeValue("blackAlpha.800", "whiteAlpha.900");
  const pillBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");

  // pill follows hover, otherwise active
  const pillTarget = hovered ?? active;

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={10}
      bg={navBg}
      borderBottomWidth="1px"
      borderColor={border}
    >
      <Container maxW="full" px={{ base: "1rem", md: "2rem" }} py="0.75rem">
        <Flex align="center" justify="center">
          {/* Desktop center */}
          <HStack display={{ base: "none", md: "flex" }} gap={3} align="center">
            {/* iOS-like nav pills */}
            <HStack
              gap={1}
              p="2px"
              borderRadius="full"
              onMouseLeave={() => setHovered(null)}
            >
              {items.map((it) => {
                const isTarget = it.value === pillTarget;

                return (
                  <chakra.button
                    key={it.value}
                    type="button"
                    onMouseEnter={() => setHovered(it.value)}
                    onFocus={() => setHovered(it.value)}
                    onBlur={() => setHovered(null)}
                    onClick={() => goTo(it.href, it.value)}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <Box
                      position="relative"
                      px={4}
                      py={2}
                      borderRadius="full"
                      color={tabText}
                    >
                      <AnimatePresence initial={false}>
                        {isTarget ? (
                          <MotionBox
                            layoutId="nav-pill"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 650,
                              damping: 45,
                            }}
                            position="absolute"
                            inset="0"
                            borderRadius="full"
                            bg={pillBg}
                            zIndex={0}
                          />
                        ) : null}
                      </AnimatePresence>

                      <Text position="relative" zIndex={1} fontWeight="500">
                        {it.label}
                      </Text>
                    </Box>
                  </chakra.button>
                );
              })}
            </HStack>

            <Link
              as={NextLink}
              href="/CV.pdf"
              target="_blank"
              rel="noreferrer"
              _hover={{ textDecoration: "none" }}
            >
              <Button size="sm" variant="outline">
                {i18n.nav.cv}
              </Button>
            </Link>

            <ColorModeButton />
          </HStack>

          {/* Mobile center */}
          <HStack display={{ base: "flex", md: "none" }} gap={2} align="center">
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button variant="outline" size="sm" aria-label={i18n.nav.menuLabel}>
                  <FiMenu />
                </Button>
              </Menu.Trigger>

              <Menu.Positioner>
                <Menu.Content minW="220px">
                  {items.map((it) => (
                    <Menu.Item
                      key={it.value}
                      value={it.value}
                      onClick={() => goTo(it.href, it.value)}
                    >
                      {it.label}
                    </Menu.Item>
                  ))}

                  <Menu.Separator />

                  <Menu.Item value="cv" asChild>
                    <Link
                      as={NextLink}
                      href="/CV.pdf"
                      target="_blank"
                      rel="noreferrer"
                      _hover={{ textDecoration: "none" }}
                    >
                      {i18n.nav.cv}
                    </Link>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>

            <ColorModeButton />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
