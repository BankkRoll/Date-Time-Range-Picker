"use client";

import type { RegistryItem } from "shadcn/registry";

interface FetchRegistryItemOptions {
  name: string;
}

// In-memory cache
let registryIndexCache: { items: RegistryItem[]; timestamp: number } | null =
  null;
const registryItemCache: Record<
  string,
  { item: RegistryItem; timestamp: number }
> = {};
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export async function fetchRegistryItem({
  name,
}: FetchRegistryItemOptions): Promise<RegistryItem | null> {
  const now = Date.now();
  if (
    registryItemCache[name] &&
    now - registryItemCache[name].timestamp < CACHE_TTL
  ) {
    return registryItemCache[name].item;
  }
  try {
    const response = await fetch(`/r/${name}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch registry item: ${name}`);
    }
    const item = await response.json();
    registryItemCache[name] = { item, timestamp: now };
    return item;
  } catch (error) {
    console.error("Error fetching registry item:", error);
    return null;
  }
}

export async function fetchRegistryIndex(): Promise<RegistryItem[]> {
  const now = Date.now();
  if (registryIndexCache && now - registryIndexCache.timestamp < CACHE_TTL) {
    return registryIndexCache.items;
  }
  try {
    const response = await fetch("/r/index.json");
    if (!response.ok) {
      throw new Error("Failed to fetch registry index");
    }
    const data = await response.json();
    registryIndexCache = { items: data.items, timestamp: now };
    return data.items;
  } catch (error) {
    console.error("Error fetching registry index:", error);
    return [];
  }
}
