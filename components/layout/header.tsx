"use client";

import {
  CalendarRange,
  Github,
  GridIcon,
  HomeIcon,
  Menu,
  Star,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

function GitHubStarsButton() {
  const [stars, setStars] = React.useState<number | null>(null);

  React.useEffect(() => {
    fetch("https://api.github.com/repos/BankkRoll/Date-Time-Range-Picker")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      });
  }, []);

  return (
    <Button
      asChild
      variant="outline"
      className="flex items-center"
      aria-label="GitHub Repository"
    >
      <a
        href="https://github.com/BankkRoll/Date-Time-Range-Picker"
        target="_blank"
        rel="noreferrer"
        className="flex items-center"
      >
        <Github className="h-4 w-4" />
        <Star className="h-3 w-3" />
        {stars !== null ? (
          stars.toLocaleString()
        ) : (
          <span className="animate-pulse">...</span>
        )}
      </a>
    </Button>
  );
}

export function Header() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="sticky top-0 z-50 w-full flex justify-center px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <CalendarRange className="h-6 w-6" />
            <span className="sm:block hidden font-bold">
              Date Time Range Picker
            </span>
            <span className="block sm:hidden font-bold">DTRP</span>
          </Link>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="default" asChild>
            <Link href="/registry">Explore Registry</Link>
          </Button>
          <GitHubStarsButton />
          <ModeToggle />
        </div>
        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 max-w-full p-0 rounded-l-2xl shadow-2xl bg-background/90 backdrop-blur-lg border-l border-muted"
            >
              <SheetHeader className="p-6 pb-2 flex items-center justify-between">
                <SheetTitle>
                  <span className="flex items-center gap-2 text-lg font-bold">
                    <CalendarRange className="h-6 w-6" />
                    Date Time Range Picker
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 p-6 pt-2">
                <Button
                  variant="ghost"
                  size="lg"
                  asChild
                  className="justify-start w-full gap-3 hover:bg-primary/10"
                  onClick={() => setOpen(false)}
                  aria-label="Home"
                >
                  <Link href="/">
                    <HomeIcon className="h-5 w-5" />
                    Home
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  asChild
                  className="justify-start w-full gap-3 hover:bg-primary/10"
                  onClick={() => setOpen(false)}
                  aria-label="Explore Registry"
                >
                  <Link href="/registry">
                    <GridIcon className="h-5 w-5" />
                    Explore Registry
                  </Link>
                </Button>
                <GitHubStarsButton />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
