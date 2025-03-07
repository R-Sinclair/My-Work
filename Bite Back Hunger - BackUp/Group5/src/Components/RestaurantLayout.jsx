import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RestaurantLayout() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const signOut = ()  =>
    {
      sessionStorage.removeItem("restaurantEmail");
      sessionStorage.removeItem("restaurantId");
      navigate('/Home');
    };

  return (
    <div style={styles.navbar}>
      
      <Link to='/SignInHome' style={styles.navLink}>Home</Link>
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
       <Link to='/Report' style={styles.navLink}>Report user</Link>
        <Link to='/Charities' style={styles.navLink}>Charities/Foodbanks</Link>
      <Link to='/RestaurantDonate' style={styles.navLink}>Donate</Link>
      <Link to='/Map' style={styles.navLink}>Shelter Locations & more</Link>
      <input type="text" style={styles.searchBar} placeholder="Search..." />
<div>
<u
onClick={signOut}
style={styles.signOut}
>Sign out</u>
</div>
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

  signOut:{
    color: "blue",
    cursor: "pointer",
    fontSize:"12px",
    padding: "10px 20px",
    position: "relative"

  },
};