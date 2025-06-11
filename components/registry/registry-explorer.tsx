"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CalendarClockIcon, CalendarIcon, ClockIcon } from "lucide-react";
import * as React from "react";
import type { RegistryItem } from "shadcn/registry";
import { fetchRegistryIndex } from "./registry-client";
import { RegistryCodeViewer } from "./registry-code-viewer";
import { RegistryComponentPreview } from "./registry-component-preview";

interface RegistryExplorerProps {
  className?: string;
  defaultComponent?: string;
}

export function RegistryExplorer({
  className,
  defaultComponent,
}: RegistryExplorerProps) {
  const [registry, setRegistry] = React.useState<RegistryItem[]>([]);
  const [selectedComponent, setSelectedComponent] = React.useState<
    string | undefined
  >(defaultComponent);

  React.useEffect(() => {
    async function loadRegistry() {
      const items = await fetchRegistryIndex();
      if (items) {
        setRegistry(items);
        if (!selectedComponent && items.length > 0) {
          setSelectedComponent(items[0].name);
        }
      }
    }

    loadRegistry();
  }, [selectedComponent]);

  const getComponentIcon = (name: string) => {
    switch (name) {
      case "date-input":
        return <CalendarIcon className="h-4 w-4" />;
      case "time-input":
        return <ClockIcon className="h-4 w-4" />;
      case "date-time-input":
      case "date-time-range-picker":
        return <CalendarClockIcon className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className={cn("flex h-full gap-4", className)}>
      {/* Sidebar for md+ */}
      <div className="hidden md:block w-64 border-r pr-4">
        <ScrollArea className="h-full">
          <div className="space-y-1">
            {registry.map((item) => (
              <button
                key={item.name}
                onClick={() => setSelectedComponent(item.name)}
                className={cn(
                  "w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  selectedComponent === item.name
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted",
                )}
              >
                <div className="rounded-md bg-primary/10 p-1">
                  {getComponentIcon(item.name)}
                </div>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {selectedComponent && (
          <div className="space-y-4">
            {/* Mobile Select */}
            <div className="block md:hidden mb-4">
              <Select
                value={selectedComponent}
                onValueChange={setSelectedComponent}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select component" />
                </SelectTrigger>
                <SelectContent>
                  {registry.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      <span className="inline-flex items-center gap-2">
                        {getComponentIcon(item.name)}
                        {item.title}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-4">
                  <Card className="h-[600px] flex items-center justify-center p-8">
                    <RegistryComponentPreview
                      componentName={selectedComponent}
                    />
                  </Card>
                </TabsContent>
                <TabsContent value="code" className="mt-4">
                  <Card className="relative">
                    <ScrollArea className="h-[600px]">
                      <RegistryCodeViewer
                        componentName={selectedComponent}
                        expandButtonTitle="Expand Code"
                      />
                    </ScrollArea>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
