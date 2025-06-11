"use client";

import { cn } from "@/lib/utils";
import type * as React from "react";

interface CodeBlockOverlayProps {
  isOpened: boolean;
  children: React.ReactNode;
}

export function CodeBlockOverlay({
  isOpened,
  children,
}: CodeBlockOverlayProps) {
  return (
    <div
      className={cn(
        "absolute flex items-center justify-center bg-gradient-to-b from-background/10 to-background to-90% p-2",
        isOpened ? "inset-x-0 bottom-0 h-12 from-gray-900/30" : "inset-0",
      )}
    >
      {children}
    </div>
  );
}
