import styles from "./Steps.module.css";
import howImg from "../../assets/how-it-works.png";

const Steps = () => {
  return (
    <section className={styles.stepContainer}>
      <img
        src={howImg}
        alt='Illustration of confuse person'
        className={styles.stepImg}
      />
      <div className={styles.steps}>
        <h2>How It Works</h2>

        {/* step 1 */}
        <div className={styles.process}>
          <div className={styles.stepIcon}>1</div>
          <div className={styles.processStep}>
            <h4>Search for a Vehicle 🔍</h4>
            <p>
              Explore a variety of vehicles and choose one based on your
              preferred type, location, and rental dates.
            </p>
          </div>
        </div>

        {/* step 2 */}
        <div className={styles.process}>
          <div className={styles.stepIcon}>2</div>
          <div className={styles.processStep}>
            <h4>Book & Pay Securely 💳 🔍</h4>
            <p>
              Select your car, review the details, and complete your booking
              with secure payment options.
            </p>
          </div>
        </div>

        {/* step 3 */}
        <div className={styles.process}>
          <div className={styles.stepIcon}>3</div>
          <div className={styles.processStep}>
            <h4>Pickup or Get Delivered 🚗</h4>
            <p>
              Pick up your vehicle from the designated location or have it
              delivered to your doorstep (where available).
            </p>
          </div>
        </div>

        {/* step 4 */}
        <div className={styles.process}>
          <div className={styles.stepIcon}>4</div>
          <div className={styles.processStep}>
            <h4>Enjoy Your Ride! 🎉</h4>
            <p>
              Drive with confidence and make the most of your rental, whether
              it's a road trip or daily commute!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
