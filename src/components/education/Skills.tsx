// src/app/components/Skills.tsx
'use client';

import {
  Box,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import SectionHeader from '@/components/section/SectionHeader';
import { useTranslations } from 'next-intl';
import { useColorModeValue } from '@/components/ui/color-mode';
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

  const cardBg = useColorModeValue('gray.50', 'rgba(255, 255, 255, 0.04)');
  const headingColor = useColorModeValue('blackAlpha.900', 'whiteAlpha.900');
  const subtitleColor = useColorModeValue('blackAlpha.600', 'gray.500');
  const chipColor = useColorModeValue('blackAlpha.800', 'gray.200');
  const iconColor = useColorModeValue('blackAlpha.800', 'white');

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
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
          gradientClassName={styles.headingGradient}
        />

        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={4}>
          {columns.map((col) => (
            <Box
              key={col.key}
              borderRadius="md"
              overflow="hidden"
              bg={cardBg}
              boxShadow="sm"
              className={styles.cardHover}
              h="full"
            >
              <Box px={{ base: 4, md: 5 }} py={{ base: 4, md: 5 }}>
                <HStack gap={3} mb={3} align="center">
                  <Box aria-hidden="true" className={styles.iconBubbleLg} flexShrink={0} color={iconColor}>
                    {col.icon}
                  </Box>

                  <Heading as="h3" size="md" color={headingColor}>
                    {col.title}
                  </Heading>
                </HStack>

                {col.note ? (
                  <Text color={subtitleColor} fontSize="sm" mb={4}>
                    {col.note}
                  </Text>
                ) : null}

                <Wrap gap={2}>
                  {col.tags.map((tag) => (
                    <WrapItem key={`${col.key}-${tag}`}>
                      <Box className={styles.chipLg} color={chipColor} title={tag}>
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
