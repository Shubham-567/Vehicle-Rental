import styles from "./CallToAction.module.css";
import rentImg from "../../assets/rent-now.png";

const CallToAction = () => {
  return (
    <section className={styles.callToAction}>
      <div className={styles.textContainer}>
        <h4>Ready to Find Your Perfect Ride?</h4>
        <p>
          Start your journey today by searching for the ideal vehicle. Book now
          and hit the road!
        </p>

        <button>Rent Now</button>
      </div>

      <img
        src={rentImg}
        alt='illustration of person booking car'
        className={styles.imgContainer}
      />
    </section>
  );
};

export default CallToAction;
