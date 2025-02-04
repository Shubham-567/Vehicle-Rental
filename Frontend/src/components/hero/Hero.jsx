import styles from "./Hero.module.css";
import heroImg from "../../assets/hero.png";
import SearchBar from "../Search/SearchBar";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <h1>Find Your Perfect Ride Today</h1>
        <p>
          Browse a variety of rental vehicles at great prices. Select your
          vehicle, location, and dates to get started!
        </p>

        <SearchBar />
      </div>
      <div className={styles.heroImage}>
        <div className={styles.imgBackground}></div>
        <img src={heroImg} alt='orange jeep' />
      </div>
    </section>
  );
};

export default Hero;
