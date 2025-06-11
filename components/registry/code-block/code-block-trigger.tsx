"use client";
import { Button } from "@/components/ui/button";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface CodeBlockTriggerProps {
  isOpened: boolean;
  expandButtonTitle?: string;
}

export function CodeBlockTrigger({
  isOpened,
  expandButtonTitle = "View Code",
}: CodeBlockTriggerProps) {
  return (
    <CollapsibleTrigger asChild>
      <Button
        variant="secondary"
        className={cn(
          "h-8 text-xs transition-all duration-200 ease-in-out",
          "hover:bg-muted/80 hover:text-foreground",
          "focus-visible:ring-1 focus-visible:ring-ring",
          isOpened ? "mb-2" : "mb-8",
        )}
      >
        {isOpened ? "Collapse" : expandButtonTitle}
      </Button>
    </CollapsibleTrigger>
  );
}
