import { Box, Container, Stack, Text } from "@chakra-ui/react";

import ProjectsGrid from "@/components/education/ProjectsGrid";
import Education from "@/components/education/Education";
import Skills from "@/components/education/Skills";
import { projects } from "@/data/projects";
import NavBar from "@/components/navbar/NavBar";
import { i18n } from "@/i18n";

import HeroTitle from "@/components/hero/HeroTitle";
import HeroVerticalMarquee from "@/components/hero/HeroVerticalMarquee";

import styles from "./page.module.css";

export default function Page() {
  const year = new Date().getFullYear();

  return (
    <>
      <NavBar />

      <Container maxW="6xl" py={{ base: "2.5rem", md: "3.5rem" }}>
        <HeroTitle />
        <HeroVerticalMarquee />
      </Container>

      <Box as="section" id="projects" py={{ base: "2.5rem", md: "3.5rem" }}>
        <Container maxW="6xl">
          <Stack gap="0.5rem" align="center" textAlign="center" mb="2rem">
            <Box
              as="span"
              className={styles.textGradient}
              fontWeight="800"
              fontSize={{ base: "1.75rem", md: "2.25rem" }}
            >
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
