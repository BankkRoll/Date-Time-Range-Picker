// registry/registry-types.ts
import { z } from "zod";

export const registryItemSchema = z.object({
  name: z.string(),
  type: z.string(),
  title: z.string(),
  description: z.string(),
  files: z.array(
    z.object({
      path: z.string(),
      content: z.string().optional(),
      type: z.string(),
      target: z.string().optional(),
    }),
  ),
  registryDependencies: z.array(z.string()).optional(),
  dependencies: z.array(z.string()).optional(),
  meta: z.record(z.any()).optional(),
});

export type Registry = {
  name: string;
  homepage: string;
  items: z.infer<typeof registryItemSchema>[];
};
