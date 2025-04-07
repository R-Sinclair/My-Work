import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function UserLayout() {
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
      sessionStorage.removeItem("idUser");
      sessionStorage.removeItem("userEmail");
      navigate('/Home');
    };

  return (
    <div style={styles.navbar}>
      
      <Link to='/SignInHome' style={styles.navLink}>Home</Link>
      
      <Link to='/AboutUs' style={styles.navLink}>About Us</Link>
      <Link to='/Reward' style={styles.navLink}>rewards</Link>
       <Link to='/Charities' style={styles.navLink}>Charities/Foodbanks</Link>
      <Link to='/UserDonate' style={styles.navLink}>Donate Assist</Link>
       <Link to='/Map' style={styles.navLink}>Shelter Locations & more</Link>
             <Link to='/Profile' style={styles.navLink}>Profile</Link>
              <Link to='/donation' style={styles.navLink}>CrowdFund</Link>
       
    
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

  }
};