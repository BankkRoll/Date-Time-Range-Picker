import { RegistryExplorer } from "@/components/registry/registry-explorer";

export default function RegistryPage() {
  return (
    <div className="container max-w-7xl py-10 m-auto space-y-4 p-2">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Component Registry
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse and explore all available components in the registry.
        </p>
      </div>

      <RegistryExplorer />
    </div>
  );
}
