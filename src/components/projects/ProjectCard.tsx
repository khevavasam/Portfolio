"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import CardMediaSwiper from "@/components/shared/CardMediaSwiper";
import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import { useColorModeValue } from "@/components/ui/color-mode";
import styles from "./ProjectCard.module.css";

type Props = {
  project: Project;
  onOpen: (p: Project) => void;
};

export default function ProjectCard({ project, onOpen }: Props) {
  const borderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const borderColorHover = useColorModeValue("blackAlpha.400", "whiteAlpha.400");

  const titleColor = useColorModeValue("gray.900", "gray.100");
  const textMuted = useColorModeValue("gray.700", "gray.300");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");

  const tagBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.300");
  const tagText = useColorModeValue("gray.700", "gray.200");

  const media =
    (project.previews?.length ?? 0) > 0
      ? project.previews!
      : (project.images?.length ?? 0) > 0
        ? project.images!
        : [project.cover];

  return (
    <Card.Root
      as="article"
      variant="outline"
      overflow="hidden"
      bg="transparent"
      borderColor={borderColor}
      h="full"
      cursor="pointer"
      transition="transform 160ms ease, border-color 160ms ease"
      _hover={{ transform: "translateY(-2px)", borderColor: borderColorHover }}
      _active={{ transform: "translateY(0px)" }}
      onClick={() => onOpen(project)}
    >
      {/* Media */}
      <Box
        className={styles.media}
        borderBottom="1px solid"
        borderColor={borderColor}
        position="relative"
      >
        <CardMediaSwiper
          images={media}
          ariaLabel={`Open ${project.title}`}
          className={styles.mediaInner}
          fillHeight
          onClick={() => onOpen(project)}
        />
      </Box>

      {/* Body */}
      <Card.Body gap="2" px={{ base: 4, md: 5 }} py={{ base: 4, md: 5 }}>
        <HStack align="flex-start" justify="space-between" gap={3}>
          <VStack align="start" gap={1} flex="1">
            <Card.Title color={titleColor} fontWeight="700" fontSize="md" lineHeight="short">
              {project.title}
            </Card.Title>

            {project.subtitle ? (
              <Card.Description color={subtitleColor} fontSize="sm">
                {project.subtitle}
              </Card.Description>
            ) : null}
          </VStack>

          {project.href ? (
            <ChakraLink
              as={Link}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              _hover={{ textDecoration: "none" }}
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

        {project.summary ? (
          <Text color={textMuted} mt="2">
            {project.summary}
          </Text>
        ) : null}

        {!!project.tags?.length && (
          <HStack gap={2} flexWrap="wrap" mt="3">
            {project.tags.map((t) => (
              <Badge
                key={t}
                variant="outline"
                borderColor={tagBorder}
                color={tagText}
                px={3}
                py={1}
                borderRadius="full"
                fontWeight="500"
              >
                {t}
              </Badge>
            ))}
          </HStack>
        )}
      </Card.Body>
    </Card.Root>
  );
}
