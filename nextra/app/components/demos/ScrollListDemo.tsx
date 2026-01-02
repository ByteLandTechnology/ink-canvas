"use client";

import { useRef, useState, useEffect } from "react";
import { Text, Box, useInput } from "ink";
import { ScrollList, ScrollListRef } from "ink-scroll-list";
import { type DemoProps } from "./TerminalFrame";

const items = [
  { label: "Apple", description: "A sweet red fruit" },
  { label: "Banana", description: "Yellow and curved" },
  { label: "Grapes", description: "Small and clustered" },
  { label: "Orange", description: "Citrus and tangy" },
  { label: "Strawberry", description: "Red and seedy" },
  { label: "Kiwi", description: "Fuzzy green inside" },
  { label: "Peach", description: "Soft and fuzzy" },
  { label: "Cherry", description: "Small and round" },
  { label: "Mango", description: "Tropical and sweet" },
  { label: "Pineapple", description: "Spiky and tropical" },
];

/**
 * Ink component for ScrollList demo
 * Uses useInput for keyboard navigation
 */
export default function ScrollListDemo({ auto = false }: DemoProps) {
  const listRef = useRef<ScrollListRef>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!auto) return;
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % items.length);
    }, 800);
    return () => clearInterval(interval);
  }, [auto]);

  useInput((_input, key) => {
    if (key.upArrow) {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }
    if (key.downArrow) {
      setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
    }
  });

  return (
    <Box
      flexDirection="column"
      padding={1}
      borderStyle="round"
      borderColor="magenta"
      width="100%"
      height="100%"
    >
      <Text bold color="magenta">
        ink-scroll-list
      </Text>
      <Text dimColor>Use ↑↓ arrows to navigate</Text>
      <Box marginTop={1} flexDirection="row" height="100%">
        <Box
          flexDirection="column"
          borderStyle="single"
          borderColor="gray"
          width={24}
          height="100%"
        >
          <ScrollList ref={listRef} selectedIndex={selectedIndex}>
            {items.map((item, i) => (
              <Box key={i}>
                <Text
                  color={i === selectedIndex ? "green" : "white"}
                  bold={i === selectedIndex}
                >
                  {i === selectedIndex ? "› " : "  "}
                  {item.label}
                </Text>
              </Box>
            ))}
          </ScrollList>
        </Box>
        <Box flexDirection="column" paddingLeft={2} flexGrow={1}>
          <Text color="cyan" bold>
            {items[selectedIndex]?.label}
          </Text>
          <Text dimColor>{items[selectedIndex]?.description}</Text>
          <Box marginTop={1}>
            <Text dimColor italic>
              Item {selectedIndex + 1} of {items.length}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
