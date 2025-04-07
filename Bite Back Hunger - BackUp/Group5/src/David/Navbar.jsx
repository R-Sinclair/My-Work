import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <Link to="/" className={styles.logo}>
          MyApp
        </Link>
        <button className={styles.hamburger} onClick={toggleMenu}>
          <span
            className={`${styles.hamburgerLine} ${isOpen ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles.hamburgerLine} ${isOpen ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles.hamburgerLine} ${isOpen ? styles.open : ""}`}
          ></span>
        </button>
      </div>
      <div className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
        <Link
          to="/SignInHome"
          className={styles.navLink}
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/AboutUs"
          className={styles.navLink}
          onClick={() => setIsOpen(false)}
        >
          About Us
        </Link>
        <Link
          to="/donations"
          className={styles.navLink}
          onClick={() => setIsOpen(false)}
        >
          Donations
        </Link>
        <Link
          to="/donation"
          className={styles.navLink}
          onClick={() => setIsOpen(false)}
        >
          Donate To Us
        </Link>
        <Link
          to="/campaigns"
          className={styles.navLink}
          onClick={() => setIsOpen(false)}
        >
          Campaign List
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
