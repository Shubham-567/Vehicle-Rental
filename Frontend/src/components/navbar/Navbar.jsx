import logo from "../../assets/logo.png";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <img src={logo} className={styles.logo} alt='Company Logo' />

      <div className={styles.navContainer}>
        <ul className={styles.links}>
          <li>Home</li>
          <li>Browse Vehicles</li>
          <li>Contact Us</li>
        </ul>

        <button type='button' className={styles.navbarButton}>
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
