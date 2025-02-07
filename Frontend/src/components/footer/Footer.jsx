import styles from "./Footer.module.css";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.leftBox}>
        <img src={logo} alt='logo with text driveOn Rent and ride' />
        <label htmlFor='email'>Subscribe to Newsletter</label>
        <div className={styles.emailContainer}>
          <input type='email' placeholder='Email' id='email' />
          <button type='button'>A</button>
        </div>
      </div>
      <div className={styles.rightBox}>
        <div className={styles.links}>
          <p>Quick Links</p>
          <a href='/'>Home</a>
          <a href='/'>About Us</a>
          <a href='/'>Contact</a>
          <a href='/'>Privacy Policy</a>
        </div>

        <div className={styles.links}>
          <p>Follow Us</p>
          <a href='/'>Facebook</a>
          <a href='/'>Instagram</a>
          <a href='/'>Twitter (X)</a>
        </div>

        <div className={styles.links}>
          <p>Contact Us</p>
          <a href='/'>Phone: +1 (123) 456-7890</a>
          <a href='/'>Email: support@vehiclerental.com</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
