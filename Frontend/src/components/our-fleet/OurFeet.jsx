import styles from "./OurFleet.module.css";
import VehicleCard from "../vehicle-card/VehicleCard";

const OurFleet = () => {
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
        <button type='button' className={styles.active}>
          All
        </button>
        <button type='button'>Car</button>
        <button type='button'>Bike</button>
        <button type='button'>Suv</button>
      </div>

      <div className={styles.gridContainer}>
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
      </div>

      <button type='button' className={styles.loadMore}>
        Load More
      </button>
    </section>
  );
};

export default OurFleet;
