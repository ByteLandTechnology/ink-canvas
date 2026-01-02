"use client";

import { useRef, useEffect } from "react";
import { Text, Box, useInput } from "ink";
import { ScrollView, ScrollViewRef } from "ink-scroll-view";
import { type DemoProps } from "./TerminalFrame";

const items = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

export default function ScrollViewDemo({ auto = false }: DemoProps) {
  const scrollRef = useRef<ScrollViewRef>(null);

  useEffect(() => {
    if (!auto) return;
    const interval = setInterval(() => {
      scrollRef.current?.scrollBy(1);
    }, 200);
    return () => clearInterval(interval);
  }, [auto]);

  useInput((_input, key) => {
    if (key.upArrow) {
      scrollRef.current?.scrollBy(-1);
    }
    if (key.downArrow) {
      scrollRef.current?.scrollBy(1);
    }
  });

  return (
    <Box
      width="100%"
      height="100%"
      borderStyle="round"
      borderColor="white"
      padding={1}
      flexDirection="column"
    >
      <Text bold>ink-scroll-view</Text>
      <Text dimColor>Use ↑↓ arrows to scroll</Text>
      <Box flexGrow={1} width="100%" marginTop={1} borderStyle="single">
        <ScrollView ref={scrollRef}>
          {items.map((item, i) => (
            <Text key={i}>{item}</Text>
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
}
