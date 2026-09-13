import { SUBCITIES } from "../utils/homesFilter";
import styles from "../pages/HomesListing.module.css";

const ListingFilters = ({
  filters,
  onChange,
  onReset,
  showRentType,
  resultCount,
  total,
  hasActiveFilters,
  subcityOptions = SUBCITIES,
}) => {
  const field = (key) => ({
    value: filters[key],
    onChange: (event) => onChange(key, event.target.value),
  });

  return (
    <div className={styles.filters}>
      <div className={styles.searchRow}>
        <label className={styles.field}>
          <span>Search</span>
          <input
            type="text"
            placeholder="Title, neighborhood, or city"
            {...field("search")}
          />
        </label>
      </div>

      <div className={styles.filterGrid}>
        <label className={styles.field}>
          <span>Subcity</span>
          <select {...field("subcity")}>
            <option value="All subcities">All subcities</option>
            {subcityOptions.map((subcity) => (
              <option key={subcity} value={subcity}>
                {subcity}
              </option>
            ))}
          </select>
        </label>

        {showRentType && (
          <label className={styles.field}>
            <span>Rent type</span>
            <select {...field("rentType")}>
              <option value="all">All rentals</option>
              <option value="regularRent">Monthly</option>
              <option value="shortTermRent">Daily / short stay</option>
            </select>
          </label>
        )}

        <label className={styles.field}>
          <span>Bedrooms</span>
          <select {...field("bedrooms")}>
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Bathrooms</span>
          <select {...field("bathrooms")}>
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Min price (ETB)</span>
          <input type="number" min="0" placeholder="0" {...field("minPrice")} />
        </label>

        <label className={styles.field}>
          <span>Max price (ETB)</span>
          <input type="number" min="0" placeholder="Any" {...field("maxPrice")} />
        </label>

        <label className={styles.field}>
          <span>Min area (m²)</span>
          <input type="number" min="0" placeholder="0" {...field("minArea")} />
        </label>

        <label className={styles.field}>
          <span>Max area (m²)</span>
          <input type="number" min="0" placeholder="Any" {...field("maxArea")} />
        </label>
      </div>

      <div className={styles.filterMeta}>
        <p>
          Showing <strong>{resultCount}</strong> of {total} homes
        </p>
        {hasActiveFilters && (
          <button type="button" className={styles.clearBtn} onClick={onReset}>
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default ListingFilters;
