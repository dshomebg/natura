"use client";

import { createContext, useContext } from "react";

// Provides site-wide globals (header menu, footer, contacts) to client
// components without prop-drilling through every page.
const SiteContext = createContext({ header: null, footer: null, settings: null });

export function SiteProvider({ value, children }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export const useSiteData = () => useContext(SiteContext);
