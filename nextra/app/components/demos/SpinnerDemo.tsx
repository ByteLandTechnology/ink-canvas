"use client";

import React from "react";
import { Text, Box } from "ink";
import Spinner from "ink-spinner";
import { TerminalFrame, type DemoProps } from "./TerminalFrame";

export default function SpinnerDemo({ auto = false }: DemoProps) {
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
        ink-spinner
      </Text>
      <Box marginTop={1} flexDirection="column" gap={1}>
        <Text>
          <Text color="green">
            <Spinner type="dots" />
          </Text>{" "}
          Loading dependencies...
        </Text>
        <Text>
          <Text color="blue">
            <Spinner type="line" />
          </Text>{" "}
          Compiling assets...
        </Text>
        <Text>
          <Text color="yellow">
            <Spinner type="pong" />
          </Text>{" "}
          Running tests...
        </Text>
        <Text>
          <Text color="red">
            <Spinner type="shark" />
          </Text>{" "}
          Deploying to production...
        </Text>
      </Box>
    </Box>
  );
}
