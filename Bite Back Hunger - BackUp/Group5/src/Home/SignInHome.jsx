import { useState, useEffect } from "react";
import React from "react";
import Layout from "../Components/Layout";
import UserLayout from "../Components/UserLayout";
import RestaurantLayout from "../Components/RestaurantLayout";
import './Home.css'
import donateFoodMap from './donate-food-map.jpg';
import shelters from './shelters.jpg';
import foodInsecurity from './food-insecurity.webp';
import foodBank from './food-bank.jpg';
import twitterIcon from './twitter.png';
import facebookIcon from './facebook.jpg';
import instaIcon from './insta.jpg';
import linkedinIcon from './linkedin.webp';
import axios from "axios";

function SignInHome() {
    const [signInUser, setSignInUser] = useState("");
    const [signInRestaurant, setSignInRestaurant] = useState("");
    const [name, setName] = useState("");
  //register email
    const fetchSignedInUser = async () => {
      const UI = sessionStorage.getItem("userEmail");
      const N = await axios.get(`http://localhost:8080/NormalUsers/findByEmail/${UI}`)
      const Data = N.data
      const got = Data.name
      setName(got);
      setSignInUser(UI);
    };
  
    const fetchSignedInRestaurant = async () => {
      const RI = sessionStorage.getItem("restaurantEmail");
      const N = await axios.get(`http://localhost:8080/Restaurant/email/${RI}`)
      const Data = N.data
      const got = Data.name
      setName(got);
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
        <div>
         <h1>

          Welcome back {name}
         </h1>

        </div>
  
        <div className="container">
          <h1>Help Fight Food Insecurity</h1>
          <p>Donate food, contribute money, or find shelters and assistance in your area.</p>
        </div>
  
    
      <div className="section" id="donate-food">
        <h2>Donate Food</h2>
        <p>Your food donations help families in need. Find your nearest drop-off location.</p>
        <a href="https://www.trusselltrust.org/get-help/find-a-foodbank/" target="_blank">
          <button>Find a Location</button>
        </a>
        <div className="map-container">
          <a href="https://www.google.co.uk/maps/search/food+shelters+london/@51.5404774,-0.2576094,11z?entry=ttu&g_ep=EgoyMDI1MDEyOC4wIKXMDSoASAFQAw%3D%3D" target="_blank">
            <img src={donateFoodMap} alt="Food Bank Map" />
          </a>
        </div>
      </div>

      <div className="section" id="donate-money">
        <h2>Make a Donation</h2>
        <div className="donation-options">
          <button>£25</button>
          <button>£50</button>
          <button>£100</button>
        </div>
        <p>Enter other amount</p>
        <input type="text" placeholder="£ Enter other amount" />
        <br />
        <button>Donate Now</button>
      </div>

      <div className="section" id="find-shelters">
        <h2>Find Shelters</h2>
        <p>Locate shelters and support centers in your area for assistance.</p>
        <a href="https://www.homeless.org.uk/search-homelessness-services" target="_blank">
          <button>Find a Shelter</button>
        </a>
        <div className="map-container">
          <a href="https://www.google.com/maps/search/homeless+shelters+near+me/" target="_blank">
            <img src={shelters} alt="Shelter Map" />
          </a>
        </div>
      </div>

      <div className="section" id="news">
        <h2 style={{ color: 'black' }}>Latest News</h2>
        <div className="news-container">
          <div className="news-item">
            <a href="https://geographical.co.uk/news/where-is-food-insecurity-worst-in-the-world" target="_blank">
              <img src={foodInsecurity} alt="News Image" />
            </a>
            <a href="https://geographical.co.uk/news/where-is-food-insecurity-worst-in-the-world" target="_blank">Latest on Food Insecurity</a>
            <p>Stay updated on how food insecurity is impacting communities worldwide.</p>
          </div>
          <div className="news-item">
            <a href="https://www.citizensadvice.org.uk/debt-and-money/food-bank/using-a-food-bank/#:~:text=The%20food%20bank%20will%20give,toiletries%2C%20like%20toothpaste%20or%20deodorant." target="_blank">
              <img src={foodBank} alt="News Image" />
            </a>
            <a href="https://www.citizensadvice.org.uk/debt-and-money/food-bank/using-a-food-bank/#:~:text=The%20food%20bank%20will%20give,toiletries%2C%20like%20toothpaste%20or%20deodorant." target="_blank">Food Banks and Support</a>
            <p>Learn about how food banks are supporting individuals and families in need.</p>
          </div>
        </div>
      </div>

      <div className="section" id="contact-us">
        <h2>Contact Us</h2>
        <p>Have any questions or need support? Reach out to us.</p>
        <p>Email: support@bitebackhunger.org</p>
        <p>Phone: +123 456 7890</p>
      </div>

      <div className="footer">
        <h3>Quick Links:</h3>
        <div className="quick-links">
          <a href="https://www.trussell.org.uk/emergency-food" className="quick-button" style={{ background: 'green', color: 'white', padding: '10px 20px', borderRadius: '20px', textDecoration: 'none' }}>Get emergency food</a>
          <a href="#donate-money" className="quick-button" style={{ background: 'orange', color: 'white', padding: '10px 20px', borderRadius: '20px', textDecoration: 'none' }}>£ Donate</a>
          <a href="#donate-food" className="quick-button" style={{ border: '2px solid green', color: 'black', padding: '10px 20px', borderRadius: '20px', textDecoration: 'none' }}>Donate food</a>
        </div>
        <h3>Follow Us:</h3>
        <div className="social-links">
          <a href="https://twitter.com" target="_blank"><img src={twitterIcon} alt="Twitter" width="30px" height="30px" /></a>
          <a href="https://facebook.com" target="_blank"><img src={facebookIcon} alt="Facebook" width="30px" height="30px" /></a>
          <a href="https://instagram.com" target="_blank"><img src={instaIcon} alt="Instagram" width="30px" height="30px" /></a>
          <a href="https://linkedin.com" target="_blank"><img src={linkedinIcon} alt="LinkedIn" width="30px" height="30px" /></a>
        </div>
      </div>
    </div>
  );
}

export default SignInHome;
