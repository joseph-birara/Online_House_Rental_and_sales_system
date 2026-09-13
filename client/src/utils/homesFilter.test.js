import {
  applyHomeFilters,
  DEFAULT_FILTERS,
  filtersAreActive,
  getListingHomes,
  parseFilterNumber,
} from "./homesFilter";

const houses = [
  {
    _id: "1",
    title: "Bole apartment",
    description: "Sunny flat near the airport",
    subCity: "Bole",
    city: "Addis Ababa",
    kebele: "08",
    woreda: "03",
    price: 25000,
    area: 90,
    bedRoom: 2,
    bathRoom: 1,
    homeType: "regularRent",
    isRented: false,
    suspended: false,
  },
  {
    _id: "2",
    title: "Yeka villa",
    description: "Family home",
    subCity: "yeka",
    city: "Addis Ababa",
    price: 80000,
    area: 180,
    bedRoom: 4,
    bathRoom: 3,
    homeType: "sale",
    isRented: false,
    suspended: false,
  },
  {
    _id: "3",
    title: "Kirkos studio",
    description: "Short stay",
    subCity: "Kirkos",
    city: "Addis Ababa",
    price: 2500,
    area: 40,
    bedRoom: 1,
    bathRoom: 1,
    homeType: "shortTermRent",
    isRented: false,
    suspended: false,
  },
  {
    _id: "4",
    title: "Suspended rental",
    subCity: "Bole",
    price: 12000,
    area: 70,
    bedRoom: 2,
    bathRoom: 1,
    homeType: "regularRent",
    isRented: false,
    suspended: true,
  },
  {
    _id: "5",
    title: "Already rented",
    subCity: "Arada",
    price: 15000,
    area: 60,
    bedRoom: 1,
    bathRoom: 1,
    homeType: "regularRent",
    isRented: true,
    suspended: false,
  },
];

describe("parseFilterNumber", () => {
  test("uses fallback for empty or invalid values", () => {
    expect(parseFilterNumber("", 0)).toBe(0);
    expect(parseFilterNumber("abc", 10)).toBe(10);
    expect(parseFilterNumber("1500", 0)).toBe(1500);
  });
});

describe("getListingHomes", () => {
  test("keeps available rentals and excludes sales, rented, and suspended homes", () => {
    const rentals = getListingHomes(houses, "rent");
    expect(rentals.map((home) => home._id)).toEqual(["1", "3"]);
  });

  test("keeps unsuspended sale listings only", () => {
    const sales = getListingHomes(houses, "buy");
    expect(sales.map((home) => home._id)).toEqual(["2"]);
  });
});

describe("applyHomeFilters", () => {
  const rentals = getListingHomes(houses, "rent");

  test("matches subcity case-insensitively", () => {
    const result = applyHomeFilters(rentals, {
      ...DEFAULT_FILTERS,
      subcity: "bole",
    });
    expect(result.map((home) => home._id)).toEqual(["1"]);
  });

  test("applies price, area, rooms, and rent type together", () => {
    const result = applyHomeFilters(rentals, {
      ...DEFAULT_FILTERS,
      rentType: "regularRent",
      minPrice: "10000",
      maxPrice: "30000",
      minArea: "80",
      bedrooms: "2",
    });
    expect(result.map((home) => home._id)).toEqual(["1"]);
  });

  test("search matches title or location", () => {
    const result = applyHomeFilters(rentals, {
      ...DEFAULT_FILTERS,
      search: "airport",
    });
    expect(result.map((home) => home._id)).toEqual(["1"]);
  });

  test("widening a filter returns previously excluded homes", () => {
    const narrowed = applyHomeFilters(rentals, {
      ...DEFAULT_FILTERS,
      minPrice: "20000",
    });
    expect(narrowed.map((home) => home._id)).toEqual(["1"]);

    const widened = applyHomeFilters(rentals, {
      ...DEFAULT_FILTERS,
      minPrice: "",
    });
    expect(widened.map((home) => home._id)).toEqual(["1", "3"]);
  });
});

describe("filtersAreActive", () => {
  test("detects when any filter differs from the defaults", () => {
    expect(filtersAreActive(DEFAULT_FILTERS)).toBe(false);
    expect(filtersAreActive({ ...DEFAULT_FILTERS, bedrooms: "2" })).toBe(true);
  });
});
