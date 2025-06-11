"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import * as React from "react";

interface CodeBlockContentProps {
  children: React.ReactNode;
  isOpened: boolean;
  className?: string;
}

export function CodeBlockContent({
  children,
  isOpened,
  className,
}: CodeBlockContentProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border bg-muted/50 backdrop-blur-sm",
        "transition-all duration-200 ease-in-out",
        !isOpened && "max-h-[500px]",
        className,
      )}
    >
      <ScrollArea className="h-full w-full">
        <div className="relative">{children}</div>
      </ScrollArea>
    </div>
  );
}
