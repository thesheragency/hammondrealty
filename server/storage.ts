import { 
  users, type User, type InsertUser,
  posts, type Post,
  redirects, type Redirect, type InsertRedirect,
  syncStatus, type SyncStatus, type InsertSyncStatus,
  pages, type Page,
  globalSettings, type GlobalSetting, type InsertGlobalSetting,
  type SeoMetadata, type TaxonomyTerm,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface PostInput {
  wpId: number;
  slug: string;
  title: string;
  content?: string | null;
  excerpt?: string | null;
  status?: string;
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  author?: string | null;
  publishedAt?: Date | null;
  categories?: TaxonomyTerm[] | null;
  tags?: TaxonomyTerm[] | null;
  seoMetadata?: SeoMetadata | null;
  isFeatured?: boolean;
  wpModified?: Date | null;
}

export interface PageInput {
  wpId: number;
  slug: string;
  title: string;
  content?: string | null;
  status?: string;
  seoMetadata?: SeoMetadata | null;
  wpModified?: Date | null;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllPosts(): Promise<Post[]>;
  getFeaturedPosts(): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  getPostByWpId(wpId: number): Promise<Post | undefined>;
  upsertPost(post: PostInput): Promise<Post>;
  deletePost(id: string): Promise<void>;
  
  getAllPages(): Promise<Page[]>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  getPageByWpId(wpId: number): Promise<Page | undefined>;
  upsertPage(page: PageInput): Promise<Page>;
  
  getAllRedirects(): Promise<Redirect[]>;
  getRedirectByOrigin(origin: string): Promise<Redirect | undefined>;
  upsertRedirect(redirect: InsertRedirect): Promise<Redirect>;
  clearRedirects(): Promise<void>;
  
  getSyncStatus(entityType: string): Promise<SyncStatus | undefined>;
  upsertSyncStatus(status: InsertSyncStatus): Promise<SyncStatus>;
  
  getGlobalSetting(key: string): Promise<GlobalSetting | undefined>;
  getAllGlobalSettings(): Promise<GlobalSetting[]>;
  upsertGlobalSetting(setting: InsertGlobalSetting): Promise<GlobalSetting>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAllPosts(): Promise<Post[]> {
    return db.select().from(posts).orderBy(desc(posts.publishedAt));
  }

  async getFeaturedPosts(): Promise<Post[]> {
    return db.select().from(posts).where(eq(posts.isFeatured, true)).orderBy(desc(posts.publishedAt));
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post || undefined;
  }

  async getPostByWpId(wpId: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.wpId, wpId));
    return post || undefined;
  }

  async upsertPost(post: PostInput): Promise<Post> {
    const existing = await this.getPostByWpId(post.wpId);
    
    if (existing) {
      const [updated] = await db
        .update(posts)
        .set({
          slug: post.slug,
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          status: post.status,
          featuredImage: post.featuredImage,
          featuredImageAlt: post.featuredImageAlt,
          author: post.author,
          publishedAt: post.publishedAt,
          categories: post.categories as TaxonomyTerm[],
          tags: post.tags as TaxonomyTerm[],
          seoMetadata: post.seoMetadata as SeoMetadata,
          isFeatured: post.isFeatured,
          wpModified: post.wpModified,
          syncedAt: new Date(),
        })
        .where(eq(posts.wpId, post.wpId))
        .returning();
      return updated;
    }
    
    const [created] = await db.insert(posts).values({
      wpId: post.wpId,
      slug: post.slug,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      status: post.status ?? "publish",
      featuredImage: post.featuredImage,
      featuredImageAlt: post.featuredImageAlt,
      author: post.author,
      publishedAt: post.publishedAt,
      categories: post.categories as TaxonomyTerm[],
      tags: post.tags as TaxonomyTerm[],
      seoMetadata: post.seoMetadata as SeoMetadata,
      isFeatured: post.isFeatured ?? false,
      wpModified: post.wpModified,
    }).returning();
    return created;
  }

  async deletePost(id: string): Promise<void> {
    await db.delete(posts).where(eq(posts.id, id));
  }

  async getAllPages(): Promise<Page[]> {
    return db.select().from(pages).orderBy(desc(pages.syncedAt));
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    return page || undefined;
  }

  async getPageByWpId(wpId: number): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.wpId, wpId));
    return page || undefined;
  }

  async upsertPage(page: PageInput): Promise<Page> {
    const existing = await this.getPageByWpId(page.wpId);
    
    if (existing) {
      const [updated] = await db
        .update(pages)
        .set({
          slug: page.slug,
          title: page.title,
          content: page.content,
          status: page.status,
          seoMetadata: page.seoMetadata as SeoMetadata,
          wpModified: page.wpModified,
          syncedAt: new Date(),
        })
        .where(eq(pages.wpId, page.wpId))
        .returning();
      return updated;
    }
    
    const [created] = await db.insert(pages).values({
      wpId: page.wpId,
      slug: page.slug,
      title: page.title,
      content: page.content,
      status: page.status ?? "publish",
      seoMetadata: page.seoMetadata as SeoMetadata,
      wpModified: page.wpModified,
    }).returning();
    return created;
  }

  async getAllRedirects(): Promise<Redirect[]> {
    return db.select().from(redirects);
  }

  async getRedirectByOrigin(origin: string): Promise<Redirect | undefined> {
    const [redirect] = await db.select().from(redirects).where(eq(redirects.origin, origin));
    return redirect || undefined;
  }

  async upsertRedirect(redirect: InsertRedirect): Promise<Redirect> {
    const existing = await this.getRedirectByOrigin(redirect.origin);
    
    if (existing) {
      const [updated] = await db
        .update(redirects)
        .set({
          target: redirect.target,
          type: redirect.type,
          format: redirect.format,
          syncedAt: new Date(),
        })
        .where(eq(redirects.origin, redirect.origin))
        .returning();
      return updated;
    }
    
    const [created] = await db.insert(redirects).values({
      origin: redirect.origin,
      target: redirect.target,
      type: redirect.type ?? 301,
      format: redirect.format,
    }).returning();
    return created;
  }

  async clearRedirects(): Promise<void> {
    await db.delete(redirects);
  }

  async getSyncStatus(entityType: string): Promise<SyncStatus | undefined> {
    const [status] = await db
      .select()
      .from(syncStatus)
      .where(eq(syncStatus.entityType, entityType))
      .orderBy(desc(syncStatus.lastSyncAt))
      .limit(1);
    return status || undefined;
  }

  async upsertSyncStatus(status: InsertSyncStatus): Promise<SyncStatus> {
    const existing = await this.getSyncStatus(status.entityType);
    
    if (existing) {
      const [updated] = await db
        .update(syncStatus)
        .set({
          itemsCount: status.itemsCount,
          status: status.status,
          errorMessage: status.errorMessage,
          lastSyncAt: new Date(),
        })
        .where(eq(syncStatus.entityType, status.entityType))
        .returning();
      return updated;
    }
    
    const [created] = await db.insert(syncStatus).values({
      entityType: status.entityType,
      itemsCount: status.itemsCount,
      status: status.status ?? "success",
      errorMessage: status.errorMessage,
    }).returning();
    return created;
  }

  async getGlobalSetting(key: string): Promise<GlobalSetting | undefined> {
    const [setting] = await db.select().from(globalSettings).where(eq(globalSettings.key, key));
    return setting || undefined;
  }

  async getAllGlobalSettings(): Promise<GlobalSetting[]> {
    return db.select().from(globalSettings);
  }

  async upsertGlobalSetting(setting: InsertGlobalSetting): Promise<GlobalSetting> {
    const existing = await this.getGlobalSetting(setting.key);
    
    if (existing) {
      const [updated] = await db
        .update(globalSettings)
        .set({
          value: setting.value,
          syncedAt: new Date(),
        })
        .where(eq(globalSettings.key, setting.key))
        .returning();
      return updated;
    }
    
    const [created] = await db.insert(globalSettings).values({
      key: setting.key,
      value: setting.value,
    }).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
