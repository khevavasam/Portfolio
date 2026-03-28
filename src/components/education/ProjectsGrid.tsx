"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectDialog from "@/components/projects/ProjectDialog";
import { Container, SimpleGrid } from "@chakra-ui/react";

type Props = { items: Project[] };

export default function ProjectsGrid({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  const handleOpen = (p: Project) => {
    setSelected(p);
    setOpen(true);
  };

  const handleOpenChange = (details: { open: boolean }) => {
    setOpen(details.open);
    if (!details.open) {
      setSelected(null);
    }
  };

  return (
    <>
      <Container maxW="6xl" px={0}>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: 3, md: 4 }}>
          {items.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={handleOpen} />
          ))}
        </SimpleGrid>
      </Container>

      <ProjectDialog open={open} onOpenChange={handleOpenChange} selected={selected} />
    </>
  );
}
