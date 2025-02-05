import styles from "./VehicleCard.module.css";

const VehicleCard = ({
  vehicleName = "Toyota Corolla",
  brand = "Toyota",
  imgUrl = "https://cdni.autocarindia.com/ExtraImages/20220401051803_Toyota%20GR%20Corolla.jpg",
  price = 999,
}) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.vehicleName}>{vehicleName}</h3>
      <p className={styles.brand}>{brand}</p>

      <img src={imgUrl} alt='vehicle Image' className={styles.vehicleImg} />

      <div className={styles.pricingContainer}>
        <p className={styles.price}>
          ₹{price}.00/<span>day</span>
        </p>

        <button type='button' className={styles.rentNowButton}>
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
