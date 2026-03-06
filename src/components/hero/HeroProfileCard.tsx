"use client";

import ProfileCard from "@/components/hero/ProfileCard";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

export default function HeroProfileCard() {
  const isLight = useColorModeValue(true, false);

  const behindGlowColor = useColorModeValue(
    "rgba(255, 170, 120, 0.28)", // light: очень мягкий теплый glow
    "rgba(255, 120, 80, 0.55)"   // dark: поярче
  );

  const innerGradient = useColorModeValue(
    // light: прям светлая "плёнка", почти белая, чуть тёплая
    "linear-gradient(145deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 230, 210, 0.55) 38%, rgba(255, 190, 230, 0.22) 60%, rgba(255,255,255,0) 82%)",
    // dark: sunset vibe
    "linear-gradient(145deg, rgba(255, 160, 60, 0.22) 0%, rgba(255, 80, 140, 0.14) 45%, rgba(0,0,0,0) 75%)"
  );

  return (
    <Box
      w="full"
      display={{ base: "flex", md: "block" }}
      justifyContent={{ base: "center", md: "initial" }}
    >
      <ProfileCard
        className={`pc-theme-sunset ${isLight ? "pc-light" : "pc-dark"}`}
        avatarUrl="/me.png"
        miniAvatarUrl="/me2.jpg"
        name="Khevavasam"
        title="Frontend React Developer"
        handle="khev"
        status="Online"
        contactText="Contact"
        showUserInfo
        enableTilt
        enableMobileTilt
        behindGlowEnabled
        behindGlowSize="52%"
        behindGlowColor={behindGlowColor}
        innerGradient={innerGradient}
        onContactClick={() => window.open("mailto:you@mail.com")}
      />
    </Box>
  );
}
