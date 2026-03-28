"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { IconType } from "react-icons";
import { Box, Heading, HStack, Icon, Marquee, SimpleGrid, Text } from "@chakra-ui/react";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
import { IoLogoLinkedin, IoLogoGitlab, IoLogoJavascript } from "react-icons/io5";
import { i18n } from "@/i18n";

const RotatingText = dynamic(
  () => import("@/components/RotatingText"),
  { ssr: false }
) as React.ComponentType<{
  texts: readonly string[];
  splitBy?: string;
  rotationInterval?: number;
  transition?: object;
  initial?: object;
  animate?: object;
  exit?: object;
  mainClassName?: string;
  gradient?: boolean;
}>;

type MarqueeItemIcon = {
  type: "icon";
  icon: IconType;
  label: string;
  color?: string;
};

type MarqueeItemImage = {
  type: "image";
  src: string;
  label: string;
  width?: number;
  height?: number;
};

type MarqueeItem = MarqueeItemIcon | MarqueeItemImage;

const marqueeItems: MarqueeItem[] = [
  { type: "icon", icon: SiReact, label: "React", color: "#61DAFB" },
  { type: "icon", icon: SiNextdotjs, label: "Next.js", color: "#FFFFFF" },
  { type: "icon", icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { type: "icon", icon: SiTailwindcss, label: "Tailwind CSS", color: "#38BDF8" },
  { type: "image", src: "/logos/gateway.svg", label: "Gateway", width: 92, height: 26 },
  { type: "icon", icon: IoLogoLinkedin, label: "LinkedIn", color: "#0077B5" },
  { type: "icon", icon: IoLogoGitlab, label: "GitLab", color: "#FC6D26" },
  { type: "icon", icon: IoLogoJavascript, label: "JavaScript", color: "#F7DF1E" },
];

export default function HeroContent() {
  const { hero, stats } = i18n.home;

  return (
    <Box
      minW={0}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={{ base: 6, md: 8 }}
      overflowX="hidden"
    >
      <Box display="flex" flexDirection="column" gap={{ base: 3, md: 4 }}>
        <Text
          fontSize={{ base: "xs", md: "sm" }}
          fontWeight="700"
          textTransform="uppercase"
          letterSpacing="0.22em"
          color="orange.300"
        >
          Frontend Engineer
        </Text>

        <Heading
          as="h1"
          color="white"
          fontWeight="800"
          letterSpacing="-0.04em"
          lineHeight={{ base: "0.96", md: "0.92" }}
          fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
          maxW={{ base: "12ch", md: "11ch" }}
        >
          <Box as="span" display="block">
            {hero.headline}
          </Box>

          <Box
            as="span"
            display="block"
            mt={{ base: 1, md: 2 }}
            minH={{ base: "1.05em", md: "1.1em" }}
            userSelect="none"
            cursor="default"
          >
            <RotatingText
              texts={hero.rotatingWords}
              rotationInterval={2600}
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-115%", opacity: 0 }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
              gradient
            />
          </Box>
        </Heading>

        <Text
          maxW="56ch"
          fontSize={{ base: "15px", md: "lg" }}
          lineHeight={{ base: "1.9", md: "1.85" }}
          color="whiteAlpha.800"
          pt={{ base: 1, md: 2 }}
        >
          {hero.description}
        </Text>
      </Box>

      <SimpleGrid
        columns={{ base: 1, sm: 3 }}
        gap={{ base: 5, md: 8 }}
        maxW="3xl"
        pt={{ base: 1, md: 2 }}
      >
        <HeroStat value={stats.gateway.value} label={stats.gateway.label} />
        <HeroStat value={stats.frontend.value} label={stats.frontend.label} />
        <HeroStat value={stats.teamwork.value} label={stats.teamwork.label} />
      </SimpleGrid>

      <HStack gap={3} flexWrap="wrap" align="stretch" pt={{ base: 1, md: 2 }}>
        <a href="mailto:you@mail.com" style={{ textDecoration: "none" }}>
          <Box
            as="span"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            rounded="xl"
            bg="orange.500"
            px={6}
            py={3}
            fontSize="sm"
            fontWeight="700"
            color="white"
            transition="all 0.2s ease"
            _hover={{
              bg: "orange.600",
              transform: "translateY(-1px)",
            }}
            _focusVisible={{
              outline: "2px solid",
              outlineColor: "orange.300",
              outlineOffset: "2px",
            }}
          >
            {hero.letsTalk}
          </Box>
        </a>

        <Link href="#projects" style={{ textDecoration: "none" }}>
          <Box
            as="span"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            rounded="xl"
            borderWidth="1px"
            borderColor="whiteAlpha.200"
            bg="transparent"
            px={6}
            py={3}
            fontSize="sm"
            fontWeight="700"
            color="white"
            transition="all 0.2s ease"
            _hover={{
              bg: "whiteAlpha.100",
              borderColor: "whiteAlpha.300",
              transform: "translateY(-1px)",
            }}
            _focusVisible={{
              outline: "2px solid",
              outlineColor: "whiteAlpha.300",
              outlineOffset: "2px",
            }}
          >
            <Text as="span">{hero.viewProjects}</Text>
            <Box as="span" aria-hidden>
              →
            </Box>
          </Box>
        </Link>
      </HStack>

      <HeroTechMarquee />
    </Box>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <Box>
      <Text
        fontSize={{ base: "4xl", md: "5xl" }}
        lineHeight="0.9"
        fontWeight="800"
        letterSpacing="-0.04em"
        color="white"
      >
        {value}
      </Text>

      <Text
        mt={2}
        fontSize={{ base: "xs", md: "sm" }}
        textTransform="uppercase"
        letterSpacing="0.12em"
        lineHeight="1.55"
        color="whiteAlpha.700"
        maxW="16ch"
      >
        {label}
      </Text>
    </Box>
  );
}

function HeroTechMarquee() {
  return (
    <Box mt={{ base: 6, md: 8 }} pt={{ base: 2, md: 3 }} w="full" minW={0} overflow="hidden">
      <Marquee.Root speed={30} autoFill>
        <Marquee.Viewport>
          <Marquee.Content>
            {marqueeItems.map((item, index) => (
              <Marquee.Item key={`${item.label}-${index}`} px={{ base: 6, md: 8 }}>
                <Box
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  aria-label={item.label}
                  opacity={0.95}
                >
                  {item.type === "icon" ? (
                    <Icon
                      as={item.icon}
                      boxSize={{ base: 8, md: 10 }}
                      color={item.color ?? "white"}
                      flexShrink={0}
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.label}
                      width={item.width ?? 48}
                      height={item.height ?? 48}
                      draggable={false}
                      style={{
                        objectFit: "contain",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </Box>
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </Box>
  );
}
