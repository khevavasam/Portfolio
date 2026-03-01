"use client";

import React, { useState } from "react";
import { Box, Container, Heading, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import SectionHeader from "@/components/section/SectionHeader";
import { useTranslations } from "next-intl";
import { useColorModeValue } from "@/components/ui/color-mode";
import {
  FiTool,
  FiDatabase,
  FiCloud,
  FiServer,
  FiGlobe,
  FiShield,
  FiFeather,
  FiCode,
  FiGitBranch,
  FiBox,
} from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiBootstrap,
  SiVite,
  SiDjango,
  SiPhp,
  SiMysql,
  SiPostgresql,
  SiNginx,
  SiVercel,
  SiHtml5,
} from "react-icons/si";
import * as motion from "motion/react-client";
import styles from "./Skills.module.css";

type SkillColumn = {
  key: string;
  title: string;
  note?: string;
  icon: React.ReactNode;
  tags: string[];
};

const TAG_ICON: Record<string, React.ReactNode> = {
  React: <SiReact />,
  "Next.js": <SiNextdotjs />,
  TypeScript: <SiTypescript />,
  JavaScript: <SiJavascript />,
  "HTML/CSS": <SiHtml5 />,
  "Tailwind CSS": <SiTailwindcss />,
  Bootstrap: <SiBootstrap />,
  SSR: <FiServer />,
  i18n: <FiGlobe />,
  Vite: <SiVite />,

  Django: <SiDjango />,
  Wagtail: <FiFeather />,
  PHP: <SiPhp />,
  MySQL: <SiMysql />,
  PostgreSQL: <SiPostgresql />,
  "REST APIs": <FiCode />,
  "OAuth2 (Allauth)": <FiShield />,

  "Git/GitHub": <FiGitBranch />,
  Docker: <FiBox />,
  Vercel: <SiVercel />,
  Nginx: <SiNginx />,
};

export default function Skills() {
  const t = useTranslations("skills");

  const cardBg = useColorModeValue("white", "rgba(255, 255, 255, 0.04)");
  const cardBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const cardHoverBg = useColorModeValue("blackAlpha.50", "rgba(255, 255, 255, 0.07)");
  const cardHoverBorder = useColorModeValue("blackAlpha.300", "whiteAlpha.300");

  const headingColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const subtitleColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const iconColor = useColorModeValue("gray.900", "whiteAlpha.900");

  const columns: SkillColumn[] = [
    {
      key: "frontend",
      title: t("columns.frontend.title"),
      note: t("columns.frontend.note"),
      icon: <FiTool />,
      tags: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "Bootstrap", "SSR", "i18n", "Vite"],
    },
    {
      key: "backend",
      title: t("columns.backend.title"),
      note: t("columns.backend.note"),
      icon: <FiDatabase />,
      tags: ["Django", "Wagtail", "PHP", "MySQL", "PostgreSQL", "REST APIs", "OAuth2 (Allauth)"],
    },
    {
      key: "other",
      title: t("columns.other.title"),
      note: t("columns.other.note"),
      icon: <FiCloud />,
      tags: ["Git/GitHub", "Docker", "Vercel", "Nginx"],
    },
  ];

  return (
    <Box as="section" id="skills" py={{ base: 12, md: 16 }}>
      <Container maxW="6xl">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} gradientClassName={styles.headingGradient} />

        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={4} mt={6}>
          {columns.map((col) => (
            <Box
              key={col.key}
              borderRadius="md"
              overflow="hidden"
              bg={cardBg}
              border="1px solid"
              borderColor={cardBorder}
              h="full"
              transition="background-color 160ms ease, border-color 160ms ease, transform 160ms ease"
              _hover={{ bg: cardHoverBg, borderColor: cardHoverBorder, transform: "translateY(-2px)" }}
            >
              {/* ВАЖНО: noSelect на весь контент карточки */}
              <Box px={{ base: 4, md: 5 }} py={{ base: 4, md: 5 }} className={styles.noSelect}>
                <HStack gap={3} mb={3} align="center">
                  <Box aria-hidden="true" className={styles.iconBubbleLg} flexShrink={0} color={iconColor}>
                    {col.icon}
                  </Box>

                  <Heading as="h3" size="md" color={headingColor}>
                    {col.title}
                  </Heading>
                </HStack>

                {col.note ? (
                  <Text color={subtitleColor} fontSize="sm" mb={4}>
                    {col.note}
                  </Text>
                ) : null}

                <Box display="flex" flexWrap="wrap" gap={2} rowGap={3} position="relative">
                  {col.tags.map((tag) => (
                    <DragLockChip key={`${col.key}-${tag}`} label={tag} icon={TAG_ICON[tag]} />
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

function DragLockChip({ label, icon }: { label: string; icon?: React.ReactNode }) {
  const [activeDirection, setActiveDirection] = useState<"x" | "y" | null>(null);

  const chipBg = useColorModeValue("blackAlpha.50", "rgba(255,255,255,0.06)");
  const chipBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const chipText = useColorModeValue("gray.800", "whiteAlpha.900");

  const hoverBg = useColorModeValue("blackAlpha.100", "rgba(255,255,255,0.10)");
  const hoverBorder = useColorModeValue("orange.300", "orange.300");

  const dragShadow = useColorModeValue(
    "0 0 0 1px rgba(245,158,11,0.16), 0 14px 32px rgba(0,0,0,0.14)",
    "0 0 0 1px rgba(245,158,11,0.22), 0 16px 38px rgba(0,0,0,0.40)"
  );

  return (
    <>
      <Line direction="x" activeDirection={activeDirection} />
      <Line direction="y" activeDirection={activeDirection} />

      <motion.div
        drag
        dragDirectionLock
        onDirectionLock={(direction) => setActiveDirection(direction)}
        onDragEnd={() => setActiveDirection(null)}
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
        dragElastic={0.2}
        whileDrag={{ cursor: "grabbing" }}
        onPointerDown={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        style={{
          display: "inline-block",
          position: "relative",
          zIndex: activeDirection ? 50 : 1,

          userSelect: "none",
          WebkitUserSelect: "none",
          msUserSelect: "none",
          WebkitTouchCallout: "none",
          WebkitTapHighlightColor: "transparent",
          touchAction: "none",
        }}
      >
        <HStack
          px="0.85rem"
          py="0.55rem"
          borderRadius="999px"
          gap={2}
          cursor="grab"
          userSelect="none"
          bg={chipBg}
          border="1px solid"
          borderColor={chipBorder}
          color={chipText}
          boxShadow={activeDirection ? dragShadow : undefined}
          transition="transform 120ms ease, background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease"
          _hover={{ transform: "translateY(-1px)", bg: hoverBg, borderColor: hoverBorder }}
        >
          {icon ? (
            <Box aria-hidden="true" userSelect="none" pointerEvents="none" display="grid" placeItems="center">
              {icon}
            </Box>
          ) : null}

          <Text
            fontSize="sm"
            fontWeight="600"
            letterSpacing="0.2px"
            lineHeight="1"
            userSelect="none"
            pointerEvents="none"
          >
            {label}
          </Text>
        </HStack>
      </motion.div>
    </>
  );
}

function Line({
  direction,
  activeDirection,
}: {
  direction: "x" | "y";
  activeDirection: "x" | "y" | null;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 0 }}
      transition={{ duration: 0 }}
      style={{ ...line, rotate: direction === "y" ? 90 : 0 }}
    />
  );
}

const line: React.CSSProperties = {
  width: 300,
  height: 1,
  borderTop: "1px dashed rgba(255,255,255,0.35)",
  position: "absolute",
};
