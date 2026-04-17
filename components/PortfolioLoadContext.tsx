"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * When wrapped by PageLoader, `false` until the intro overlay finishes.
 * Default `true` so TypewriterText still works if used outside the loader.
 */
const PortfolioLoadContext = createContext(true);

export function PortfolioLoadProvider({
  ready,
  children,
}: {
  ready: boolean;
  children: ReactNode;
}) {
  return (
    <PortfolioLoadContext.Provider value={ready}>
      {children}
    </PortfolioLoadContext.Provider>
  );
}

export function usePortfolioLoadReady() {
  return useContext(PortfolioLoadContext);
}
