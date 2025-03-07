"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Info, Layers, Search, Settings } from "lucide-react";

import { fetchRegistryIndex } from "@/components/registry/registry-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { RegistryCodeViewer } from "./registry-code-viewer";
import { RegistryComponentPreview } from "./registry-component-preview";
import { RegistryComponentProps } from "./registry-component-props";

interface RegistryExplorerProps {
  className?: string;
  defaultCategory?: string;
  defaultComponent?: string;
}

export function RegistryExplorer({
  className,
  defaultCategory = "all",
  defaultComponent,
}: RegistryExplorerProps) {
  const [components, setComponents] = React.useState<Array<any>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedComponent, setSelectedComponent] = React.useState<
    string | null
  >(defaultComponent || null);
  const [activeCategory, setActiveCategory] = React.useState(defaultCategory);
  const [activeTab, setActiveTab] = React.useState<string>("preview");

  React.useEffect(() => {
    async function loadRegistry() {
      try {
        setIsLoading(true);
        const index = await fetchRegistryIndex();
        if (index) {
          setComponents(index);
          if (!selectedComponent && index.length > 0) {
            setSelectedComponent(index[0].name || null);
          }
        }
      } catch (error) {
        console.error("Failed to load registry:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadRegistry();
  }, [selectedComponent]);

  // Get unique categories
  const categories = React.useMemo(() => {
    const allCategories = components.flatMap(
      (component) => component.categories || [],
    );
    return ["all", ...Array.from(new Set(allCategories))].sort();
  }, [components]);

  // Filter components by search query and category
  const filteredComponents = React.useMemo(() => {
    return components.filter((component) => {
      const matchesSearch =
        component.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === "all" ||
        (component.categories && component.categories.includes(activeCategory));

      return matchesSearch && matchesCategory;
    });
  }, [components, searchQuery, activeCategory]);

  // Group components by type
  const groupedComponents = React.useMemo(() => {
    const groups: Record<string, any[]> = {};

    filteredComponents.forEach((component) => {
      const type = component.type || "registry:component";
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(component);
    });

    return groups;
  }, [filteredComponents]);

  if (isLoading) {
    return <div className="p-4 text-center">Loading registry...</div>;
  }

  return (
    <div className={cn("grid grid-cols-1 gap-6 lg:grid-cols-3", className)}>
      <Card className="lg:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle>Components</CardTitle>
          <CardDescription>
            Browse all available components in the registry
          </CardDescription>
          <div className="mt-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-2">
          <Tabs
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="mb-4"
          >
            <ScrollArea className="w-full whitespace-nowrap pb-2">
              <TabsList className="w-max">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="capitalize"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>
          </Tabs>

          <ScrollArea className="h-[calc(100vh-300px)]">
            {Object.entries(groupedComponents).map(([type, components]) => (
              <div key={type} className="mb-6">
                <h3 className="mb-2 px-4 text-sm font-medium text-muted-foreground">
                  {type.replace("registry:", "").toUpperCase()}
                </h3>
                <div className="space-y-1 px-1">
                  {components.map((component) => (
                    <Button
                      key={component.name}
                      variant={
                        selectedComponent === component.name
                          ? "secondary"
                          : "ghost"
                      }
                      className="w-full justify-start text-left"
                      onClick={() => setSelectedComponent(component.name)}
                    >
                      <div>
                        <div className="font-medium">{component.name}</div>
                        {component.description && (
                          <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {component.description}
                          </div>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            {filteredComponents.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                No components found
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        {selectedComponent ? (
          <>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>{selectedComponent}</CardTitle>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="preview">
                      <Layers className="mr-2 h-4 w-4" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="code">
                      <Code2 className="mr-2 h-4 w-4" />
                      Code
                    </TabsTrigger>
                    <TabsTrigger value="props">
                      <Settings className="mr-2 h-4 w-4" />
                      Props
                    </TabsTrigger>
                    <TabsTrigger value="info">
                      <Info className="mr-2 h-4 w-4" />
                      Info
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardDescription>
                {components.find((c) => c.name === selectedComponent)
                  ?.description || "No description available"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContent value="preview" className="mt-0">
                <RegistryComponentPreview componentName={selectedComponent} />
              </TabsContent>
              <TabsContent value="code" className="mt-0">
                <RegistryCodeViewer componentName={selectedComponent} />
              </TabsContent>
              <TabsContent value="props" className="mt-0">
                <RegistryComponentProps componentName={selectedComponent} />
              </TabsContent>
              <TabsContent value="info" className="mt-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Categories</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {components
                        .find((c) => c.name === selectedComponent)
                        ?.categories?.map((category: string) => (
                          <Button
                            key={category}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => setActiveCategory(category)}
                          >
                            {category}
                          </Button>
                        )) || (
                        <span className="text-muted-foreground">
                          No categories
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Dependencies</h3>
                    <div className="mt-2">
                      {components
                        .find((c) => c.name === selectedComponent)
                        ?.dependencies?.map((dep: string) => (
                          <div key={dep} className="text-sm">
                            {dep}
                          </div>
                        )) || (
                        <span className="text-muted-foreground">
                          No dependencies
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Author</h3>
                    <div className="mt-2 text-sm">
                      {components.find((c) => c.name === selectedComponent)
                        ?.author || "Unknown"}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </>
        ) : (
          <div className="flex h-[500px] items-center justify-center text-muted-foreground">
            Select a component to view details
          </div>
        )}
      </Card>
    </div>
  );
}
