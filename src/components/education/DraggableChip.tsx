"use client";

import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import * as motion from "motion/react-client";

export default function DraggableChip({
  label,
  icon,
}: {
  label: string;
  icon?: React.ReactNode;
}) {
  const chipBg = useColorModeValue("blackAlpha.50", "rgba(255,255,255,0.06)");
  const chipBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const chipText = useColorModeValue("gray.800", "whiteAlpha.900");

  const hoverBg = useColorModeValue("blackAlpha.100", "rgba(255,255,255,0.10)");
  const hoverBorder = useColorModeValue("orange.300", "orange.300");

  const dragShadow = useColorModeValue(
    "0 0 0 1px rgba(245,158,11,0.16), 0 14px 32px rgba(0,0,0,0.14)",
    "0 0 0 1px rgba(245,158,11,0.22), 0 16px 38px rgba(0,0,0,0.40)"
  );

  return (
    <motion.div
      drag
      dragElastic={0.18}
      dragMomentum={false}
      whileDrag={{ cursor: "grabbing", zIndex: 50, scale: 1.03 }}
      style={{ display: "inline-block" }}
    >
      <HStack
        px="0.85rem"
        py="0.55rem"
        borderRadius="999px"
        gap={2}
        cursor="grab"
        userSelect="none"
        bg={chipBg}
        border="1px solid"
        borderColor={chipBorder}
        color={chipText}
        transition="transform 120ms ease, background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease"
        _hover={{ transform: "translateY(-1px)", bg: hoverBg, borderColor: hoverBorder }}
        boxShadow={dragShadow}
      >
        {icon ? (
          <Box aria-hidden="true" userSelect="none" display="grid" placeItems="center">
            {icon}
          </Box>
        ) : null}

        <Text fontSize="sm" fontWeight="600" letterSpacing="0.2px" lineHeight="1" userSelect="none">
          {label}
        </Text>
      </HStack>
    </motion.div>
  );
}
