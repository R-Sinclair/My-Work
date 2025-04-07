import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RestaurantLayout from '../Components/RestaurantLayout';
import './DonationRSide.css';
import axios from 'axios';


function DonationRSide() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const donationName = queryParams.get('donationName');
  const locations = queryParams.get('location');
  const code = queryParams.get('code');
  const donationId = queryParams.get('id');
  const [address, setAddress] = useState(locations); 
  const [error, setError] = useState(null); 
  const mapRef = useRef(null); 
  const [map, setMap] = useState(null); 
  const FCname = localStorage.getItem("F/Cname");


  useEffect( () => {
    const check = localStorage.getItem('move');
    if (check === 'true') {
        const emailData = {
            toEmail: sessionStorage.getItem("restaurantEmail"),
            subject: "Donation completed",
            text: "thank you for donating to "+FCname+" We hope you continue to donate and have a great day! DonationID: "+donationId,
          };
          axios.post('http://localhost:8080/email/send', emailData)
      alert('Donation has been delivered call the foodbank to verify successful dropoff');
      navigate('/SignInHome');
      localStorage.clear();
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch the address if it exists in the URL (via Geocoding API)
    if (locations) {
      const apiKey = 'AIzaSyALTuqkqvxEDo-UAiv61dQFAIPe_5qLXvk'; // Replace with your actual API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locations)}&key=${apiKey}`;

      const fetchLocation = async () => {
        try {
          const response = await axios.get(url);
          const data = response.data;

          if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            setError(null); 
            initMap(location); // Initialize the map with the location
          } else {
            setError('Address not found or invalid.');
          }
        } catch (err) {
          setError('Error occurred while searching for the address.');
        }
      };

      fetchLocation();
    }
  }, [locations]);

  // Initialize the map when the coordinates are received
  const initMap = (location) => {
    if (mapRef.current && !map) {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
      });

      // Place a marker at the address
      new window.google.maps.Marker({
        position: location,
        map: mapInstance,
        title: address,
      });

      setMap(mapInstance); 
    }
  };

  // Load the Google Maps API script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyALTuqkqvxEDo-UAiv61dQFAIPe_5qLXvk&libraries=places`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // Cleanup script when the component is unmounted
    };
  }, []);

  return (
    <div>
      <RestaurantLayout />
      {donationName && locations && code ? (
        <div>
          <h1>Donation Details for {donationName}</h1>
          <ul>
            <li><strong>Restaurant Name:</strong> {donationName}</li>
            <li><strong>Foodbank/Charity name:</strong> {FCname}</li>
            <li><strong>DonationID:</strong> {donationId}</li>
            <li><strong>Location:</strong> {locations}</li>
            <li><strong>Donation Code:</strong> {code}</li>
            <li>make sure to ask for the donation code before giving the order and confirm it matches the user {}</li>
          </ul>
        </div>
      ) : (
        <p>No donation details available.</p>
      )}

      <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default DonationRSide;
