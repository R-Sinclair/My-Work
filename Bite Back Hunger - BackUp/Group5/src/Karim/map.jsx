import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import UserLayout from '../Components/UserLayout';
import RestaurantLayout from '../Components/RestaurantLayout';
import Layout from '../Components/Layout';

function Maps() {
    const [signInUser, setSignInUser] = useState("");
    const [signInRestaurant, setSignInRestaurant] = useState("");
    const [locations, setLocations] = useState([]); // State to store locations data
    const [markers, setMarkers] = useState([]); // State to store map markers
    const [mapInstance, setMapInstance] = useState(null); // Store the Google Map instance

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
        // Fetch locations data from the backend
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost:8080/locations/all');
                console.log('API Response:', response.data); // Log the response
                const parsedLocations = response.data.map((loc) => {
                    const [lat, lng] = loc.location.split(',').map(Number); // Split and parse lat/lng
                    return {
                        ...loc,
                        lat,
                        lng,
                    };
                });
                setLocations(parsedLocations); // Set the parsed data to the state
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyALTuqkqvxEDo-UAiv61dQFAIPe_5qLXvk&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        window.initMap = initMap; // Attach the initMap function to the window object
    }, [locations]); // Re-run when locations change

    const initMap = () => {
        const newMap = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 51.5074, lng: -0.1278 }, // Default center (London)
            zoom: 12,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: true,
        });

        setMapInstance(newMap); // Store the map instance

        // Add markers to the map
        const newMarkers = locations.map((location) => {
            const marker = new google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map: newMap, // Use newMap instead of map
                title: location.name, // Use name for the marker title
                type: location.type,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red dot marker
                },
            });

            // Add info window
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div class="info-window-content">
                        <strong>${location.name}</strong><br>
                        Type: ${location.type}<br>
                        <a href="https://www.google.com/maps?q=${location.lat},${location.lng}" target="_blank" style="color: blue; text-decoration: underline;">
                            Get Directions
                        </a>
                    </div>
                `,
            });

            marker.addListener("click", () => {
                infoWindow.open(newMap, marker);
            });

            return marker;
        });

        setMarkers(newMarkers); // Save markers to state
    };

    const filterMarkers = () => {
        const selectedCategory = document.getElementById("categoryFilter").value;

        markers.forEach(marker => {
            if (selectedCategory === "all" || marker.type === selectedCategory) {
                marker.setMap(mapInstance); // Use mapInstance
            } else {
                marker.setMap(null); // Hide the marker
            }
        });
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const userLocation = new google.maps.LatLng(userLat, userLng);

                const userLocationMarker = new google.maps.Marker({
                    position: userLocation,
                    map: mapInstance, // Use mapInstance
                    title: "Your Location",
                });

                mapInstance.setCenter(userLocation);
                mapInstance.setZoom(14);
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

            {/* Table to display locations */}
            <div style={{ margin: '20px auto', maxWidth: '1000px' }}>
                <h2>Locations Table</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Type</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Coordinates</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map((location, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{location.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{location.type}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{location.lat}, {location.lng}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Maps;
