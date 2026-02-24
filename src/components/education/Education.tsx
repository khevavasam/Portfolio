// src/app/components/Education.tsx
'use client';

import { Accordion, Box, Container, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { PiGraduationCapBold } from 'react-icons/pi';
import { FiCalendar, FiHome } from 'react-icons/fi';
import styles from './Education.module.css';

export default function Education() {
  const t = useTranslations('education');

  const items = [
    {
      key: 'metropolia',
      title: t('items.0.title'),
      org: t('items.0.org'),
      year: t('items.0.year'),
      desc: t('items.0.desc'),
    },
    {
      key: 'luksia',
      title: t('items.1.title'),
      org: t('items.1.org'),
      year: t('items.1.year'),
      desc: t('items.1.desc'),
    },
  ];

  return (
    <Box as="section" id="education" py={{ base: 12, md: 16 }}>
      <Container maxW="6xl">
        <VStack gap={2} textAlign="center" mb={{ base: 8, md: 10 }}>
          <Heading as="h2" size={{ base: 'lg', md: 'xl' }} className={styles.headingGradient}>
            {t('title')}
          </Heading>

          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.500" maxW="3xl">
            {t('subtitle')}
          </Text>
        </VStack>

        <Accordion.Root collapsible>
          <VStack gap={3} align="stretch">
            {items.map((e) => (
              <Accordion.Item
                key={e.key}
                value={e.key}
                border="0"
                borderRadius="xl"
                overflow="hidden"
                bg="rgba(255, 255, 255, 0.04)"
                boxShadow="sm"
                className={styles.cardHover}
              >
                <Accordion.ItemTrigger px={{ base: 4, md: 5 }} py={{ base: 4, md: 4 }}>
                  <HStack gap={3} w="full" align="flex-start">
                    <Box
                      aria-hidden="true"
                      display="grid"
                      placeItems="center"
                      w="44px"
                      h="44px"
                      borderRadius="xl"
                      bg="rgba(255, 255, 255, 0.06)"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      flexShrink={0}
                    >
                      <PiGraduationCapBold />
                    </Box>

                    <Box flex="1" textAlign="left">
                      <Text fontWeight="600" fontSize={{ base: 'md', md: 'lg' }} lineHeight="short">
                        {e.title}
                      </Text>

                      <HStack gap={3} mt={2} flexWrap="wrap">
                        <HStack gap={2} color="gray.500">
                          <Box aria-hidden="true">
                            <FiHome />
                          </Box>
                          <Text fontSize="sm">{e.org}</Text>
                        </HStack>

                        <Box
                          display="inline-flex"
                          alignItems="center"
                          gap={2}
                          px={3}
                          py={1}
                          borderRadius="full"
                          bg="whiteAlpha.100"
                          border="1px solid"
                          borderColor="whiteAlpha.200"
                          color="gray.200"
                        >
                          <Box aria-hidden="true">
                            <FiCalendar />
                          </Box>
                          <Text fontSize="sm">{e.year}</Text>
                        </Box>
                      </HStack>
                    </Box>

                    <Accordion.ItemIndicator />
                  </HStack>
                </Accordion.ItemTrigger>

                <Accordion.ItemContent
                  px={{ base: 4, md: 5 }}
                  pb={{ base: 4, md: 5 }}
                  pt={0}
                  borderTop="1px solid"
                  borderColor="whiteAlpha.200"
                >
                  <Text color="gray.200" opacity={0.9}>
                    {e.desc}
                  </Text>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </VStack>
        </Accordion.Root>
      </Container>
    </Box>
  );
}
