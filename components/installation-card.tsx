"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

const InstallationStep = ({ title, code }: { title: string; code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy</span>
        </Button>
      </div>
      <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
        <code className="text-secondary-foreground">{code}</code>
      </pre>
    </div>
  );
};

export function InstallationCard() {
  return (
    <Card className="w-full md:w-2/3">
      <CardHeader>
        <CardTitle>Installation</CardTitle>
        <CardDescription>
          Install dependencies and import the Date Time Range Picker components.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <InstallationStep
          title="1. Install dependencies"
          code="npm install date-fns@3.6.0 react-day-picker@9.4.3"
        />
        <InstallationStep
          title="2. Import component"
          code={`import { DateTimeRangePicker } from "@/components/date-time-range-picker/date-time-range-picker"`}
        />
        <p className="text-sm text-muted-foreground">
          Note: These specific versions are required to ensure UI compatibility.
        </p>
      </CardContent>
    </Card>
  );
}
