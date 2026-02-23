"use client";

import { useId, useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import CardMediaSwiper from "./CardMediaSwiper";

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

import { FiExternalLink } from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
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
  const modalId = useId().replace(/:/g, "");
  const [active, setActive] = useState<Project | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const onOpen = (p: Project) => setActive(p);
  const onClose = () => setActive(null);

  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
                  modalTarget={`#${modalId}`}
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

      {/* MODAL (оставляем как есть — шаг 4 будет отдельно) */}
      <div className="modal fade" id={modalId} tabIndex={-1} aria-hidden="true" onClick={onClose}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div
            className="modal-content bg-dark text-light border-0 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header border-0">
              <div>
                <h5 className="modal-title mb-0">{active?.title}</h5>
                {active?.subtitle && <div className="text-white-50 small">{active.subtitle}</div>}
              </div>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>

            {active && (
              <div className="modal-body">
                <div
                  className="mb-3 rounded overflow-hidden d-flex align-items-center justify-content-center bg-black"
                  style={{ height: "62vh" }}
                >
                  <Swiper
                    modules={[Thumbs, Pagination, Navigation, Keyboard]}
                    onSwiper={setMainSwiper}
                    onSlideChange={(s) => setActiveIndex(s.realIndex)}
                    keyboard={{ enabled: true, onlyInViewport: true, pageUpDown: false }}
                    thumbs={{ swiper: thumbsSwiper }}
                    pagination={{ clickable: true }}
                    navigation
                    className="w-100 h-100"
                  >
                    {activeImages.map((src) => (
                      <SwiperSlide key={src} className="d-flex align-items-center justify-content-center">
                        <img
                          src={src}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "contain", background: "#0b0f16" }}
                          onError={(e) => ((e.currentTarget as HTMLImageElement).src = FALLBACK)}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className="mt-2 d-flex flex-wrap gap-2">
                  {activeImages.map((src, i) => (
                    <button
                      key={"t-" + src}
                      type="button"
                      onClick={() => mainSwiper?.slideTo(i)}
                      aria-current={i === activeIndex ? "true" : undefined}
                      className={`p-0 rounded overflow-hidden border ${
                        i === activeIndex ? "border-4 border-warning" : "border-secondary"
                      }`}
                      style={{ width: 128, height: 72, background: "#111" }}
                      title={`Slide ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        onError={(e) => ((e.currentTarget as HTMLImageElement).src = FALLBACK)}
                      />
                    </button>
                  ))}
                </div>

                {active.details && <p className="preline mt-3 mb-0 text-white-75">{active.details}</p>}
              </div>
            )}

            <div className="modal-footer border-0">
              {active?.href && (
                <a className="btn btn-primary" href={active.href} target="_blank" rel="noreferrer">
                  Open demo
                </a>
              )}
              <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
