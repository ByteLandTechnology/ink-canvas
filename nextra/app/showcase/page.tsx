import { Metadata } from "next";
import Link from "next/link";
import "ink-canvas/shims/process";
import TextInputDemo from "@/app/components/demos/TextInputDemo";
import SpinnerDemo from "@/app/components/demos/SpinnerDemo";
import GradientDemo from "@/app/components/demos/GradientDemo";
import ScrollViewDemo from "@/app/components/demos/ScrollViewDemo";
import ScrollListDemo from "@/app/components/demos/ScrollListDemo";
import MultilineInputDemo from "@/app/components/demos/MultilineInputDemo";

import { TerminalFrame } from "@/app/components/demos/TerminalFrame";

export const metadata: Metadata = {
  title: "Showcase | ink-canvas",
  description: "Interactive demonstrations of ink-canvas features.",
};

const COMPONENT_URLS: Record<string, string> = {
  "ink-text-input": "https://github.com/vadimdemedes/ink-text-input",
  "ink-spinner": "https://github.com/vadimdemedes/ink-spinner",
  "ink-scroll-list": "https://github.com/jdeniau/ink-scroll-list",
  "ink-multiline-input": "https://github.com/s_montagu/ink-multiline-input",
  "ink-gradient": "https://github.com/vadimdemedes/ink-gradient",
  "ink-scroll-view": "https://ink-scroll-view.byteland.app",
};

const DemoSection = ({
  title,
  description,
  component: Component,
}: {
  title: string;
  description: string;
  component: React.ComponentType<any>;
}) => {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-2 mb-4">
        <a
          href={COMPONENT_URLS[title] || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <h2 className="text-xl font-bold font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-500 to-red-500 group-hover:opacity-80 transition-opacity">
            {title}
          </h2>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400 group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
        <span className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-800 ml-4"></span>
      </div>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>

      {/* Resizable Container */}
      <div className="relative group">
        {/* Resize Hint */}
        <div
          className="resize overflow-hidden min-h-[200px] min-w-[300px] w-full rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm relative"
          style={{ height: "320px" }}
        >
          <TerminalFrame>
            <Component />
          </TerminalFrame>

          {/* Resize Hint */}
          <div className="absolute bottom-1 right-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white text-[10px] px-2 py-1 rounded pointer-events-none backdrop-blur-sm">
            Drag corner to resize
          </div>
        </div>

        <p className="mt-2 text-xs text-center text-gray-400 dark:text-gray-600">
          Click inside to focus • Resize via bottom-right corner
        </p>
      </div>
    </section>
  );
};

export default function ShowcasePage() {
  return (
    <div className="min-h-screen py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-tri">Component Showcase</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Explore the ecosystem of{" "}
            <span className="text-blue-500 font-medium">Ink</span> components
            running natively in your browser. Each demo is fully interactive and
            resizable.
          </p>
        </div>

        <DemoSection
          title="ink-text-input"
          description="A robust text input component. Supports cursor navigation, deletion, and submission. Try typing a command!"
          component={TextInputDemo}
        />

        <DemoSection
          title="ink-spinner"
          description="Animated spinners for indicating loading states. Supports multiple styles and colors."
          component={SpinnerDemo}
        />

        <DemoSection
          title="ink-scroll-list"
          description="A high-level scrollable list with automatic selection management. Keeps the selected item visible with configurable alignment."
          component={ScrollListDemo}
        />

        <DemoSection
          title="ink-multiline-input"
          description="A multiline text editor component. Supports cursor navigation, multiple lines, and customizable key bindings."
          component={MultilineInputDemo}
        />

        <DemoSection
          title="ink-gradient"
          description="Apply beautiful gradients to your text. Works with Node.js and the browser."
          component={GradientDemo}
        />

        <DemoSection
          title="ink-scroll-view"
          description="A flexible scrollable container. Handles content overflow and provides a smooth scrolling experience."
          component={ScrollViewDemo}
        />

        {/* CTA */}
        <section className="text-center py-12 border-t border-gray-200 dark:border-gray-800/50 mt-12">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
            Ready to build your own CLI app in the browser?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs"
              className="bg-gradient-tri px-8 py-3 rounded-full text-sm font-bold text-white transition-transform hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              Get Started with ink-canvas
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
