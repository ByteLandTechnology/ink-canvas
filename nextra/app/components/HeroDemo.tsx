"use client";

/**
 * @file HeroDemo.tsx
 * @description Auto-playing demonstration component for the homepage
 */

import "ink-canvas/shims/process";
import { useState, useEffect } from "react";

import TextInputDemo from "./demos/TextInputDemo";
import SpinnerDemo from "./demos/SpinnerDemo";

import GradientDemo from "./demos/GradientDemo";
import ScrollViewDemo from "./demos/ScrollViewDemo";
import ScrollListDemo from "./demos/ScrollListDemo";
import MultilineInputDemo from "./demos/MultilineInputDemo";

import { InkCanvas } from "ink-canvas";
import chalk from "chalk";

chalk.level = 3;

// ===================================
// Theme Colors (ByteLand Brand)
// ===================================
const THEME = {
  blue: "#007aff",
  green: "#34c759",
  red: "#ff3b30",
  yellow: "#ffd60a",
  purple: "#bf5af2",
  cyan: "#5ac8fa",
  dark: "#0a0a0f",
  surface: "#12121a",
  surfaceLight: "#1a1a25",
  border: "#2a2a3a",
  text: "#e0e0e8",
  textMuted: "#8888a0",
};

// ===================================
// Scene Configuration
// ===================================
const SCENES = [
  {
    id: "text",
    label: "ink-text-input",
    description: "Input fields with typing simulation",
    duration: 8000,
    component: TextInputDemo,
    color: THEME.cyan,
    url: "https://github.com/vadimdemedes/ink-text-input",
  },
  {
    id: "spinner",
    label: "ink-spinner",
    description: "Loading animations",
    duration: 5000,
    component: SpinnerDemo,
    color: THEME.purple,
    url: "https://github.com/vadimdemedes/ink-spinner",
  },

  {
    id: "gradient",
    label: "ink-gradient",
    description: "Beautiful gradient text effects",
    duration: 5000,
    component: GradientDemo,
    color: THEME.green,
    url: "https://github.com/vadimdemedes/ink-gradient",
  },
  {
    id: "scroll",
    label: "ink-scroll-view",
    description: "Scrollable content container",
    duration: 8000,
    component: ScrollViewDemo,
    color: THEME.red,
    url: "https://ink-scroll-view.byteland.app",
  },
  {
    id: "scroll-list",
    label: "ink-scroll-list",
    description: "Scrollable list with selection",
    duration: 8000,
    component: ScrollListDemo,
    color: THEME.blue,
    url: "https://ink-scroll-list.byteland.app",
  },
  {
    id: "multiline",
    label: "ink-multiline-input",
    description: "Multi-line text input field",
    duration: 8000,
    component: MultilineInputDemo,
    color: THEME.yellow,
    url: "https://github.com/ByteLandTechnology/ink-multiline-input",
  },
];

// ===================================
// Main HeroDemo Component
// ===================================
export default function HeroDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-cycle and progress effect
  useEffect(() => {
    const duration = SCENES[activeTab].duration;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= duration) {
        setActiveTab((prev) => (prev + 1) % SCENES.length);
        setProgress(0);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [activeTab]);

  if (!mounted) {
    return (
      <div className="h-[360px] w-full rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 animate-pulse flex items-center justify-center">
        <div className="text-slate-600 text-sm">Loading demo...</div>
      </div>
    );
  }

  const ActiveComponent = SCENES[activeTab].component;
  const activeScene = SCENES[activeTab];

  return (
    <>
      <div className="w-full flex flex-col rounded-xl overflow-hidden font-mono text-sm shadow-xl border border-gray-200 dark:border-[#2a2a3a] bg-white dark:bg-[#12121a]">
        {/* ========== Header ========== */}
        <div className="h-10 flex items-center px-4 select-none bg-gray-50 dark:bg-[#1a1a25] border-b border-gray-200 dark:border-[#2a2a3a]">
          {/* Traffic Lights */}
          <div className="flex items-center gap-1.5 mr-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>

          {/* Title: Current Demo Name with Gradient */}
          <div className="flex-1 text-center">
            <a
              href={activeScene.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span className="font-bold text-sm tracking-wide text-gradient-tri">
                {activeScene.label}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400/80 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>

          {/* Step Indicator */}
          <div className="text-[10px] text-gray-500 dark:text-gray-400">
            {activeTab + 1}/{SCENES.length}
          </div>
        </div>

        {/* ========== Progress Bar ========== */}
        <div className="h-[2px] relative bg-gray-200 dark:bg-[#2a2a3a]">
          <div
            className="h-full transition-all duration-100 ease-linear"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${THEME.blue}, ${THEME.green}, ${THEME.red})`,
            }}
          />
        </div>

        {/* ========== Main Content ========== */}
        <div
          className="flex-1 relative overflow-hidden p-6 flex items-center justify-center"
          style={{ background: THEME.dark, minHeight: "360px" }}
        >
          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(${THEME.textMuted} 1px, transparent 1px), linear-gradient(90deg, ${THEME.textMuted} 1px, transparent 1px)`,
              backgroundSize: "16px 16px",
            }}
          />

          <div className="w-full h-full max-w-lg">
            <InkCanvas
              className="w-full h-full"
              terminalOptions={{
                theme: { background: THEME.dark },
                fontSize: 14,
                cursorBlink: true,
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              <ActiveComponent auto={true} />
            </InkCanvas>
          </div>
        </div>

        {/* ========== Footer Status Bar ========== */}
        <div
          className="h-6 flex items-center px-3 text-[10px] select-none"
          style={{
            background: `linear-gradient(90deg, ${THEME.blue}dd, ${THEME.green}cc, ${THEME.red}bb)`,
          }}
        >
          {/* Left: Description */}
          <div className="flex-1 flex items-center gap-2 text-white">
            <span className="font-bold uppercase tracking-wider">INFO</span>
            <span className="opacity-30">│</span>
            <span className="opacity-90">{activeScene.description}</span>
          </div>
        </div>
      </div>
    </>
  );
}
