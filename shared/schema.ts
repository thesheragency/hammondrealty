import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// SEO metadata type for Yoast integration
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

// Taxonomy term type for categories and tags
export const taxonomyTermSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  count: z.number().optional(),
});

export type TaxonomyTerm = z.infer<typeof taxonomyTermSchema>;

// Posts table - cached WordPress posts
export const posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  wpId: integer("wp_id").notNull().unique(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content"),
  excerpt: text("excerpt"),
  status: text("status").notNull().default("publish"),
  featuredImage: text("featured_image"),
  featuredImageAlt: text("featured_image_alt"),
  author: text("author"),
  publishedAt: timestamp("published_at"),
  categories: jsonb("categories").$type<TaxonomyTerm[]>(),
  tags: jsonb("tags").$type<TaxonomyTerm[]>(),
  seoMetadata: jsonb("seo_metadata").$type<SeoMetadata>(),
  isFeatured: boolean("is_featured").default(false),
  wpModified: timestamp("wp_modified"),
  syncedAt: timestamp("synced_at").defaultNow(),
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  syncedAt: true,
});

export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;

// Redirects table - Yoast SEO Premium redirects
export const redirects = pgTable("redirects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  origin: text("origin").notNull().unique(),
  target: text("target").notNull(),
  type: integer("type").notNull().default(301),
  format: text("format").default("plain"),
  syncedAt: timestamp("synced_at").defaultNow(),
});

export const insertRedirectSchema = createInsertSchema(redirects).omit({
  id: true,
  syncedAt: true,
});

export type InsertRedirect = z.infer<typeof insertRedirectSchema>;
export type Redirect = typeof redirects.$inferSelect;

// Sync status table - track sync operations
export const syncStatus = pgTable("sync_status", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  entityType: text("entity_type").notNull(),
  lastSyncAt: timestamp("last_sync_at").defaultNow(),
  itemsCount: integer("items_count").default(0),
  status: text("status").notNull().default("success"),
  errorMessage: text("error_message"),
});

export const insertSyncStatusSchema = createInsertSchema(syncStatus).omit({
  id: true,
});

export type InsertSyncStatus = z.infer<typeof insertSyncStatusSchema>;
export type SyncStatus = typeof syncStatus.$inferSelect;

// Pages table - WordPress pages for preview support
export const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  wpId: integer("wp_id").notNull().unique(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content"),
  status: text("status").notNull().default("publish"),
  seoMetadata: jsonb("seo_metadata").$type<SeoMetadata>(),
  wpModified: timestamp("wp_modified"),
  syncedAt: timestamp("synced_at").defaultNow(),
});

export const insertPageSchema = createInsertSchema(pages).omit({
  id: true,
  syncedAt: true,
});

export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;

// Global settings table - ACF options page data
export const globalSettings = pgTable("global_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: text("value"),
  syncedAt: timestamp("synced_at").defaultNow(),
});

export const insertGlobalSettingSchema = createInsertSchema(globalSettings).omit({
  id: true,
  syncedAt: true,
});

export type InsertGlobalSetting = z.infer<typeof insertGlobalSettingSchema>;
export type GlobalSetting = typeof globalSettings.$inferSelect;

// Keep users table for compatibility
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
