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
  const cardBg = useColorModeValue("white", "rgba(255,255,255,0.04)");
  const hoverBg = useColorModeValue("blackAlpha.50", "rgba(255,255,255,0.06)");

  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const metaColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const descColor = useColorModeValue("gray.700", "whiteAlpha.800");

  const iconBg = useColorModeValue("blackAlpha.50", "rgba(255,255,255,0.06)");

  const openBg = useColorModeValue(
    "linear-gradient(90deg, rgba(245,158,11,0.18) 0%, rgba(249,115,22,0.14) 35%, rgba(239,68,68,0.12) 70%, rgba(251,113,133,0.10) 100%)",
    "linear-gradient(90deg, rgba(245,158,11,0.22) 0%, rgba(249,115,22,0.18) 35%, rgba(239,68,68,0.16) 70%, rgba(251,113,133,0.14) 100%)"
  );

  const openBorder = useColorModeValue("orange.300", "orange.300");

  const items = [
    { key: "metropolia", title: t("items.0.title"), org: t("items.0.org"), year: t("items.0.year"), desc: t("items.0.desc") },
    { key: "luksia", title: t("items.1.title"), org: t("items.1.org"), year: t("items.1.year"), desc: t("items.1.desc") },
  ];

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
                _hover={{ borderColor: useColorModeValue("blackAlpha.300", "whiteAlpha.300") }}
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
                      bg={iconBg}
                      border="1px solid"
                      borderColor={border}
                      flexShrink={0}
                      color={titleColor}
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
                          bg={iconBg}
                          border="1px solid"
                          borderColor={border}
                        >
                          <Box aria-hidden="true">
                            <FiCalendar />
                          </Box>
                          <Text fontSize="sm">{e.year}</Text>
                        </HStack>
                      </HStack>
                    </Box>

                    <Accordion.ItemIndicator />
                  </HStack>
                </Accordion.ItemTrigger>

                <Accordion.ItemContent px={{ base: 4, md: 5 }} pb={{ base: 4, md: 5 }} pt={0} borderTop="1px solid" borderColor={border}>
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
