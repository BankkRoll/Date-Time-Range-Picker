import type React from "react";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import { CalendarRange, Github } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Date Time Range Picker",
  description:
    "A collection of date and time picker components for selecting dates, times, and ranges.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarRange className="h-6 w-6" />
                <span className="font-bold">Date Time Range Picker</span>
                <Badge variant="outline" className="ml-2">
                  v1.0.0
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/registry">Explore Registry</Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://github.com/BankkRoll/Date-Time-Range-Picker"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <ModeToggle />
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built with{" "}
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  shadcn/ui
                </a>
                . The source code is available on{" "}
                <a
                  href="https://github.com/BankkRoll/Date-Time-Range-Picker"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
