"use client";

import * as React from "react";

import { Collapsible } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { CodeBlockContent } from "./code-block-content";
import { CodeBlockOverlay } from "./code-block-overlay";
import { CodeBlockTrigger } from "./code-block-trigger";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  expandButtonTitle?: string;
}

export function CodeBlock({
  expandButtonTitle = "View Code",
  className,
  children,
  ...props
}: CodeBlockProps) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened}>
      <div className={cn("relative overflow-hidden", className)} {...props}>
        <CodeBlockContent isOpened={isOpened}>{children}</CodeBlockContent>
        <CodeBlockOverlay isOpened={isOpened}>
          <CodeBlockTrigger
            isOpened={isOpened}
            expandButtonTitle={expandButtonTitle}
          />
        </CodeBlockOverlay>
      </div>
    </Collapsible>
  );
}
