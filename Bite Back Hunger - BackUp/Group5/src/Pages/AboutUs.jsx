import { useEffect, useState } from "react";
import UserLayout from "../Components/UserLayout";
import RestaurantLayout from "../Components/RestaurantLayout";
import Layout from "../Components/Layout";

const AboutUs = () => { 
  const missionText = "Bite Back Hunger is dedicated to tackling food insecurity in London by connecting local food banks, charities, and businesses to ensure that those in need have access to nutritious meals.";
  const [signInUser, setSignInUser] = useState("");
  const [signInRestaurant, setSignInRestaurant] = useState("");


  const fetchSignedInUser = async () => {
    const UI = sessionStorage.getItem("userEmail");
    setSignInUser(UI);
  };

  const fetchSignedInRestaurant = async () => {
    const RI = sessionStorage.getItem("restaurantEmail");
    setSignInRestaurant(RI);
  };

  

  useEffect(() => {
    fetchSignedInUser();
    fetchSignedInRestaurant();
  }, []);

  return (
    <div>
     {signInUser ? (
              <UserLayout />
            ) : signInRestaurant ? (
              <RestaurantLayout />
            ) : (
              <Layout />
            )}
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundImage: "url('https://source.unsplash.com/1600x900/?food,poverty')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          color: "#2e7d32",
          fontWeight: "bold",
          fontSize: "36px",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1 style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "10px 20px", borderRadius: "8px" }}>We Work for Hunger Relief</h1>
      </div>
      
      <div style={{ width: "80%", padding: "40px", marginTop: "-30px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", textAlign: "center" }}>
        <h2 style={{ color: "#2e7d32", fontSize: "26px", fontWeight: "bold" }}>We are dedicated to ending food insecurity</h2>
        <p style={{ color: "black", fontSize: "18px", lineHeight: "1.6" }}>{missionText}</p>
      </div>

      <div style={{ width: "80%", display: "flex", justifyContent: "space-between", marginTop: "30px", gap: "20px" }}>
        <div style={{ flex: 1, backgroundColor: "#A5D6A7", padding: "25px", borderRadius: "12px", textAlign: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <h3 style={{ fontSize: "22px", fontWeight: "bold", color: "white", marginBottom: "10px" }}>Our Mission</h3>
          <p style={{ color: "black", fontSize: "17px", lineHeight: "1.5" }}>
            We provide access to nutritious meals for those in need through partnerships with local food banks, shelters, and businesses.
          </p>
        </div>
        <div style={{ flex: 1, backgroundColor: "#A5D6A7", padding: "25px", borderRadius: "12px", textAlign: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <h3 style={{ fontSize: "22px", fontWeight: "bold", color: "white", marginBottom: "10px" }}>Our Vision</h3>
          <p style={{ color: "black", fontSize: "17px", lineHeight: "1.5" }}>
            We envision a future where no one in London suffers from food insecurity, and communities come together to support one another.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
