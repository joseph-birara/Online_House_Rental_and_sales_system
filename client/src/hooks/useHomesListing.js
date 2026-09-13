import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import { getApiErrorMessage } from "../utils/apiError";
import {
  applyHomeFilters,
  DEFAULT_FILTERS,
  filtersAreActive,
  getListingHomes,
  SUBCITIES,
} from "../utils/homesFilter";

export function useHomesListing(mode) {
  const { HousesList, setHousesList } = useContext(UtilityContext);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(HousesList.length === 0);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    axios
      .get("/houses/all")
      .then((response) => {
        if (cancelled) {
          return;
        }
        setHousesList(response.data);
        setError("");
      })
      .catch((err) => {
        if (cancelled) {
          return;
        }
        setError(getApiErrorMessage(err));
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [setHousesList]);

  const candidates = useMemo(
    () => getListingHomes(HousesList, mode),
    [HousesList, mode]
  );

  const homes = useMemo(
    () => applyHomeFilters(candidates, filters),
    [candidates, filters]
  );

  const subcityOptions = useMemo(() => {
    const unique = new Map();
    [...SUBCITIES, ...candidates.map((home) => (home.subCity || "").trim())]
      .filter(Boolean)
      .forEach((name) => {
        const key = name.toLowerCase();
        if (!unique.has(key)) {
          unique.set(key, name);
        }
      });
    return Array.from(unique.values()).sort((a, b) => a.localeCompare(b));
  }, [candidates]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return {
    homes,
    filters,
    updateFilter,
    resetFilters,
    loading,
    error,
    total: candidates.length,
    hasActiveFilters: filtersAreActive(filters),
    subcityOptions,
  };
}
