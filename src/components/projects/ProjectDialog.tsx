"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  HStack,
  Link,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./ProjectDialog.module.css";

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

type Props = {
  open: boolean;
  onOpenChange: (details: { open: boolean }) => void;
  selected: Project | null;
};

export default function ProjectDialog({ open, onOpenChange, selected }: Props) {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpenChange = (details: { open: boolean }) => {
    onOpenChange(details);
    if (!details.open) {
      setMainSwiper(null);
      setActiveIndex(0);
    }
  };

  const selectedImages = useMemo(() => {
    if (!selected) return [];
    return (selected.images?.length ? selected.images : [selected.cover]) as string[];
  }, [selected]);

  const showFooter = Boolean(selected?.href);

  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={handleOpenChange}
      size={{ mdDown: "full", md: "xl" }}
      placement="center"
      motionPreset="scale"
      scrollBehavior="inside"
    >
      <Portal>
        <Dialog.Backdrop />

        {/* ВАЖНО: даём отступы сверху/снизу, чтобы не было “на всю высоту” */}
        <Dialog.Positioner p={{ base: 3, md: 6 }}>
          <Dialog.Content
            maxH={{ base: "calc(100vh - 24px)", md: "calc(100vh - 48px)" }}
            overflow="hidden"
            borderRadius={{ base: "xl", md: "2xl" }}
            bg="black"
            border="1px solid"
            borderColor="whiteAlpha.200"
            boxShadow="none"
          >
            {/* Header: только тайтл/саб + крестик */}
            <Dialog.Header
              borderBottom="1px solid"
              borderColor="whiteAlpha.200"
              px={{ base: 4, md: 5 }}
              py={4}
            >
              <VStack align="start" gap={0} flex="1" minW={0}>
                <Dialog.Title fontWeight="700" fontSize="lg" lineClamp={1}>
                  {selected?.title ?? "Project"}
                </Dialog.Title>
                {selected?.subtitle ? (
                  <Text color="whiteAlpha.700" fontSize="sm" mt={1} lineClamp={1}>
                    {selected.subtitle}
                  </Text>
                ) : null}
              </VStack>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" aria-label="Close" />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body
              px={{ base: 4, md: 5 }}
              py={{ base: 4, md: 5 }}
              overflowY="auto"
            >
              {selected ? (
                <VStack align="stretch" gap={4}>
                  {/* Медиа: без синевы, строгий чёрный */}
                  <Box
                    className={styles.modalSwiper}
                    borderRadius="xl"
                    overflow="hidden"
                    bg="black"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    h={{ base: "52vh", md: "62vh" }}
                  >
                    <Swiper
                      modules={[Pagination, Navigation, Keyboard]}
                      onSwiper={setMainSwiper}
                      onSlideChange={(s) => setActiveIndex(s.realIndex)}
                      keyboard={{ enabled: true, onlyInViewport: true, pageUpDown: false }}
                      pagination={{ clickable: true }}
                      navigation
                      style={{ width: "100%", height: "100%" }}
                    >
                      {selectedImages.map((src, i) => (
                        <SwiperSlide key={`${src}-${i}`}>
                          <Box w="full" h="full" position="relative" bg="black">
                            <Image
                              src={src}
                              alt=""
                              fill
                              style={{ objectFit: "contain" }}
                              onError={(e) =>
                                ((e.currentTarget as HTMLImageElement).src = FALLBACK)
                              }
                              unoptimized={src.startsWith("data:")}
                            />
                          </Box>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Box>

                  {/* Thumbs: строгие, без yellow */}
                  {selectedImages.length > 1 ? (
                    <HStack gap={2} flexWrap="wrap">
                      {selectedImages.map((src, i) => {
                        const isActive = i === activeIndex;
                        return (
                          <Box
                            key={`t-${src}-${i}`}
                            as="button"
                            onClick={() => mainSwiper?.slideTo(i)}
                            aria-current={isActive ? "true" : undefined}
                            title={`Slide ${i + 1}`}
                            borderRadius="lg"
                            overflow="hidden"
                            border="2px solid"
                            borderColor={isActive ? "whiteAlpha.800" : "whiteAlpha.300"}
                            w="128px"
                            h="72px"
                            bg="black"
                            position="relative"
                          >
                            <Image
                              src={src}
                              alt=""
                              fill
                              style={{ objectFit: "cover", display: "block" }}
                              onError={(e) =>
                                ((e.currentTarget as HTMLImageElement).src = FALLBACK)
                              }
                              unoptimized={src.startsWith("data:")}
                            />
                          </Box>
                        );
                      })}
                    </HStack>
                  ) : null}

                  {/* Нижний блок оставляем */}
                  {selected.details ? (
                    <Text color="whiteAlpha.800" className={styles.preline}>
                      {selected.details}
                    </Text>
                  ) : null}
                </VStack>
              ) : null}
            </Dialog.Body>

            {/* Footer: только Open demo, без Close текста */}
            {showFooter ? (
              <Dialog.Footer
                borderTop="1px solid"
                borderColor="whiteAlpha.200"
                px={{ base: 4, md: 5 }}
                py={4}
                justifyContent="flex-end"
              >
                <Link
                  href={selected!.href!}
                  target="_blank"
                  rel="noreferrer"
                  _hover={{ textDecoration: "none" }}
                >
                  <Button variant="solid">
                    <HStack gap={2}>
                      <Text>Open demo</Text>
                      <FiExternalLink />
                    </HStack>
                  </Button>
                </Link>
              </Dialog.Footer>
            ) : null}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
