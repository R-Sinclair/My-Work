import React, { useState,useEffect } from 'react';
import './styles.css';
import UserLayout from '../Components/UserLayout';
import RestaurantLayout from '../Components/RestaurantLayout';
import Layout from '../Components/Layout';

function Maps ()  {
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

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyALTuqkqvxEDo-UAiv61dQFAIPe_5qLXvk&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        window.initMap = initMap; // Attach the initMap function to the window object
    }, []);

    let map;
    let markers = [];
    let userLocationMarker = null;

    const locations = [
        { name: "The Trussell Trust – Food Bank", lat: 51.4531, lng: -0.9750, type: "foodbank", address: "1-2 The Triangle, Bristol, BS1 5DJ, UK", googleMapsUrl: "https://www.google.com/maps?q=51.4531,-0.9750" },
        { name: "Hackney Food Bank", lat: 51.5484, lng: -0.0591, type: "foodbank", address: "105-107 Clarence Rd, Hackney, London E5 8EE, UK", googleMapsUrl: "https://www.google.com/maps?q=51.5484,-0.0591" },
        { name: "Crisis Skylight Centre", lat: 51.5166, lng: -0.0711, type: "shelter", address: "66 Commercial St, London E1 6LT, UK", googleMapsUrl: "https://www.google.com/maps?q=51.5166,-0.0711" },
        { name: "The Whitechapel Centre", lat: 51.5156, lng: -0.0676, type: "shelter", address: "211 Whitechapel Rd, London E1 1DU, UK", googleMapsUrl: "https://www.google.com/maps?q=51.5156,-0.0676" },
        { name: "The Salvation Army", lat: 51.4970, lng: -0.0990, type: "charity", address: "101 Newington Causeway, London SE1 6BN, UK", googleMapsUrl: "https://www.google.com/maps?q=51.4970,-0.0990" },
        { name: "London Homeless Shelter", lat: 51.4933, lng: -0.0927, type: "charity", address: "25 London Road, London SE1 6NN, UK", googleMapsUrl: "https://www.google.com/maps?q=51.4933,-0.0927" },
        { name: "Dishoom Shoreditch", lat: 51.5267, lng: -0.0754, type: "restaurant", address: "7 Boundary St, Shoreditch, London E2 7JE, UK", googleMapsUrl: "https://www.google.com/maps?q=51.5267,-0.0754" },
        { name: "The Ledbury", lat: 51.5125, lng: -0.1992, type: "restaurant", address: "127 Ledbury Rd, Notting Hill, London W11 2AQ, UK", googleMapsUrl: "https://www.google.com/maps?q=51.5125,-0.1992" }
    ];

    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 51.5074, lng: -0.1278 },
            zoom: 12,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: true
        });

        locations.forEach((location) => {
            const marker = new google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map: map,
                title: location.name,
                type: location.type,
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `<div class="info-window-content"><strong>${location.name}</strong><br>Address: ${location.address}<br><a href="${location.googleMapsUrl}" target="_blank">Get Directions</a></div>`,
            });

            marker.addListener("click", () => {
                infoWindow.open(map, marker);
            });

            markers.push(marker);
        });
    }

    const filterMarkers = () => {
        const selectedCategory = document.getElementById("categoryFilter").value;
        markers.forEach(marker => {
            if (selectedCategory === "all" || marker.type === selectedCategory) {
                marker.setMap(map);
            } else {
                marker.setMap(null);
            }
        });
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const userLocation = new google.maps.LatLng(userLat, userLng);

                if (userLocationMarker) {
                    userLocationMarker.setMap(null);
                }

                userLocationMarker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "Your Location",
                });

                map.setCenter(userLocation);
                map.setZoom(14);
            }, () => {
                alert("Geolocation service failed.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div>
        {signInUser ? (
                          <UserLayout />
                        ) : signInRestaurant ? (
                          <RestaurantLayout />
                        ) : (
                          <Layout />
                        )}
            <div id="controls" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <input type="text" id="searchBox" placeholder="Search for a location..." style={{ padding: '10px', margin: '10px', width: '250px', fontSize: '16px', borderRadius: '5px', border: '1px solid #888' }} />
                <select id="categoryFilter" style={{ padding: '10px', margin: '10px', width: '250px', fontSize: '16px', borderRadius: '5px', border: '1px solid #888' }}>
                    <option value="all">Show All</option>
                    <option value="shelter">Shelters</option>
                    <option value="restaurant">Restaurants</option>
                    <option value="foodbank">Food Banks</option>
                    <option value="charity">Charities</option>
                </select>
                <button onClick={filterMarkers} style={{ padding: '10px 20px', margin: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Apply Filter
                </button>
                <button onClick={getUserLocation} style={{ padding: '10px 20px', margin: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Use My Location
                </button>
            </div>

       
            <div id="map" style={{ height: '500px', width: '100%', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', margin: '20px auto', maxWidth: '1000px' }}></div>
        </div>
    );
};

export default Maps;
