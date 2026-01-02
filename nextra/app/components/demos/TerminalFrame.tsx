"use client";

import React, { useState } from "react";
import { InkCanvas } from "ink-canvas";
import chalk from "chalk";

chalk.level = 3;

export interface DemoProps {
  auto?: boolean;
}

export const TerminalFrame = ({ children }: { children: React.ReactNode }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative h-full w-full rounded-lg overflow-hidden border-2 transition-all duration-200 ${
        isFocused
          ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          : "border-gray-800 hover:border-gray-700"
      } bg-[#0d1117] p-4 cursor-text`}
      onClick={() => setIsFocused(true)}
      onBlur={(e) => {
        // Only blur if focus moves outside this container
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
        }
      }}
      tabIndex={0}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-opacity duration-300 ${
          isFocused ? "opacity-100" : "opacity-0"
        }`}
      />

      {isFocused && (
        <div className="absolute top-2 right-2 z-20 px-2 py-0.5 bg-blue-600/90 text-white text-[10px] font-mono rounded pointer-events-none backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
          ● FOCUSED
        </div>
      )}

      <InkCanvas
        focused={isFocused}
        className="h-full w-full"
        terminalOptions={{
          theme: { background: "#0d1117" },
          fontSize: 14,
          cursorBlink: true,
        }}
      >
        {children}
      </InkCanvas>
    </div>
  );
};
