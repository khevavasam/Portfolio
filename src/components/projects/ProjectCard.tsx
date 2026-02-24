"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import CardMediaSwiper from "@/components/shared/CardMediaSwiper";
import {
  Box,
  Button,
  HStack,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import styles from "./ProjectCard.module.css";

type Props = {
  project: Project;
  onOpen: (p: Project) => void;
};

export default function ProjectCard({ project, onOpen }: Props) {
  const media =
    (project.previews?.length ?? 0) > 0
      ? project.previews!
      : (project.images?.length ?? 0) > 0
        ? project.images!
        : [project.cover];

  return (
    <Box
      as="article"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="sm"
      bg="rgba(255, 255, 255, 0.04)"
      className={styles.card}
      h="full"
    >
      <Box className={styles.media} display="block" position="relative">
        <CardMediaSwiper
          images={media}
          ariaLabel={`Open ${project.title}`}
          onClick={() => onOpen(project)}
          className={styles.mediaInner}
          fillHeight
        />
      </Box>

      <Box px={{ base: 4, md: 5 }} py={{ base: 4, md: 5 }}>
        <HStack align="flex-start" justify="space-between" gap={3}>
          <VStack align="start" gap={1} flex="1">
            <Text fontWeight="600" fontSize="md" lineHeight="short">
              {project.title}
            </Text>
            {project.subtitle ? (
              <Text fontSize="sm" color="gray.500">
                {project.subtitle}
              </Text>
            ) : null}
          </VStack>
          {project.href ? (
            <ChakraLink
              as={Link}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              _hover={{ textDecoration: "none" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button size="sm" variant="outline">
                <HStack gap={2}>
                  <Text>Demo</Text>
                  <FiExternalLink />
                </HStack>
              </Button>
            </ChakraLink>
          ) : null}
        </HStack>

        <Text color="gray.500" mt={3} mb={4}>
          {project.summary}
        </Text>

        <HStack gap={2} flexWrap="wrap">
          {project.tags.map((t) => (
            <Box
              key={t}
              display="inline-flex"
              alignItems="center"
              px={3}
              py={1}
              borderRadius="full"
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor="whiteAlpha.200"
              color="gray.200"
              className={styles.tag}
              title={t}
            >
              <Text fontSize="sm">{t}</Text>
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
