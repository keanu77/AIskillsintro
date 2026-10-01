"use client";

import { useCallback, useEffect, useState } from "react";
import {
  EMPTY_FILTERS,
  parseFilters,
  serializeFilters,
  type CatalogFilters,
} from "@/lib/catalogFilter";

/** Catalog filters mirrored to the query string so results are shareable. */
export function useCatalogFilters() {
  const [filters, setFiltersState] = useState<CatalogFilters>(EMPTY_FILTERS);

  const setFilters = useCallback((next: CatalogFilters) => {
    setFiltersState(next);
    const { pathname, hash } = window.location;
    window.history.replaceState(null, "", `${pathname}${serializeFilters(next)}${hash}`);
  }, []);

  // Read the URL after hydration so the static HTML stays deterministic.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from URL
    setFiltersState(parseFilters(window.location.search));
  }, []);

  return { filters, setFilters };
}
