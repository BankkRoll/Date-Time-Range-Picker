"use client";

import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { fetchRegistryItem } from "@/components/registry/registry-client";

interface RegistryComponentPropsProps {
  componentName: string;
}

export function RegistryComponentProps({
  componentName,
}: RegistryComponentPropsProps) {
  const [props, setProps] = React.useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadComponentProps() {
      try {
        setIsLoading(true);
        const item = await fetchRegistryItem({ name: componentName });

        if (!item) {
          throw new Error(`Component ${componentName} not found in registry`);
        }

        setProps(item.props || null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load component props",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadComponentProps();
  }, [componentName]);

  if (isLoading) {
    return <div className="p-4 text-center">Loading component props...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!props || Object.keys(props).length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No props documentation available
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Default</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(props).map(([name, details]) => (
            <TableRow key={name}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell className="font-mono text-xs">
                {(details as any).type || "any"}
              </TableCell>
              <TableCell>
                {(details as any).default !== undefined ? (
                  String((details as any).default)
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {(details as any).description || (
                  <span className="text-muted-foreground">No description</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
