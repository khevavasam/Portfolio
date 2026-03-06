// src/app/page.tsx
import { Box, Container, Grid } from "@chakra-ui/react";

import ProjectsGrid from "@/components/education/ProjectsGrid";
import Education from "@/components/education/Education";
import Skills from "@/components/education/Skills";
import { projects } from "@/data/projects";
import NavBar from "@/components/navbar/NavBar";
import { i18n } from "@/i18n";

import SectionHeader from "@/components/section/SectionHeader";

import { ScrollTimeline } from "@/components/lightswind/scroll-timeline";
import { timelineEvents } from "@/components/timeline/events";

import HeroProfileCard from "@/components/hero/HeroProfileCard";
import HeroLanyard from "@/components/hero/HeroLanyard";
import styles from "./page.module.css";

export default function Page() {
  const year = new Date().getFullYear();

  return (
    <>
      <NavBar />

      <Container
          maxW="6xl"
          pt={{ base: "10rem", md: "10rem" }}  // подвинул вниз от нава
          pb={{ base: "2.5rem", md: "3.5rem" }}
        >
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={{ base: 10, md: 14 }}
          alignItems="center"
        >
          <HeroProfileCard />

          <HeroLanyard />
        </Grid>
      </Container>

      <Box as="section" id="projects" py={{ base: "2.5rem", md: "3.5rem" }}>
        <Container maxW="6xl">
          <SectionHeader
            title={i18n.home.projects.title}
            subtitle={i18n.home.projects.subtitle}
            gradientClassName={styles.textGradient}
          />
          <ProjectsGrid items={projects} />
        </Container>
      </Box>

      <Box
        as="section"
        id="timeline"
        pt={{ base: "88px", md: "96px" }}
        pb={{ base: "2.5rem", md: "3.5rem" }}
      >
        <ScrollTimeline
          events={timelineEvents}
          title="Career Timeline"
          subtitle="Scroll to explore my professional journey"
          progressIndicator
          cardAlignment="alternating"
          connectorStyle="line"
          revealAnimation="fade"
        />
      </Box>

      <Box as="section" id="education">
        <Education />
      </Box>

      <Box as="section" id="skills">
        <Skills />
      </Box>

      <Container maxW="6xl" py="1.5rem">
        <Box opacity={0.75} fontSize="0.9rem">
          {i18n.home.footer.text(year)}
        </Box>
      </Container>
    </>
  );
}
