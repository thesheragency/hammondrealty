import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const seoMetadataSchema = z.object({
  title: z.string().optional(),
  metaDesc: z.string().optional(),
  canonical: z.string().optional(),
  opengraphTitle: z.string().optional(),
  opengraphDescription: z.string().optional(),
  opengraphImage: z.string().optional(),
  opengraphType: z.string().optional(),
  opengraphUrl: z.string().optional(),
  opengraphSiteName: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
  twitterCard: z.string().optional(),
});

export type SeoMetadata = z.infer<typeof seoMetadataSchema>;

export const taxonomyTermSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  count: z.number().optional(),
});

export type TaxonomyTerm = z.infer<typeof taxonomyTermSchema>;

export interface Post {
  wpId: number;
  slug: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  status: string;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  author: string | null;
  publishedAt: Date | null;
  categories: TaxonomyTerm[] | null;
  tags: TaxonomyTerm[] | null;
  seoMetadata: SeoMetadata | undefined;
  isFeatured: boolean;
  wpModified: Date | null;
}

export interface Page {
  wpId: number;
  slug: string;
  title: string;
  content: string | null;
  status: string;
  seoMetadata: SeoMetadata | undefined;
  wpModified: Date | null;
}

export interface GlobalScripts {
  headScripts: string | null;
  bodyScripts: string | null;
}

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
