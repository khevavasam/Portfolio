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
import HeroContent from "@/components/hero/HeroContent";

export default function Page() {
  const year = new Date().getFullYear();

  return (
    <>
      <NavBar />

      <Container
        maxW="6xl"
        overflowX="hidden"
        px={{ base: 4, md: 6 }}
        pt={{ base: "11rem", md: "12rem" }}
        pb={{ base: "2.5rem", md: "3.5rem" }}
      >
        <Grid
          templateColumns={{ base: "1fr", md: "minmax(320px, 420px) minmax(0, 1fr)" }}
          alignItems="center"
          gap={{ base: 10, md: 14 }}
        >
          <Box display="flex" justifyContent={{ base: "center", md: "flex-start" }}>
            <HeroProfileCard />
          </Box>

          <Box minW={0}>
            <HeroContent />
          </Box>
        </Grid>
      </Container>

      <Box as="section" id="projects" py={{ base: "2.5rem", md: "3.5rem" }}>
        <Container maxW="6xl">
          <SectionHeader
            title={i18n.home.projects.title}
            subtitle={i18n.home.projects.subtitle}
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
