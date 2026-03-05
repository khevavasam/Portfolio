"use client";

import { MorphingNavigation } from "@/components/lightswind/morphing-navigation";
import { Button as LsButton } from "@/components/lightswind/button";

import { useColorMode } from "@/components/ui/color-mode";
import { Moon, Sun } from "lucide-react";

import { i18n } from "@/i18n";

export default function GooeyNavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <MorphingNavigation
        links={[
          { id: "projects", label: i18n.nav.projects, href: "#projects" },
          { id: "timeline", label: "Timeline", href: "#timeline" },
          { id: "education", label: i18n.nav.education, href: "#education" },
          { id: "skills", label: i18n.nav.skills, href: "#skills" },
          { id: "cv", label: i18n.nav.cv, href: "/CV.pdf" },
        ]}
        theme="glass"
        scrollThreshold={110}
        initialTop={18}
        compactTop={12}
        animationDuration={0.6}
        onLinkClick={(link) => {
          if (link.href === "/CV.pdf") {
            window.open("/CV.pdf", "_blank", "noreferrer");
          }
        }}
      />

      {/* Theme toggle: Chakra logic, Lightswind UI */}
      <div className="fixed z-[60] right-3 top-3 md:right-5 md:top-5">
        <LsButton
          size="icon"
          variant="outline"
          onClick={toggleColorMode}
          aria-label="Toggle theme"
          className="rounded-full backdrop-blur-md bg-white/10 border-white/15"
        >
          {colorMode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </LsButton>
      </div>
    </>
  );
}
