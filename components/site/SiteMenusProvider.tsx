"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteMenus } from "@/lib/wp-menus";

const EMPTY_MENUS: SiteMenus = {
  headerNav: null,
  headerCtas: null,
  footerNav: null,
  footerServices: null,
  footerSocial: null,
};

const SiteMenusContext = createContext<SiteMenus>(EMPTY_MENUS);

export function SiteMenusProvider({
  menus,
  children,
}: {
  menus: SiteMenus;
  children: ReactNode;
}) {
  return (
    <SiteMenusContext.Provider value={menus}>{children}</SiteMenusContext.Provider>
  );
}

export function useSiteMenus(): SiteMenus {
  return useContext(SiteMenusContext);
}
