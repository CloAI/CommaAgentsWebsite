import { defineCollection, z } from "astro:content";

const homepageCollection = defineCollection({
  type: "content",
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      button: z.object({
        label: z.string(),
        link: z.string(),
        enable: z.boolean().default(true),
      }),
    }),
    quick_start: z.object({
      title: z.string(),
      description: z.string(),
      install: z.object({
        label: z.string(),
        title: z.string(),
        description: z.string(),
        note: z.string(),
        macos_linux: z.object({
          label: z.string(),
          command: z.string(),
        }),
        windows: z.object({
          label: z.string(),
          command: z.string(),
        }),
      }),
      strategy: z.object({
        label: z.string(),
        title: z.string(),
        description: z.string(),
        typescript: z.object({
          label: z.string(),
          filename: z.string(),
          code: z.string(),
          command: z.string(),
        }),
        json: z.object({
          label: z.string(),
          filename: z.string(),
          code: z.string(),
          command: z.string(),
        }),
      }),
    }),
    benefits: z.object({
      title: z.string(),
      description: z.string(),
      benefits_list: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          color: z.string(),
          icon: z.string(),
        }),
      ),
    }),
  }),
});

const hubCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string().optional(),
    title: z.string(),
    page_title: z.string().optional(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    categories: z.array(z.string()).default([]),
    icon: z.string().optional(),
    color: z.string().optional(),
  }),
});

export const collections = {
  homepage: homepageCollection,
  hub: hubCollection,
};
