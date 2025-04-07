import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DonationUSide.css';
import axios from 'axios';
import UserLayout from '../Components/UserLayout';
import { toast } from "react-toastify";

function DonationUSide() {
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
  const Uid = sessionStorage.getItem("idUser");
  const FCname = localStorage.getItem("F/Cname");

  

  const HandleSubmit = async () => {

    const get = await axios.get(`http://localhost:8080/Donations/findByDonationId/${donationId}`);
    const response = get.data;
    const dI = response.donationId;
    const RI = response.restaurantId;
    const CO = response.code;
    const LO = response.location;
    const NA = response.name;
    

   


  
   
  const deletes = await  axios.delete(`http://localhost:8080/Donations/delete/${donationId}`)
        const dataToSend = {
            donationId: dI,
            restaurantId: RI,
            code: CO,
            location: LO,
            userId: Uid,
            completedTask: 'COMPLETEDTASK',
            name: NA
        };
        const pos = await axios.post('http://localhost:8080/Donations/AddDonations', dataToSend);
        localStorage.setItem("move","true");


        const emailData = {
            toEmail: sessionStorage.getItem("userEmail"),
            subject: "Donation completed",
            text: "Thank you for assisting the donation from "+donationName+" to "+FCname+". We hope you continue to donate or assist and have a great day! DonationID: "+donationId,
          };
           axios.post('http://localhost:8080/email/send', emailData)
           toast.success("✅ Donation completed");
           setTimeout(() => navigate("/SignInHome"), 1500);

  }


  useEffect(() => {
    const check = localStorage.getItem('move');
    if (check === 'true') {
      toast.success('Donation has been delivered');
      navigate('/SignInHome');
      localStorage.clear();
    }
  }, [navigate]);

  useEffect(() => {
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

      setMap(mapInstance); // Store map instance to prevent re-initialization
    }
  };

  // Load the Google Maps API script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyALTuqkqvxEDo-UAiv61dQFAIPe_5qLXvk&libraries=places`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); 
    };
  }, []);

  return (
    <div>
      <UserLayout />
      {donationName && locations && code ? (
        <div>
          <h1>Donation Details for {donationName}</h1>
          <ul>
            <li><strong>Restaurant Name:</strong> {donationName}</li>
            <li><strong>Foodbank/Charity name:</strong> {FCname}</li>
            <li><strong>DonationID:</strong> {donationId}</li>
            <li><strong>Location:</strong> {locations}</li>
            <li><strong>Donation Code:</strong> {code}</li>
          </ul>
        </div>
      ) : (
        <p>No donation details available.</p>
      )}

      {/* Map container */}
      <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
    <button onClick={HandleSubmit} type="button">
                Submit
            </button>
            </div>

    </div>
  );
}

export default DonationUSide;
