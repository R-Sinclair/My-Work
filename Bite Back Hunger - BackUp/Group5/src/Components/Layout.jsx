import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Layout() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.authButtons}>
        <Link to='/Sign_Up' style={styles.authButton}>Sign Up</Link>
        <Link to='/Login' style={styles.authButton}>Login</Link>
      </div>
      <Link to='/Home' style={styles.navLink}>Home</Link>
      <div 
        style={styles.dropdown}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
      >
        <a href="#" style={styles.dropbtn}>Support Us</a>
        
        {isDropdownOpen && (
          <div style={styles.dropdownContent}>
            <a href="#donate-food" style={styles.dropdownItem}>Donate Food</a>
            <a href="#donate-money" style={styles.dropdownItem}>Donate Money</a>
          </div>
        )}
      </div>
      <a href="#news" style={styles.navLink}>News</a>
      <a href="#find-shelters" style={styles.navLink}>Find Shelters</a>
      <input type="text" style={styles.searchBar} placeholder="Search..." />
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    flexWrap: "wrap", 
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "lightgreen",
  },
  authButtons: {
    display: "flex",
    gap: "10px",
  },
  authButton: {
    backgroundColor: "darkgreen",
    color: "white",
    padding: "10px 15px",
    borderRadius: "10px",
    textDecoration: "none",
  },
  dropdown: {
    position: "relative",
    display: "inline-block",
  },
  dropbtn: {

    color: "black",
    padding: "10px 15px",
    borderRadius: "10px",
    textDecoration: "none",
    cursor: "pointer",
  },
  dropdownContent: {
    position: "absolute",
    backgroundColor: "white",
    minWidth: "160px",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    zIndex: "1",
    display: "block", 
  },
  dropdownItem: {
    color: "black",
    padding: "12px 16px",
    textDecoration: "none",
    display: "block",
  },
  navLink: {
    padding: "10px 15px",
    textDecoration: "none",
    color: "black", 
    fontSize: "16px",
  },
  searchBar: {
    padding: "8px",
    width: "200px",
    maxWidth: "300px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
};