import { useState, useContext } from "react";
import styles from "./OurFleet.module.css";
import VehicleCard from "../vehicle-card/VehicleCard";
import { VehicleContext } from "../../context/VehicleContext";

const OurFleet = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleVehicles, setVisibleVehicles] = useState(8);

  const { vehicles, loading, error } = useContext(VehicleContext);

  const filteredVehicles = vehicles.filter(
    (vehicle) => activeCategory === "All" || vehicle.type === activeCategory
  );

  const displayedVehicles = filteredVehicles.slice(0, visibleVehicles);

  return (
    <section className={styles.ourFleet}>
      <div className={styles.sectionHeading}>
        <h2>Find Your Ride</h2>
        <p>
          Explore our top vehicles available for rent at great prices. Find the
          perfect ride for your needs!
        </p>
      </div>

      <div className={styles.categoryFilter}>
        {["All", "Car", "Bike", "SUV"].map((category) => (
          <button
            key={category}
            type='button'
            className={activeCategory === category ? styles.active : ""}
            onClick={() => setActiveCategory(category)}>
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.loading}>
          <p>Loading, Please Wait....</p>
        </div>
      ) : error ? (
        <div className={`${styles.error} `}>
          <p>Failed to load vehicles. Please try again later.</p>
        </div>
      ) : (
        <div className={styles.gridContainer}>
          {displayedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.vehicle_id} vehicleData={vehicle} />
          ))}
        </div>
      )}

      {!loading &&
        !error &&
        displayedVehicles.length > 0 &&
        displayedVehicles.length < filteredVehicles.length && (
          <button
            type='button'
            className={styles.loadMore}
            onClick={() => setVisibleVehicles((prev) => prev + 4)}>
            Load More
          </button>
        )}
    </section>
  );
};

export default OurFleet;
