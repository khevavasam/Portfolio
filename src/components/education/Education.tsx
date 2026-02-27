// src/app/components/Education.tsx
'use client';

import { Accordion, Box, Container, HStack, Text, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useColorModeValue } from '@/components/ui/color-mode';
import SectionHeader from '@/components/section/SectionHeader';
import { PiGraduationCapBold } from 'react-icons/pi';
import { FiCalendar, FiHome } from 'react-icons/fi';
import styles from './Education.module.css';

export default function Education() {
  const t = useTranslations('education');

  const cardBg = useColorModeValue('gray.50', 'rgba(255, 255, 255, 0.04)');
  const triggerTitleColor = useColorModeValue('blackAlpha.900', 'whiteAlpha.900');
  const triggerMetaColor = useColorModeValue('blackAlpha.600', 'gray.500');
  const yearBadgeColor = useColorModeValue('blackAlpha.700', 'gray.200');
  const contentTextColor = useColorModeValue('blackAlpha.800', 'gray.200');
  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const iconBoxBg = useColorModeValue('blackAlpha.50', 'rgba(255, 255, 255, 0.06)');

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
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
          gradientClassName={styles.headingGradient}
        />

        <Accordion.Root collapsible>
          <VStack gap={3} align="stretch">
            {items.map((e) => (
              <Accordion.Item
                key={e.key}
                value={e.key}
                border="0"
                borderRadius="md"
                overflow="hidden"
                bg={cardBg}
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
                      borderRadius="md"
                      bg={iconBoxBg}
                      border="1px solid"
                      borderColor={borderColor}
                      flexShrink={0}
                      color={triggerTitleColor}
                    >
                      <PiGraduationCapBold />
                    </Box>

                    <Box flex="1" textAlign="left">
                      <Text fontWeight="600" fontSize={{ base: 'md', md: 'lg' }} lineHeight="short" color={triggerTitleColor}>
                        {e.title}
                      </Text>

                      <HStack gap={3} mt={2} flexWrap="wrap">
                        <HStack gap={2} color={triggerMetaColor}>
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
                          bg={iconBoxBg}
                          border="1px solid"
                          borderColor={borderColor}
                          color={yearBadgeColor}
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
                  borderColor={borderColor}
                >
                  <Text color={contentTextColor} opacity={0.9}>
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
