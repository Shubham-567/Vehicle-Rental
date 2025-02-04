import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchBox}>
      <form>
        <div className={styles.inputGroup}>
          <select name='type' id='type' className={styles.selectBox}>
            <option value=''>Vehicle Type</option>
            <option value='car'>Car</option>
            <option value='bike'>Bike</option>
            <option value='suv'>SUV</option>
          </select>
          <input
            type='text'
            placeholder='Location'
            required
            className={styles.inputField}
          />
        </div>

        <div className={styles.dateGroup}>
          <div>
            <label htmlFor='start-date' className={styles.label}>
              Start Date:
            </label>
            <br />
            <input id='start-date' type='date' className={styles.dateInput} />
          </div>

          <div>
            <label htmlFor='end-date' className={styles.label}>
              End Date:
            </label>
            <br />
            <input id='end-date' type='date' className={styles.dateInput} />
          </div>

          <button type='submit' className={styles.searchButton}>
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
