"use client";

import { useMemo, useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Link,
  Tabs,
  Menu,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import { i18n } from "@/i18n";

type NavItem = { value: string; label: string; href: string };

export default function NavBar() {
  const [active, setActive] = useState("projects");

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
  const tabSelectedBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const tabText = useColorModeValue("blackAlpha.800", "whiteAlpha.900");

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
            <Tabs.Root
              value={active}
              onValueChange={(d) => {
                const next = d.value;
                const item = items.find((x) => x.value === next);
                if (item) goTo(item.href, item.value);
              }}
              variant="line"
              size="md"
            >
              <Tabs.List>
                {items.map((it) => (
                  <Tabs.Trigger
                    key={it.value}
                    value={it.value}
                    px={3}
                    py={2}
                    borderRadius="md"
                    color={tabText}
                    _selected={{ bg: tabSelectedBg }}
                  >
                    {it.label}
                  </Tabs.Trigger>
                ))}
                <Tabs.Indicator />
              </Tabs.List>
            </Tabs.Root>

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
