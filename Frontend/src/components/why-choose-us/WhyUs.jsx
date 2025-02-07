import styles from "./WhyUs.module.css";
import carCollectionIcon from "../../assets/car-collection.png";
import saveMoneyIcon from "../../assets/save-money.png";
import paymentIcon from "../../assets/payment.png";
import supportIcon from "../../assets/support.png";

const WhyUs = () => {
  return (
    <section>
      <div className={styles.sectionHeading}>
        <h2>Why Choose Us?</h2>
        <p>
          Extensive selection, transparent pricing, secure payments, and
          round-the-clock customer support.
        </p>
      </div>

      <div className={styles.benefits}>
        <div className={styles.benefitCard}>
          <img
            src={carCollectionIcon}
            alt='car icon'
            className={styles.benefitImg}
          />
          <div className={styles.benefitText}>
            <h4>
              Wide Selection
              <br /> of Vehicles
            </h4>
            <p>
              From economy cars to luxury rides, we have options for every need.
            </p>
          </div>
        </div>

        <div className={styles.benefitCard}>
          <img
            src={saveMoneyIcon}
            alt='money icon'
            className={styles.benefitImg}
          />
          <div className={styles.benefitText}>
            <h4>
              Affordable & <br /> Transparent Pricing
            </h4>
            <p>
              Clear daily rates with no hidden fees, ensuring a hassle-free
              rental.
            </p>
          </div>
        </div>

        <div className={styles.benefitCard}>
          <img
            src={paymentIcon}
            alt='payment icon'
            className={styles.benefitImg}
          />
          <div className={styles.benefitText}>
            <h4>
              Secure <br />
              Online Payment
            </h4>
            <p>Multiple secure payment options for your peace of mind.</p>
          </div>
        </div>

        <div className={styles.benefitCard}>
          <img
            src={supportIcon}
            alt='support icon'
            className={styles.benefitImg}
          />
          <div className={styles.benefitText}>
            <h4>
              24/7 <br />
              Customer Support
            </h4>
            <p>
              Our dedicated support team is always ready to assist you, anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
