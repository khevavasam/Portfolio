"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Box, VisuallyHidden } from "@chakra-ui/react";
import { AnimatePresence, motion } from "motion/react";

const DEFAULT_GRADIENT =
  "linear-gradient(90deg, #ff8c00 0%, #ffa500 25%, #f97316 50%, #ef4444 75%, #ff6347 90%, #fb7185 100%)";

const DEFAULT_TRANSITION = {
  type: "tween",
  ease: [0.22, 1, 0.36, 1],
  duration: 0.5,
};

const RotatingText = forwardRef(function RotatingText(props, ref) {
  const {
    texts = [],
    rotationInterval = 2400,
    auto = true,
    loop = true,
    onNext,
    initial = { y: "115%", opacity: 0 },
    animate = { y: "0%", opacity: 1 },
    exit = { y: "-115%", opacity: 0 },
    transition = DEFAULT_TRANSITION,
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    gradient = false,
    gradientStyle,
    mainClassName,
    elementLevelClassName,
    splitBy,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const currentText = texts[currentTextIndex] ?? "";

  const handleIndexChange = useCallback(
    (newIndex) => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  const next = useCallback(() => {
    if (texts.length <= 1) return;

    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop
          ? 0
          : currentTextIndex
        : currentTextIndex + 1;

    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex);
    }
  }, [currentTextIndex, handleIndexChange, loop, texts.length]);

  const previous = useCallback(() => {
    if (texts.length <= 1) return;

    const previousIndex =
      currentTextIndex === 0
        ? loop
          ? texts.length - 1
          : currentTextIndex
        : currentTextIndex - 1;

    if (previousIndex !== currentTextIndex) {
      handleIndexChange(previousIndex);
    }
  }, [currentTextIndex, handleIndexChange, loop, texts.length]);

  const jumpTo = useCallback(
    (index) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));

      if (validIndex !== currentTextIndex) {
        handleIndexChange(validIndex);
      }
    },
    [currentTextIndex, handleIndexChange, texts.length]
  );

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) {
      handleIndexChange(0);
    }
  }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(
    ref,
    () => ({
      next,
      previous,
      jumpTo,
      reset,
    }),
    [jumpTo, next, previous, reset]
  );

  useEffect(() => {
    if (!auto || texts.length <= 1) return;

    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [auto, next, rotationInterval, texts.length]);

  const resolvedGradientStyle = useMemo(() => {
    if (!gradient) return gradientStyle;

    return {
      backgroundImage: DEFAULT_GRADIENT,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
      ...gradientStyle,
    };
  }, [gradient, gradientStyle]);

  if (!texts.length) return null;

  return (
    <Box
      as="span"
      position="relative"
      display="inline-block"
      overflow="hidden"
      minH="1em"
      lineHeight="1em"
      verticalAlign="baseline"
      userSelect="none"
      cursor="default"
      className={mainClassName}
      {...rest}
    >
      <VisuallyHidden>{currentText}</VisuallyHidden>

      <Box as="span" visibility="hidden" display="inline-block" whiteSpace="pre" lineHeight="inherit">
        {currentText || " "}
      </Box>

      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <Box
          as={motion.span}
          key={`${currentTextIndex}-${currentText}`}
          position="absolute"
          left="0"
          top="0"
          display="inline-block"
          whiteSpace="pre"
          lineHeight="inherit"
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
          className={elementLevelClassName}
          style={resolvedGradientStyle}
        >
          {currentText}
        </Box>
      </AnimatePresence>
    </Box>
  );
});

export default RotatingText;
