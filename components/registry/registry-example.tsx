"use client";

import * as React from "react";

import {
  Card,
  CardContent,
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
import { ChevronRight } from "lucide-react";
import { RegistryCodeViewer } from "./registry-code-viewer";

interface RegistryExampleProps {
  title: string;
  description?: string;
  componentName: string;
  exampleName: string;
  className?: string;
  children: React.ReactNode;
}

export function RegistryExample({
  title,
  description,
  componentName,
  exampleName,
  className,
  children,
}: RegistryExampleProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="flex justify-center items-center m-0">
        {children}
      </CardContent>
      <CardFooter className="border-t pt-4">
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
              <RegistryCodeViewer
                componentName={componentName}
                filePath={`r/${exampleName}.tsx`}
                expandButtonTitle="Expand Code"
              />
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
