"use client";

import { Accordion, Box, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useColorModeValue } from "@/components/ui/color-mode";
import SectionHeader from "@/components/section/SectionHeader";
import { PiGraduationCapBold } from "react-icons/pi";
import { FiCalendar, FiHome } from "react-icons/fi";
import styles from "./Education.module.css";

export default function Education() {
  const t = useTranslations("education");

  const border = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const hoverBorder = useColorModeValue("blackAlpha.300", "whiteAlpha.300");

  const cardBg = useColorModeValue("white", "rgba(255,255,255,0.04)");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const metaColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const descColor = useColorModeValue("gray.700", "whiteAlpha.800");

  const chipBaseBg = useColorModeValue("blackAlpha.50", "rgba(255,255,255,0.06)");
  const chipGradientBg = useColorModeValue(
    "linear-gradient(90deg, rgba(245,158,11,0.18) 0%, rgba(249,115,22,0.16) 40%, rgba(251,113,133,0.14) 100%)",
    "linear-gradient(90deg, rgba(245,158,11,0.24) 0%, rgba(249,115,22,0.20) 40%, rgba(251,113,133,0.18) 100%)"
  );
  const chipBorder = useColorModeValue("orange.300", "orange.300");
  const chipText = useColorModeValue("gray.800", "whiteAlpha.900");
  const chipGlow = useColorModeValue(
    "0 0 0 1px rgba(245,158,11,0.20), 0 8px 18px rgba(251,113,133,0.10)",
    "0 0 0 1px rgba(245,158,11,0.22), 0 10px 22px rgba(251,113,133,0.16)"
  );

  const openBg = useColorModeValue(
    "linear-gradient(90deg, rgba(245,158,11,0.18) 0%, rgba(249,115,22,0.14) 35%, rgba(239,68,68,0.12) 70%, rgba(251,113,133,0.10) 100%)",
    "linear-gradient(90deg, rgba(245,158,11,0.22) 0%, rgba(249,115,22,0.18) 35%, rgba(239,68,68,0.16) 70%, rgba(251,113,133,0.14) 100%)"
  );
  const openBorder = useColorModeValue("orange.300", "orange.300");

  const items = [
    { key: "metropolia", title: t("items.0.title"), org: t("items.0.org"), year: t("items.0.year"), desc: t("items.0.desc") },
    { key: "luksia", title: t("items.1.title"), org: t("items.1.org"), year: t("items.1.year"), desc: t("items.1.desc") },
  ];

  const chipStyles = {
    bg: chipBaseBg,
    bgImage: chipGradientBg,
    border: "1px solid",
    borderColor: chipBorder,
    boxShadow: chipGlow,
    color: chipText,
  } as const;

  const chipHoverFloat = { transform: "translateY(-1px)" } as const;

  return (
    <Box as="section" id="education" py={{ base: 12, md: 16 }}>
      <Container maxW="6xl">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} gradientClassName={styles.headingGradient} />

        <Accordion.Root collapsible>
          <VStack gap={3} align="stretch">
            {items.map((e) => (
              <Accordion.Item
                key={e.key}
                value={e.key}
                border="1px solid"
                borderColor={border}
                borderRadius="md"
                overflow="hidden"
                bg={cardBg}
                boxShadow="none"
                transition="background-color 160ms ease, border-color 160ms ease"
                _hover={{ borderColor: hoverBorder }}
                _open={{ bgImage: openBg, borderColor: openBorder }}
              >
                <Accordion.ItemTrigger px={{ base: 4, md: 5 }} py={4}>
                  <HStack gap={3} w="full" align="flex-start">
                    <Box
                      aria-hidden="true"
                      display="grid"
                      placeItems="center"
                      w="44px"
                      h="44px"
                      borderRadius="lg"
                      flexShrink={0}
                      transition="transform 160ms ease, box-shadow 160ms ease"
                      _hover={chipHoverFloat}
                      {...chipStyles}
                    >
                      <PiGraduationCapBold />
                    </Box>

                    <Box flex="1" minW={0} textAlign="left">
                      <Text fontWeight="600" fontSize={{ base: "md", md: "lg" }} lineHeight="short" color={titleColor}>
                        {e.title}
                      </Text>

                      <HStack gap={3} mt={2} flexWrap="wrap" color={metaColor}>
                        <HStack gap={2}>
                          <Box aria-hidden="true">
                            <FiHome />
                          </Box>
                          <Text fontSize="sm">{e.org}</Text>
                        </HStack>

                        <HStack
                          gap={2}
                          px={3}
                          py={1}
                          borderRadius="full"
                          transition="transform 160ms ease, filter 160ms ease"
                          _hover={{ ...chipHoverFloat, filter: "brightness(1.05)" }}
                          {...chipStyles}
                        >
                          <Box aria-hidden="true">
                            <FiCalendar />
                          </Box>
                          <Text fontSize="sm" fontWeight="600" letterSpacing="0.2px">
                            {e.year}
                          </Text>
                        </HStack>
                      </HStack>
                    </Box>

                    <Accordion.ItemIndicator />
                  </HStack>
                </Accordion.ItemTrigger>

                <Accordion.ItemContent
                  px={{ base: 4, md: 5 }}
                  pb={{ base: 4, md: 5 }}
                  pt={0}
                  borderTop="1px solid"
                  borderColor={border}
                >
                  <Text color={descColor}>{e.desc}</Text>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </VStack>
        </Accordion.Root>
      </Container>
    </Box>
  );
}
