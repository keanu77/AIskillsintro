"use client";

import { useCallback, useEffect, useState } from "react";
import { CATEGORIES } from "@/data/categories";
import type { CategoryId } from "@/data/types";
import {
  EMPTY_FILTERS,
  parseFilters,
  serializeFilters,
  type CatalogFilters,
} from "@/lib/catalogFilter";

const CATEGORY_IDS = new Set<string>(CATEGORIES.map((c) => c.id));

function categoryFromHash(): CategoryId | null {
  const id = decodeURIComponent(window.location.hash.slice(1));
  return CATEGORY_IDS.has(id) ? (id as CategoryId) : null;
}

/**
 * Catalog UI state: filters mirrored to the query string (shareable links)
 * and which category sections are expanded (`#<category>` opens one).
 */
export function useCatalogState() {
  const [filters, setFiltersState] = useState<CatalogFilters>(EMPTY_FILTERS);
  const [open, setOpen] = useState<ReadonlySet<CategoryId>>(
    () => new Set<CategoryId>([CATEGORIES[0].id]),
  );

  const setFilters = useCallback((next: CatalogFilters) => {
    setFiltersState(next);
    const { pathname, hash } = window.location;
    window.history.replaceState(null, "", `${pathname}${serializeFilters(next)}${hash}`);
  }, []);

  const toggle = useCallback((id: CategoryId) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  /** Open a category and scroll to it; sections are hidden while filtering. */
  const jumpTo = useCallback(
    (id: CategoryId) => {
      setFilters(EMPTY_FILTERS);
      setOpen((prev) => new Set(prev).add(id));
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    },
    [setFilters],
  );

  // Read the URL after hydration so the static HTML stays deterministic.
  useEffect(() => {
    const fromUrl = parseFilters(window.location.search);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from URL
    setFiltersState(fromUrl);

    const openFromHash = () => {
      const id = categoryFromHash();
      if (id) jumpTo(id);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [jumpTo]);

  return { filters, setFilters, open, toggle, jumpTo };
}
