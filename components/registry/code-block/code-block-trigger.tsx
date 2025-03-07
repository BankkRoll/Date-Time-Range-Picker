"use client";
import { Button } from "@/components/ui/button";
import { CollapsibleTrigger } from "@/components/ui/collapsible";

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
      <Button variant="secondary" className="mb-8 h-8 text-xs">
        {isOpened ? "Collapse" : expandButtonTitle}
      </Button>
    </CollapsibleTrigger>
  );
}
