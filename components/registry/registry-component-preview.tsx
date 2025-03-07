"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

import { fetchRegistryItem } from "@/components/registry/registry-client";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RegistryComponentPreviewProps {
  componentName: string;
  className?: string;
}

export function RegistryComponentPreview({
  componentName,
  className,
}: RegistryComponentPreviewProps) {
  const [componentData, setComponentData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadComponentData() {
      try {
        setIsLoading(true);
        const item = await fetchRegistryItem({ name: componentName });
        if (!item) {
          throw new Error(`Component ${componentName} not found in registry`);
        }
        setComponentData(item);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load component",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadComponentData();
  }, [componentName]);

  if (isLoading) {
    return (
      <Card className={cn("flex items-center justify-center p-8", className)}>
        <Loader2 className="h-6 w-6 animate-spin" />
      </Card>
    );
  }

  if (error || !componentData) {
    return (
      <Card className={cn("p-8", className)}>
        <div className="text-center text-red-500">
          {error || `Failed to load component: ${componentName}`}
        </div>
      </Card>
    );
  }

  // Dynamically create and render the component
  const DynamicComponent = dynamic(
    () => {
      // Use eval to create a component from the registry data
      // Note: Using eval can be dangerous if the source is not trusted
      const ComponentFunction = new Function(
        "React",
        `return ${componentData.files[0].content}`,
      );
      return Promise.resolve(ComponentFunction(React));
    },
    {
      loading: () => (
        <div className="flex h-32 w-full items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ),
      ssr: false,
    },
  );

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <DynamicComponent />
      </CardContent>
    </Card>
  );
}
