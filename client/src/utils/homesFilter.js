export const SUBCITIES = [
  "Addis Ketema",
  "Akaky Kaliti",
  "Arada",
  "Bole",
  "Gullele",
  "Kirkos",
  "Kolfe Keranio",
  "Lideta",
  "Nifas Silk-Lafto",
  "Yeka",
];

export const DEFAULT_FILTERS = {
  search: "",
  subcity: "All subcities",
  rentType: "all",
  minPrice: "",
  maxPrice: "",
  minArea: "",
  maxArea: "",
  bedrooms: "",
  bathrooms: "",
};

export function parseFilterNumber(value, fallback) {
  if (value === "" || value == null) {
    return fallback;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

export function getListingHomes(houses, mode) {
  if (!Array.isArray(houses)) {
    return [];
  }

  return houses.filter((home) => {
    if (home.suspended) {
      return false;
    }
    if (mode === "rent") {
      return home.isRented === false && home.homeType !== "sale";
    }
    return home.homeType === "sale";
  });
}

export function applyHomeFilters(homes, filters = DEFAULT_FILTERS) {
  const minPrice = parseFilterNumber(filters.minPrice, 0);
  const maxPrice = parseFilterNumber(filters.maxPrice, Number.MAX_VALUE);
  const minArea = parseFilterNumber(filters.minArea, 0);
  const maxArea = parseFilterNumber(filters.maxArea, Number.MAX_VALUE);
  const bedrooms = parseFilterNumber(filters.bedrooms, 0);
  const bathrooms = parseFilterNumber(filters.bathrooms, 0);
  const search = normalize(filters.search);
  const subcity =
    filters.subcity && filters.subcity !== "All subcities"
      ? normalize(filters.subcity)
      : "";

  return homes.filter((home) => {
    const price = Number(home.price) || 0;
    const area = Number(home.area) || 0;

    if (price < minPrice || price > maxPrice) {
      return false;
    }
    if (area < minArea || area > maxArea) {
      return false;
    }
    if (bedrooms && (Number(home.bedRoom) || 0) < bedrooms) {
      return false;
    }
    if (bathrooms && (Number(home.bathRoom) || 0) < bathrooms) {
      return false;
    }
    if (
      filters.rentType &&
      filters.rentType !== "all" &&
      home.homeType !== filters.rentType
    ) {
      return false;
    }
    if (subcity && normalize(home.subCity) !== subcity) {
      return false;
    }
    if (search) {
      const haystack = [
        home.title,
        home.description,
        home.kebele,
        home.woreda,
        home.subCity,
        home.city,
      ]
        .map(normalize)
        .join(" ");
      if (!haystack.includes(search)) {
        return false;
      }
    }
    return true;
  });
}

export function filtersAreActive(filters = DEFAULT_FILTERS) {
  return Object.entries(DEFAULT_FILTERS).some(
    ([key, value]) => (filters[key] ?? value) !== value
  );
}
