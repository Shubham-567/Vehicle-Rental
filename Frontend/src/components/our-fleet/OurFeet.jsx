import { useState } from "react";
import styles from "./OurFleet.module.css";
import VehicleCard from "../vehicle-card/VehicleCard";

const OurFleet = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleVehicles, setVisibleVehicles] = useState(8);

  const vehicles = [
    { id: 1, name: "Car 1", category: "Car" },
    { id: 2, name: "Bike 1", category: "Bike" },
    { id: 3, name: "SUV 1", category: "SUV" },
    { id: 4, name: "Car 2", category: "Car" },
    { id: 5, name: "Bike 2", category: "Bike" },
    { id: 6, name: "SUV 2", category: "SUV" },
    { id: 7, name: "Car 3", category: "Car" },
    { id: 8, name: "Bike 3", category: "Bike" },
    { id: 9, name: "SUV 3", category: "SUV" },
    { id: 10, name: "Car 4", category: "Car" },
    { id: 11, name: "Bike 4", category: "Bike" },
    { id: 12, name: "SUV 4", category: "SUV" },
  ];

  const filteredVehicles = vehicles.filter(
    (vehicle) => activeCategory === "All" || vehicle.category === activeCategory
  );

  const displayedVehicles = filteredVehicles.slice(0, visibleVehicles);

  const loadMoreHandler = () => {
    setVisibleVehicles((prev) => prev + 4);
  };

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

      <div className={styles.gridContainer}>
        {displayedVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicleName={vehicle.name} />
        ))}
      </div>

      {filteredVehicles.length > visibleVehicles && (
        <button
          type='button'
          className={styles.loadMore}
          onClick={loadMoreHandler}>
          Load More
        </button>
      )}
    </section>
  );
};

export default OurFleet;
