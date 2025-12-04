import { 
  users, type User, type InsertUser,
  projects, type Project,
  redirects, type Redirect, type InsertRedirect,
  syncStatus, type SyncStatus, type InsertSyncStatus,
  pages, type Page,
  type SeoMetadata, type AcfFields,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface ProjectInput {
  wpId: number;
  slug: string;
  title: string;
  content?: string | null;
  excerpt?: string | null;
  status?: string;
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  acfFields?: AcfFields | null;
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
  
  getAllProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  getProjectByWpId(wpId: number): Promise<Project | undefined>;
  upsertProject(project: ProjectInput): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  
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

  async getAllProjects(): Promise<Project[]> {
    return db.select().from(projects).orderBy(desc(projects.syncedAt));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return db.select().from(projects).where(eq(projects.isFeatured, true)).orderBy(desc(projects.syncedAt));
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
    return project || undefined;
  }

  async getProjectByWpId(wpId: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.wpId, wpId));
    return project || undefined;
  }

  async upsertProject(project: ProjectInput): Promise<Project> {
    const existing = await this.getProjectByWpId(project.wpId);
    
    if (existing) {
      const [updated] = await db
        .update(projects)
        .set({
          slug: project.slug,
          title: project.title,
          content: project.content,
          excerpt: project.excerpt,
          status: project.status,
          featuredImage: project.featuredImage,
          featuredImageAlt: project.featuredImageAlt,
          acfFields: project.acfFields as AcfFields,
          seoMetadata: project.seoMetadata as SeoMetadata,
          isFeatured: project.isFeatured,
          wpModified: project.wpModified,
          syncedAt: new Date(),
        })
        .where(eq(projects.wpId, project.wpId))
        .returning();
      return updated;
    }
    
    const [created] = await db.insert(projects).values({
      wpId: project.wpId,
      slug: project.slug,
      title: project.title,
      content: project.content,
      excerpt: project.excerpt,
      status: project.status ?? "publish",
      featuredImage: project.featuredImage,
      featuredImageAlt: project.featuredImageAlt,
      acfFields: project.acfFields as AcfFields,
      seoMetadata: project.seoMetadata as SeoMetadata,
      isFeatured: project.isFeatured ?? false,
      wpModified: project.wpModified,
    }).returning();
    return created;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
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
}

export const storage = new DatabaseStorage();
