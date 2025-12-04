import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  redirects, type Redirect, type InsertRedirect,
  syncStatus, type SyncStatus, type InsertSyncStatus,
  pages, type Page, type InsertPage,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Projects
  getAllProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  getProjectByWpId(wpId: number): Promise<Project | undefined>;
  upsertProject(project: InsertProject): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  
  // Pages
  getAllPages(): Promise<Page[]>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  getPageByWpId(wpId: number): Promise<Page | undefined>;
  upsertPage(page: InsertPage): Promise<Page>;
  
  // Redirects
  getAllRedirects(): Promise<Redirect[]>;
  getRedirectByOrigin(origin: string): Promise<Redirect | undefined>;
  upsertRedirect(redirect: InsertRedirect): Promise<Redirect>;
  clearRedirects(): Promise<void>;
  
  // Sync Status
  getSyncStatus(entityType: string): Promise<SyncStatus | undefined>;
  upsertSyncStatus(status: InsertSyncStatus): Promise<SyncStatus>;
}

export class DatabaseStorage implements IStorage {
  // Users
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

  // Projects
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

  async upsertProject(project: InsertProject): Promise<Project> {
    const existing = await this.getProjectByWpId(project.wpId);
    
    if (existing) {
      const [updated] = await db
        .update(projects)
        .set({ ...project, syncedAt: new Date() })
        .where(eq(projects.wpId, project.wpId))
        .returning();
      return updated;
    }
    
    const [created] = await db.insert(projects).values(project).returning();
    return created;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Pages
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

  async upsertPage(page: InsertPage): Promise<Page> {
    const existing = await this.getPageByWpId(page.wpId);
    
    if (existing) {
      const [updated] = await db
        .update(pages)
        .set({ ...page, syncedAt: new Date() })
        .where(eq(pages.wpId, page.wpId))
        .returning();
      return updated;
    }
    
    const [created] = await db.insert(pages).values(page).returning();
    return created;
  }

  // Redirects
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
        .set({ ...redirect, syncedAt: new Date() })
        .where(eq(redirects.origin, redirect.origin))
        .returning();
      return updated;
    }
    
    const [created] = await db.insert(redirects).values(redirect).returning();
    return created;
  }

  async clearRedirects(): Promise<void> {
    await db.delete(redirects);
  }

  // Sync Status
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
        .set({ ...status, lastSyncAt: new Date() })
        .where(eq(syncStatus.entityType, status.entityType))
        .returning();
      return updated;
    }
    
    const [created] = await db.insert(syncStatus).values(status).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
