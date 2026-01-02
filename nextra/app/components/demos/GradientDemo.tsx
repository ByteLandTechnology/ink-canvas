"use client";

import { Text, Box } from "ink";
import Gradient from "ink-gradient";
import { type DemoProps } from "./TerminalFrame";

export default function GradientDemo(_props: DemoProps) {
  return (
    <Box
      flexDirection="column"
      padding={1}
      borderStyle="round"
      borderColor="cyan"
      width="100%"
      height="100%"
    >
      <Box marginBottom={1}>
        <Text bold>ink-gradient</Text>
      </Box>
      <Gradient name="rainbow">
        <Text bold>I am a rainbow text!</Text>
      </Gradient>
      <Gradient name="morning">
        <Text>Good morning! (Gradient: morning)</Text>
      </Gradient>
      <Gradient name="mind">
        <Text>Open your mind (Gradient: mind)</Text>
      </Gradient>
      <Gradient name="retro">
        <Text>Retro vibes (Gradient: retro)</Text>
      </Gradient>
    </Box>
  );
}
