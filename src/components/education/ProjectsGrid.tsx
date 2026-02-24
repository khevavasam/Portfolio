"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import CardMediaSwiper from "../shared/CardMediaSwiper";

import {
  Box,
  Button,
  Container,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";

import { FiExternalLink, FiX } from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Thumbs, Pagination, Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Props = { items: Project[] };

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'>
      <defs><linearGradient id='g' x1='0' x2='1'>
        <stop stop-color='#0ea5e9' offset='0'/><stop stop-color='#a78bfa' offset='1'/>
      </linearGradient></defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
            fill='white' opacity='0.85' font-family='system-ui,ui-sans-serif'
            font-size='48'>Preview</text>
    </svg>`
  );

export default function ProjectsGrid({ items }: Props) {
  const [active, setActive] = useState<Project | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onOpen = (p: Project) => {
    setActive(p);
    setActiveIndex(0);
  };
  const onClose = () => {
    setActive(null);
    setThumbsSwiper(null);
    setMainSwiper(null);
    setActiveIndex(0);
  };

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  const activeImages = useMemo(
    () => (active?.images?.length ? active.images : active ? [active.cover] : []),
    [active]
  );

  return (
    <>
      <Container maxW="6xl" px={0}>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: 3, md: 4 }}>
          {items.map((p) => {
            const media = p.previews?.length
              ? p.previews
              : p.images?.length
              ? p.images
              : [p.cover];

            return (
              <Box
                key={p.id}
                borderRadius="xl"
                overflow="hidden"
                boxShadow="sm"
                bg="rgba(255, 255, 255, 0.04)"
                className="project-card glass hover-glass hover-lift hover-accent"
                h="full"
              >
                <CardMediaSwiper
                  images={media}
                  ariaLabel={`Open ${p.title}`}
                  onClick={() => onOpen(p)}
                />

                <Box px={{ base: 4, md: 5 }} py={{ base: 4, md: 5 }}>
                  <HStack align="flex-start" justify="space-between" gap={3}>
                    <VStack align="start" gap={1} flex="1">
                      <Text fontWeight="600" fontSize="md" lineHeight="short">
                        {p.title}
                      </Text>

                      {p.subtitle ? (
                        <Text fontSize="sm" color="gray.500">
                          {p.subtitle}
                        </Text>
                      ) : null}
                    </VStack>

                    {p.href ? (
                      <Link
                        href={p.href}
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
                      </Link>
                    ) : null}
                  </HStack>

                  <Text color="gray.500" mt={3} mb={4}>
                    {p.summary}
                  </Text>

                  <HStack gap={2} flexWrap="wrap">
                    {p.tags.map((t) => (
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
                        className="hover-accent"
                        title={t}
                      >
                        <Text fontSize="sm">{t}</Text>
                      </Box>
                    ))}
                  </HStack>
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>

      {/* Chakra overlay modal */}
      {active ? (
        <Box
          position="fixed"
          inset={0}
          zIndex={1000}
          onClick={onClose}
          bg="rgba(0,0,0,0.6)"
          style={{ backdropFilter: "blur(8px)" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={{ base: 3, md: 6 }}
          py={{ base: 4, md: 8 }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            w="full"
            maxW="5xl"
            maxH="calc(100vh - 64px)"
            overflow="hidden"
            borderRadius="2xl"
            bg="rgba(10, 12, 18, 0.92)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            boxShadow="2xl"
          >
            {/* header */}
            <HStack
              justify="space-between"
              align="flex-start"
              px={{ base: 4, md: 5 }}
              py={{ base: 4, md: 4 }}
              borderBottom="1px solid"
              borderColor="whiteAlpha.200"
            >
              <Box>
                <Text fontWeight="700" fontSize="lg">
                  {active.title}
                </Text>
                {active.subtitle ? (
                  <Text color="whiteAlpha.700" fontSize="sm" mt={1}>
                    {active.subtitle}
                  </Text>
                ) : null}
              </Box>

              <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
                <FiX />
              </Button>
            </HStack>

            {/* body (scrollable) */}
            <Box
              px={{ base: 4, md: 5 }}
              py={{ base: 4, md: 5 }}
              overflowY="auto"
              maxH="calc(100vh - 160px)"
            >
              <Box
                borderRadius="xl"
                overflow="hidden"
                bg="black"
                display="flex"
                alignItems="center"
                justifyContent="center"
                h={{ base: "52vh", md: "62vh" }}
              >
                <Swiper
                  modules={[Thumbs, Pagination, Navigation, Keyboard]}
                  onSwiper={setMainSwiper}
                  onSlideChange={(s) => setActiveIndex(s.realIndex)}
                  keyboard={{ enabled: true, onlyInViewport: true, pageUpDown: false }}
                  thumbs={{ swiper: thumbsSwiper }}
                  pagination={{ clickable: true }}
                  navigation
                  style={{ width: "100%", height: "100%" }}
                >
                  {activeImages.map((src) => (
                    <SwiperSlide key={src}>
                      <Box
                        w="full"
                        h="full"
                        position="relative"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="#0b0f16"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          style={{ objectFit: "contain" }}
                          onError={(e) => ((e.currentTarget as HTMLImageElement).src = FALLBACK)}
                          unoptimized={src.startsWith("data:")}
                        />
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>

              {/* thumbnails */}
              <HStack gap={2} flexWrap="wrap" mt={4}>
                {activeImages.map((src, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <Box
                    key={`t-${src}`}
                    as="button"
                    onClick={() => mainSwiper?.slideTo(i)}
                    aria-current={isActive ? "true" : undefined}
                    title={`Slide ${i + 1}`}
                    borderRadius="lg"
                    overflow="hidden"
                    border="2px solid"
                    borderColor={isActive ? "yellow.300" : "whiteAlpha.300"}
                    w="128px"
                    h="72px"
                    bg="#111"
                    position="relative"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        style={{ objectFit: "cover", display: "block" }}
                        onError={(e) => ((e.currentTarget as HTMLImageElement).src = FALLBACK)}
                        unoptimized={src.startsWith("data:")}
                      />
                    </Box>
                  );
                })}
              </HStack>

              {active.details ? (
                <Text mt={4} color="whiteAlpha.800" className="preline">
                  {active.details}
                </Text>
              ) : null}
            </Box>

            {/* footer */}
            <HStack
              justify="flex-end"
              gap={3}
              px={{ base: 4, md: 5 }}
              py={{ base: 4, md: 4 }}
              borderTop="1px solid"
              borderColor="whiteAlpha.200"
            >
              {active.href ? (
                <Link href={active.href} target="_blank" rel="noreferrer" _hover={{ textDecoration: "none" }}>
                  <Button variant="solid">
                    <HStack gap={2}>
                      <Text>Open demo</Text>
                      <FiExternalLink />
                    </HStack>
                  </Button>
                </Link>
              ) : null}

              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </HStack>
          </Box>
        </Box>
      ) : null}
    </>
  );
}
