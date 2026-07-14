import { getWpAuthHeaders } from "./wp-auth";

export interface WpMenuItem {
  label: string;
  href: string;
}

export interface SiteMenus {
  headerNav: WpMenuItem[] | null;
  headerCtas: WpMenuItem[] | null;
  footerNav: WpMenuItem[] | null;
  footerServices: WpMenuItem[] | null;
  footerSocial: WpMenuItem[] | null;
}

const MENUS_QUERY = `
  query SiteMenus {
    headerNav: menus(where: { location: HEADER_NAVIGATION }) {
      nodes { menuItems(first: 30, where: { parentDatabaseId: 0 }) { nodes { label path url } } }
    }
    headerCtas: menus(where: { location: HEADER_CTAS }) {
      nodes { menuItems(first: 10, where: { parentDatabaseId: 0 }) { nodes { label path url } } }
    }
    footerNav: menus(where: { location: FOOTER_NAVIGATION }) {
      nodes { menuItems(first: 30, where: { parentDatabaseId: 0 }) { nodes { label path url } } }
    }
    footerServices: menus(where: { location: FOOTER_SERVICES }) {
      nodes { menuItems(first: 30, where: { parentDatabaseId: 0 }) { nodes { label path url } } }
    }
    footerSocial: menus(where: { location: FOOTER_SOCIAL }) {
      nodes { menuItems(first: 10, where: { parentDatabaseId: 0 }) { nodes { label path url } } }
    }
  }
`;

interface RawMenuItem {
  label?: string | null;
  path?: string | null;
  url?: string | null;
}

function sanitizeHref(href: string): string {
  const trimmed = href.trim();
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    /^(https?:|mailto:|tel:)/i.test(trimmed)
  ) {
    return trimmed;
  }
  return "#";
}

function toItems(node: any): WpMenuItem[] | null {
  const items: RawMenuItem[] | undefined = node?.nodes?.[0]?.menuItems?.nodes;
  if (!items || items.length === 0) return null;
  const mapped = items
    .map((i) => ({ label: i.label || "", href: sanitizeHref(i.path || i.url || "#") }))
    .filter((i) => i.label);
  return mapped.length > 0 ? mapped : null;
}

const EMPTY_MENUS: SiteMenus = {
  headerNav: null,
  headerCtas: null,
  footerNav: null,
  footerServices: null,
  footerSocial: null,
};

export async function fetchSiteMenus(): Promise<SiteMenus> {
  const endpoint = process.env.WP_API_URL;
  if (!endpoint) return EMPTY_MENUS;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getWpAuthHeaders(),
      },
      body: JSON.stringify({ query: MENUS_QUERY }),
      next: { revalidate: 60, tags: ["wp-content"] },
    });
    if (!res.ok) return EMPTY_MENUS;
    const json = await res.json();
    const d = json?.data;
    if (!d) return EMPTY_MENUS;
    return {
      headerNav: toItems(d.headerNav),
      headerCtas: toItems(d.headerCtas),
      footerNav: toItems(d.footerNav),
      footerServices: toItems(d.footerServices),
      footerSocial: toItems(d.footerSocial),
    };
  } catch {
    return EMPTY_MENUS;
  }
}
