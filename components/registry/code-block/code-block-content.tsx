"use client";

import type * as React from "react";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface CodeBlockContentProps {
  isOpened: boolean;
  children: React.ReactNode;
}

export function CodeBlockContent({
  isOpened,
  children,
}: CodeBlockContentProps) {
  return (
    <CollapsibleContent
      forceMount
      className={cn("overflow-hidden", !isOpened && "max-h-72")}
    >
      <div
        className={cn(
          "[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px]",
          !isOpened ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto]",
        )}
      >
        {children}
      </div>
    </CollapsibleContent>
  );
}
