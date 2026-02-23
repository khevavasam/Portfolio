import { Box, Container, SimpleGrid, Stack, Text } from "@chakra-ui/react";

import Starfield from "./components/Starfield";
import ProjectsGrid from "./components/ProjectsGrid";
import Education from "./components/Education";
import Skills from "./components/Skills";
import { projects } from "@/data/projects";
import NavBar from "./components/NavBar";

import { i18n } from "@/i18n";

export default function Page() {
  const year = new Date().getFullYear();

  const stats = [
    i18n.home.stats.exp,
    i18n.home.stats.projects,
    i18n.home.stats.quality,
  ];

  return (
    <>
      <Starfield />
      <NavBar />

      {/* HERO */}
      <Container maxW="6xl" py={{ base: "2.5rem", md: "3.5rem" }}>
        <Stack gap="1rem" align="center" textAlign="center">
          <Box as="div" aria-label={i18n.home.hero.avatarLabel} className="avatar-hero" />

          <Box as="span" className="text-gradient" fontWeight="800" fontSize={{ base: "2rem", md: "3rem" }}>
            {i18n.home.hero.name}
          </Box>

          <Text maxW="60ch" opacity={0.85} fontSize={{ base: "1rem", md: "1.125rem" }}>
            {i18n.home.hero.subtitle}
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap="1rem" mt="1.5rem">
          {stats.map((s) => (
            <Box key={s.label} className="glass hover-glass hover-accent" p="1.25rem" borderRadius="0.75rem">
              <Box fontSize="2rem" fontWeight="800">
                {s.value}
              </Box>
              <Box opacity={0.8}>{s.label}</Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      <Box as="section" id="projects" py={{ base: "2.5rem", md: "3.5rem" }}>
        <Container maxW="6xl">
          <Stack gap="0.5rem" align="center" textAlign="center" mb="2rem">
            <Box as="span" className="text-gradient" fontWeight="800" fontSize={{ base: "1.75rem", md: "2.25rem" }}>
              {i18n.home.projects.title}
            </Box>
            <Text opacity={0.85}>{i18n.home.projects.subtitle}</Text>
          </Stack>

          <ProjectsGrid items={projects} />
        </Container>
      </Box>

      <Education />

      <Skills />

      <Container maxW="6xl" py="1.5rem">
        <Box opacity={0.75} fontSize="0.9rem">
          {i18n.home.footer.text(year)}
        </Box>
      </Container>
    </>
  );
}
