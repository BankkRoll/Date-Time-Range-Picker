"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CalendarClockIcon,
  CalendarIcon,
  ChevronRight,
  ClockIcon,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { RegistryCodeViewer } from "./registry-code-viewer";
import { RegistryComponentPreview } from "./registry-component-preview";

interface RegistryExampleProps {
  title: string;
  description?: string;
  componentName: string;
  className?: string;
}

export function RegistryExample({
  title,
  description,
  componentName,
  className,
}: RegistryExampleProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const getComponentIcon = (name: string) => {
    switch (name) {
      case "date-input":
        return <CalendarIcon className="h-5 w-5" />;
      case "time-input":
        return <ClockIcon className="h-5 w-5" />;
      case "date-time-input":
      case "date-time-range-picker":
        return <CalendarClockIcon className="h-5 w-5" />;
      default:
        return <CalendarIcon className="h-5 w-5" />;
    }
  };

  return (
    <Card
      className={cn(
        "rounded-2xl border bg-background/80 backdrop-blur-lg flex flex-col min-h-[480px]",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="rounded-lg bg-primary/10 p-3 text-primary flex items-center justify-center">
          {getComponentIcon(componentName)}
        </div>
        <div>
          <CardTitle className="text-lg font-semibold leading-tight">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-sm mt-1">
              {description}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center py-8">
        <div className="flex items-center justify-center w-full h-full">
          <RegistryComponentPreview componentName={componentName} />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 bg-muted/30 rounded-b-2xl">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              View Code
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <ScrollArea className="border rounded h-[600px]">
                <RegistryCodeViewer
                  componentName={componentName}
                  expandButtonTitle="Expand Code"
                />
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
