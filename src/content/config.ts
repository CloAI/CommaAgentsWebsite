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
    code_example: z.object({
      title: z.string(),
      description: z.string(),
      code: z.string(),
      code_output: z.string(),
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
