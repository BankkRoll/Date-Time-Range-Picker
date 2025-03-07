import { z } from "zod";

const registrySchema = z.object({
  name: z.string(),
  description: z.string(),
  components: z.array(z.string()),
  framework: z.string(),
  dependencies: z.array(z.string()).optional(),
  repository: z.string().optional(),
  install: z.string().optional(),
  type: z.string(),
  category: z.string(),
  author: z.string(),
  author_url: z.string().optional(),
  source: z.string().optional(),
  og_image: z.string().optional(),
  license: z.string().optional(),
  license_url: z.string().optional(),
  aliases: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export type Registry = z.infer<typeof registrySchema>;
