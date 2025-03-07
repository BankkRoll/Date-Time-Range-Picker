"use client";

import * as React from "react";

import { Check, Copy, Download } from "lucide-react";

import { CodeBlock } from "@/components/registry/code-block";
import { fetchRegistryItem } from "@/components/registry/registry-client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface RegistryCodeViewerProps {
  componentName: string;
  filePath?: string;
  expandButtonTitle?: string;
  showCopyButton?: boolean;
  showDownloadButton?: boolean;
  className?: string;
}

export function RegistryCodeViewer({
  componentName,
  filePath,
  expandButtonTitle = "View Code",
  showCopyButton = true,
  showDownloadButton = true,
  className,
}: RegistryCodeViewerProps) {
  const [code, setCode] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
  const [files, setFiles] = React.useState<
    Array<{ path: string; content?: string }>
  >([]);

  React.useEffect(() => {
    async function loadComponentCode() {
      try {
        setIsLoading(true);
        const item = await fetchRegistryItem({ name: componentName });

        if (!item || !item.files || item.files.length === 0) {
          throw new Error(`Component ${componentName} not found in registry`);
        }

        setFiles(item.files);

        // If filePath is provided, use that specific file
        if (filePath) {
          const file = item.files.find((f) => f.path === filePath);
          if (file && file.content) {
            setCode(file.content);
            setSelectedFile(file.path);
          } else {
            throw new Error(
              `File ${filePath} not found for component ${componentName}`,
            );
          }
        } else {
          // Otherwise get the main component file
          const mainFile =
            item.files.find((file) => file.type === "registry:example") ||
            item.files[0];
          if (mainFile && mainFile.content) {
            setCode(mainFile.content);
            setSelectedFile(mainFile.path);
          } else {
            throw new Error(
              `No content available for component ${componentName}`,
            );
          }
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load component code",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadComponentCode();
  }, [componentName, filePath]);

  const handleCopy = React.useCallback(() => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  const handleDownload = React.useCallback(() => {
    if (code && selectedFile) {
      const fileName = selectedFile.split("/").pop() || `${componentName}.tsx`;
      const blob = new Blob([code], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [code, componentName, selectedFile]);

  const getLanguage = (filePath: string): string => {
    const extension = filePath.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "ts":
      case "tsx":
        return "tsx";
      case "js":
      case "jsx":
        return "jsx";
      case "css":
        return "css";
      case "json":
        return "json";
      default:
        return "typescript";
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading component code...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className={cn("relative", className)}>
      {files.length > 1 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {files.map((file) => (
            <Button
              key={file.path}
              variant={selectedFile === file.path ? "default" : "outline"}
              size="sm"
              onClick={() => {
                if (file.content) {
                  setCode(file.content);
                  setSelectedFile(file.path);
                }
              }}
              className="text-xs"
            >
              {file.path.split("/").pop()}
            </Button>
          ))}
        </div>
      )}

      {selectedFile && (
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{selectedFile}</span>
          <div className="flex gap-2">
            {showCopyButton && (
              <Button
                size="icon"
                variant="ghost"
                onClick={handleCopy}
                className="h-8 w-8"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            )}
            {showDownloadButton && (
              <Button
                size="icon"
                variant="ghost"
                onClick={handleDownload}
                className="h-8 w-8"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      <CodeBlock expandButtonTitle={expandButtonTitle}>
        <SyntaxHighlighter
          language={selectedFile ? getLanguage(selectedFile) : "tsx"}
          style={vscDarkPlus}
          customStyle={{ background: "transparent" }}
          showLineNumbers
        >
          {code || "// No content available"}
        </SyntaxHighlighter>
      </CodeBlock>
    </div>
  );
}
