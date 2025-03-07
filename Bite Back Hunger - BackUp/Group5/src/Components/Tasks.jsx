import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
function Tasks (){

  const [address, setAddress] = useState(''); // Address input state
  const [error, setError] = useState(null); // Error state for feedback
  const mapRef = useRef(null); // Reference for the map container
  const [map, setMap] = useState(null); // State to store map instance

  // Handle search when the button is clicked
  const emailData = {
    toEmail:"reuben.sinclair11@gmail.com",
    subject:"Hey",
    text:"hey"+3445
  };

  const HandleSubmit = axios.post(`http://localhost:8080/email/send`, emailData)
  const handleSearch = async () => {
    const apiKey = 'AIzaSyALTuqkqvxEDo-UAiv61dQFAIPe_5qLXvk'; // Replace with your actual Google Maps API Key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        setError(null); // Clear error
        initMap(location); // Initialize the map with the location
      } else {
        setError('Address not found or invalid.');
      }
    } catch (err) {
      setError('Error occurred while searching for the address.');
    }
  };

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
    script.onload = () => {
      if (address) {
        handleSearch(); // Automatically search if an address is already set
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // Cleanup script when the component is unmounted
    };
  }, [address]);

  return (
    <div>
      <h1>Search for Address on Map</h1>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>


      <button onClick={HandleSubmit}>Button</button>
    </div>

  
  );
};

export default Tasks;
