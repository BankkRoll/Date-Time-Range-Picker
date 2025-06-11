"use client";

import { CodeBlock } from "@/components/registry/code-block";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Code, Copy, Download } from "lucide-react";
import * as React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { fetchRegistryItem } from "./registry-client";

interface RegistryCodeViewerProps {
  componentName: string;
  filePath?: string;
  expandButtonTitle?: string;
  className?: string;
}

export function RegistryCodeViewer({
  componentName,
  filePath,
  expandButtonTitle = "View Code",
  className,
}: RegistryCodeViewerProps) {
  const [code, setCode] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
  const [files, setFiles] = React.useState<
    Array<{ path: string; content?: string; type: string }>
  >([]);
  const [copiedCommand, setCopiedCommand] = React.useState(false);
  const command = `npx shadcn add https://date-time-range-picker.vercel.app/r/${componentName}.json`;

  React.useEffect(() => {
    async function loadComponentCode() {
      try {
        setIsLoading(true);
        const item = await fetchRegistryItem({ name: componentName });

        if (!item || !item.files || item.files.length === 0) {
          throw new Error(`Component ${componentName} not found in registry`);
        }

        setFiles(item.files);

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
          const mainFile = item.files[0];
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

  const handleCopyCommand = React.useCallback(() => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  }, [command]);

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
    return (
      <div className="flex h-[500px] items-center justify-center">
        <div className="text-sm text-muted-foreground">
          Loading component code...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <div className="text-sm text-destructive">{error}</div>
      </div>
    );
  }

  return (
    <div className={cn("p-2 relative", className)}>
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
              className={cn(
                "text-xs transition-all duration-200",
                "hover:bg-muted/80 hover:text-foreground",
                "focus-visible:ring-1 focus-visible:ring-ring",
              )}
            >
              {file.path.split("/").pop()}
            </Button>
          ))}
        </div>
      )}

      {selectedFile && (
        <div className="mb-4 flex items-center justify-between gap-2 flex-wrap">
          <button
            type="button"
            aria-label="Copy install command"
            onClick={handleCopyCommand}
            className={cn(
              "relative flex items-center rounded-full border px-2 py-1 font-mono text-xs text-muted-foreground max-w-56 sm:max-w-96 overflow-hidden cursor-pointer transition-colors",
            )}
            tabIndex={0}
          >
            {copiedCommand ? (
              <Check className="h-4 w-4 mr-2 flex-shrink-0" />
            ) : (
              <Code className="h-4 w-4 mr-2 flex-shrink-0" />
            )}
            <span className="truncate">{command}</span>
            <span className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-muted to-transparent" />
          </button>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              aria-label="Open in v0"
              className={cn(
                "h-7 gap-1 rounded-lg shadow-none bg-black px-3 text-xs text-white",
                "hover:bg-black/90 hover:text-white dark:bg-white dark:text-black",
                "dark:hover:bg-white/90 dark:hover:text-black",
                "transition-all duration-200",
              )}
              asChild
            >
              <a
                href={`https://v0.dev/chat/api/open?url=${process.env.NEXT_PUBLIC_BASE_URL}/r/${componentName}.json`}
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  viewBox="0 0 40 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-current"
                >
                  <path
                    d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
                    fill="currentColor"
                  />
                  <path
                    d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={handleCopy}
              className={cn(
                "h-7 w-7 border-muted-foreground/20 bg-background/50 backdrop-blur-sm",
                "hover:bg-muted/80 hover:text-foreground",
                "focus-visible:ring-1 focus-visible:ring-ring",
                "transition-all duration-200",
              )}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={handleDownload}
              className={cn(
                "h-7 w-7 border-muted-foreground/20 bg-background/50 backdrop-blur-sm",
                "hover:bg-muted/80 hover:text-foreground",
                "focus-visible:ring-1 focus-visible:ring-ring",
                "transition-all duration-200",
              )}
            >
              <Download className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}

      <CodeBlock
        expandButtonTitle={expandButtonTitle}
        componentName={componentName}
      >
        <SyntaxHighlighter
          language={selectedFile ? getLanguage(selectedFile) : "tsx"}
          style={vscDarkPlus}
          customStyle={{
            background: "transparent",
            margin: 0,
            padding: "1rem",
          }}
          showLineNumbers
        >
          {code || "// No content available"}
        </SyntaxHighlighter>
      </CodeBlock>
    </div>
  );
}
