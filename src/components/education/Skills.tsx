// src/app/components/Skills.tsx
'use client';

import {
  Box,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import {
  FiTool,
  FiDatabase,
  FiCloud,
  FiGlobe,
  FiServer,
  FiShield,
  FiFeather,
  FiCode,
  FiGitBranch,
  FiBox,
} from 'react-icons/fi';
import { SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiBootstrap, SiVite, SiDjango, SiPhp, SiMysql, SiPostgresql, SiNginx, SiVercel, SiHtml5 } from 'react-icons/si';
import styles from './Skills.module.css';

type SkillColumn = {
  key: string;
  title: string;
  note?: string;
  icon: React.ReactNode;
  tags: string[];
};

const TAG_ICON: Record<string, React.ReactNode> = {
  React: <SiReact />,
  'Next.js': <SiNextdotjs />,
  TypeScript: <SiTypescript />,
  JavaScript: <SiJavascript />,
  'HTML/CSS': <SiHtml5 />,
  'Tailwind CSS': <SiTailwindcss />,
  Bootstrap: <SiBootstrap />,
  SSR: <FiServer />,
  i18n: <FiGlobe />,
  Vite: <SiVite />,

  Django: <SiDjango />,
  Wagtail: <FiFeather />,
  PHP: <SiPhp />,
  MySQL: <SiMysql />,
  PostgreSQL: <SiPostgresql />,
  'REST APIs': <FiCode />,
  'OAuth2 (Allauth)': <FiShield />,

  'Git/GitHub': <FiGitBranch />,
  Docker: <FiBox />,
  Vercel: <SiVercel />,
  Nginx: <SiNginx />,
};

export default function Skills() {
  const t = useTranslations('skills');

  const columns: SkillColumn[] = [
    {
      key: 'frontend',
      title: t('columns.frontend.title'),
      note: t('columns.frontend.note'),
      icon: <FiTool />,
      tags: [
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'HTML/CSS',
        'Tailwind CSS',
        'Bootstrap',
        'SSR',
        'i18n',
        'Vite',
      ],
    },
    {
      key: 'backend',
      title: t('columns.backend.title'),
      note: t('columns.backend.note'),
      icon: <FiDatabase />,
      tags: ['Django', 'Wagtail', 'PHP', 'MySQL', 'PostgreSQL', 'REST APIs', 'OAuth2 (Allauth)'],
    },
    {
      key: 'other',
      title: t('columns.other.title'),
      note: t('columns.other.note'),
      icon: <FiCloud />,
      tags: ['Git/GitHub', 'Docker', 'Vercel', 'Nginx'],
    },
  ];

  return (
    <Box as="section" id="skills" py={{ base: 12, md: 16 }}>
      <Container maxW="6xl">
        <VStack gap={2} textAlign="center" mb={{ base: 8, md: 10 }}>
          <Heading as="h2" size={{ base: 'lg', md: 'xl' }} className={styles.headingGradient}>
            {t('title')}
          </Heading>

          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.500" maxW="3xl">
            {t('subtitle')}
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={4}>
          {columns.map((col) => (
            <Box
              key={col.key}
              borderRadius="xl"
              overflow="hidden"
              bg="rgba(255, 255, 255, 0.04)"
              boxShadow="sm"
              className={styles.cardHover}
              h="full"
            >
              <Box px={{ base: 4, md: 5 }} py={{ base: 4, md: 5 }}>
                <HStack gap={3} mb={3} align="center">
                  <Box aria-hidden="true" className={styles.iconBubbleLg} flexShrink={0}>
                    {col.icon}
                  </Box>

                  <Heading as="h3" size="md">
                    {col.title}
                  </Heading>
                </HStack>

                {col.note ? (
                  <Text color="gray.500" fontSize="sm" mb={4}>
                    {col.note}
                  </Text>
                ) : null}

                <Wrap gap={2}>
                  {col.tags.map((tag) => (
                    <WrapItem key={`${col.key}-${tag}`}>
                      <Box className={styles.chipLg} color="gray.200" title={tag}>
                        {TAG_ICON[tag] ? <Box aria-hidden="true">{TAG_ICON[tag]}</Box> : null}
                        <Text fontSize="sm">{tag}</Text>
                      </Box>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
