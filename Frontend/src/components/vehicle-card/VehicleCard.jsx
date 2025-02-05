import styles from "./VehicleCard.module.css";

const VehicleCard = ({
  vehicleData = {
    name: "Tesla Model X",
    brand: "Tesla",
    image_url:
      "https://5.imimg.com/data5/SELLER/Default/2024/6/430715318/YW/FA/II/224538398/2020-tesla-model-x-long-range-plus-500x500.jpg",
    price_per_day: 999.0,
  },
}) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.vehicleName}>{vehicleData.name}</h3>
      <p className={styles.brand}>{vehicleData.brand}</p>

      <img
        src={vehicleData.image_url}
        alt={vehicleData.name + " Image"}
        className={styles.vehicleImg}
      />

      <div className={styles.pricingContainer}>
        <p className={styles.price}>
          ₹{vehicleData.price_per_day}/<span>day</span>
        </p>

        <button type='button' className={styles.rentNowButton}>
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
