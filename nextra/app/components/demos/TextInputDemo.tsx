"use client";

import { useState, useEffect } from "react";
import { Text, Box } from "ink";
import TextInput from "ink-text-input";
import { TerminalFrame, type DemoProps } from "./TerminalFrame";

export default function TextInputDemo({ auto = false }: DemoProps) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  useEffect(() => {
    if (!auto) return;
    const text = "Hello World! ";
    let i = 0;
    let timeout: NodeJS.Timeout;
    const type = () => {
      setValue(text.slice(0, i + 1));
      i = (i + 1) % (text.length + 1);
      timeout = setTimeout(type, i === 0 ? 1000 : 150);
    };
    type();
    return () => clearTimeout(timeout);
  }, [auto]);

  return (
    <Box
      flexDirection="column"
      padding={1}
      borderStyle="round"
      borderColor="cyan"
      width="100%"
      height="100%"
    >
      <Box justifyContent="space-between">
        <Text bold color="cyan">
          ink-text-input
        </Text>
      </Box>

      <Box marginTop={1}>
        <Text>Enter query: </Text>
        <TextInput
          focus={true}
          value={value}
          showCursor={!auto}
          onChange={setValue}
          onSubmit={setSubmitted}
        />
      </Box>
      <Box marginTop={1}>
        <Text dimColor>
          {submitted ? `Submitted: ${submitted}` : "Press Enter to submit"}
        </Text>
      </Box>
    </Box>
  );
}
