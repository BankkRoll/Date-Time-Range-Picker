"use client";

import type { Registry } from "../../registry/schema";

interface FetchRegistryItemOptions {
  name: string;
}

export async function fetchRegistryItem({
  name,
}: FetchRegistryItemOptions): Promise<Registry | null> {
  try {
    const response = await fetch(`/r/${name}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch registry item: ${name}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching registry item:", error);
    return null;
  }
}

export async function fetchRegistryIndex(): Promise<Array<
  Partial<Registry>
> | null> {
  try {
    const response = await fetch("/r/index.json");
    if (!response.ok) {
      throw new Error("Failed to fetch registry index");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching registry index:", error);
    return null;
  }
}
