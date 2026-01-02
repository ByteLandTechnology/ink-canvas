"use client";

import { useState, useEffect } from "react";
import { Text, Box } from "ink";
import { MultilineInput } from "ink-multiline-input";
import { type DemoProps } from "./TerminalFrame";

export default function MultilineInputDemo({ auto = false }: DemoProps) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  useEffect(() => {
    if (!auto) return;
    const text = "function hello() {\n  return 'world';\n}";
    let i = 0;
    let timeout: NodeJS.Timeout;

    const type = () => {
      setValue(text.slice(0, i + 1));
      i = (i + 1) % (text.length + 1);

      // Simulate submission at the end
      if (i === 0) {
        setSubmitted(text);
        setTimeout(() => setSubmitted(null), 2000);
      }

      timeout = setTimeout(type, i === 0 ? 3000 : 100);
    };

    type();
    return () => clearTimeout(timeout);
  }, [auto]);

  const handleSubmit = (val: string) => {
    setSubmitted(val);
    setTimeout(() => setSubmitted(null), 3000);
  };

  const lineCount = value.split("\n").length;
  const charCount = value.length;

  return (
    <Box
      flexDirection="column"
      padding={1}
      borderStyle="round"
      borderColor="yellow"
      width="100%"
      height="100%"
    >
      <Text bold color="yellow">
        ink-multiline-input
      </Text>
      <Text dimColor>Type below • Ctrl+Enter to submit</Text>
      <Box
        marginTop={1}
        flexDirection="column"
        borderStyle="single"
        borderColor="gray"
        flexShrink={1}
        flexGrow={1}
        width="100%"
        height="100%"
      >
        <MultilineInput
          value={value}
          showCursor={!auto}
          onChange={setValue}
          rows={4}
          placeholder="Start typing here..."
          highlightStyle={{ backgroundColor: "blue" }}
          textStyle={{ color: "white" }}
          onSubmit={handleSubmit}
          keyBindings={{
            submit: (key) => key.ctrl && key.return,
          }}
        />
      </Box>
      <Box marginTop={1} flexDirection="row" justifyContent="space-between">
        <Text dimColor>
          Lines: {lineCount} | Chars: {charCount}
        </Text>
        {submitted && (
          <Text color="green" bold>
            ✓ Submitted!
          </Text>
        )}
      </Box>
    </Box>
  );
}
