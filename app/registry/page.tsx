import { RegistryExplorer } from "@/components/registry/registry-explorer";

export default function RegistryPage() {
  return (
    <div className="container max-w-7xl py-10 m-auto space-y-4 p-2">
      <h1 className="text-3xl font-bold mb-6">Component Registry</h1>
      <p className="text-muted-foreground mb-8">
        Browse and explore all available components in the registry.
      </p>

      <RegistryExplorer />
    </div>
  );
}
