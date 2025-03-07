import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import UserLayout from "../Components/UserLayout";
import RestaurantLayout from "../Components/RestaurantLayout";


function Charities(){

     const [signInUser, setSignInUser] = useState("");
        const [signInRestaurant, setSignInRestaurant] = useState("");
      
        const fetchSignedInUser = () => {
          const UI = sessionStorage.getItem("userEmail");
          setSignInUser(UI);
        };
      
        const fetchSignedInRestaurant = () => {
          const RI = sessionStorage.getItem("restaurantEmail");
          setSignInRestaurant(RI);
        };
      
        useEffect(() => {
          fetchSignedInUser();
          fetchSignedInRestaurant();
        }, []);
 const Data = [
    { 
        name: "The Felix Project", 
        category: "Foodbank", 
        info: "Collects surplus food from food industry and delivers it to over 900 charities and schools across London, fights hunger and reduces food waste.", 
        donation: "https://thefelixproject.org/" 
    },
    { 
        name: "Hammersmith and Fulham Foodbank", 
        category: "Foodbank", 
        info: "Provides emergency food parcels to individuals/families in crisis while offering additional help, such as debt advice and referrals to local services.", 
        donation: "https://hammersmithfulham.foodbank.org.uk/" 
    },
    { 
        name: "City Harvest", 
        category: "Foodbank", 
        info: "Collects food from restaurants, supermarkets and farms and then distributes it to charities, soup kitchens and shelters across London.", 
        donation: "https://www.cityharvest.org.uk/donate" 
    },
    { 
        name: "British Red Cross", 
        category: "Charity", 
        info: "Provides crisis relief in the UK and abroad, including emergency food supplies, refugee support and run services that help people who struggle with housing and healthcare.", 
        donation: "https://donate.redcross.org.uk/appeal/donate" 
    },
    { 
        name: "Westminster Chapel Foodbank", 
        category: "Foodbank", 
        info: "Runs community foodbank, where struggling individuals/families in Westminster can receive food and supplies.", 
        donation: "https://westminsterchapel.org.uk/foodbank/" 
    },
    { 
        name: "The Big Give", 
        category: "Charity", 
        info: "Donation platform that matches donations to maximise their impact. Funds charities focused on poverty, food security, education and emergency relief.", 
        donation: "https://donate.thebiggive.org.uk/" 
    },
    { 
        name: "Pecan", 
        category: "Foodbank", 
        info: "Part of Trussel Trust, foodbank provides emergency food and advice to people in Southwark that experience financial difficulties or sudden crises.", 
        donation: "https://www.pecan.org.uk/donate" 
    },
    { 
        name: "Trussel Trust", 
        category: "Foodbank", 
        info: "Nationwide network of foodbanks that supports people struggling with poverty, by providing emergency food parcels, financial advice and advocacy to help people out of long-term food insecurity.", 
        donation: "https://www.trusselltrust.org/make-a-donation/" 
    },
    { 
        name: "Salvation Army", 
        category: "Foodbank/Shelter", 
        info: "Offers food parcels, shelters and addiction recovery programs across the UK. They run community hubs that provide meals, job training and support for people experiencing homelessness.", 
        donation: "https://www.salvationarmy.org.uk/donate" 
    }
 ];

    const [searchTerm, setSearchTerm] = useState("");
    
    const filtered = Data.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>  {signInUser ? (
                  <UserLayout />
                ) : signInRestaurant ? (
                  <RestaurantLayout />
                ) : (
                  <Layout />
                )}
        <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px", backgroundColor: "white", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <h1 style={{ textAlign: "center" }}>London Charities & Foodbanks</h1>
            <input 
                type="text" 
                placeholder="Search charities or foodbanks..." 
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }} 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div>
                {filtered.map(item => (
                    <div key={item.name} style={{ padding: "15px", backgroundColor: "#fff", marginBottom: "10px", borderLeft: "5px solid #007BFF" }}>
                        <strong>{item.name}</strong><br />
                        {item.category} - {item.info}<br />
                        <a href={item.donation} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: "5px", color: "#007BFF", textDecoration: "none" }}>Donate Here</a>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}; export default Charities;
