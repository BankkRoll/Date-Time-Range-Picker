"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function InstallationCard() {
  const [copied, setCopied] = useState(false);
  const command =
    "npx shadcn add https://date-time-range-picker.vercel.app/r/date-time-range-picker.json";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-xl rounded-2xl shadow-sm bg-muted/40">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Install in seconds
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 bg-background rounded-lg px-4 py-3 border border-muted-foreground/10">
          <span className="font-mono text-xs text-muted-foreground truncate select-all">
            {command}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={copyToClipboard}
            aria-label="Copy install command"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-3">
          Instantly add all date and time picker components to your project. No
          extra steps required.
        </p>
      </CardContent>
    </Card>
  );
}
