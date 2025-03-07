import React, { useEffect, useRef, useState } from "react";
import Layout from "../Components/Layout";
import UserLayout from "../Components/UserLayout";
import RestaurantLayout from "../Components/RestaurantLayout";

function KarimMap () {


    const [categoryFilter, setCategoryFilter] = useState("all");
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const mapRef = useRef(null); // Ref for the map container
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

    // Example locations (replace with actual data)
    const locations = [
        { name: "Shelter A", lat: 51.515, lng: -0.13, type: "shelter" },
        { name: "Restaurant B", lat: 51.520, lng: -0.11, type: "restaurant" },
        { name: "Food Bank C", lat: 51.525, lng: -0.12, type: "foodbank" },
        { name: "Charity D", lat: 51.530, lng: -0.10, type: "charity" }
    ];

    useEffect(() => {
        const loadMap = () => {
            // Initialize the map
            const googleMaps = window.google.maps;
            const mapInstance = new googleMaps.Map(mapRef.current, {
                center: { lat: 51.5074, lng: -0.1278 }, // London
                zoom: 12,
            });
            setMap(mapInstance);

            // Create markers and store them in the state
            const newMarkers = locations.map(location => {
                const marker = new googleMaps.Marker({
                    position: { lat: location.lat, lng: location.lng },
                    map: mapInstance,
                    title: location.name,
                    type: location.type,
                });

                const infoWindow = new googleMaps.InfoWindow({
                    content: `<strong>${location.name}</strong><br>Type: ${location.type}`,
                });

                marker.addListener("click", () => {
                    infoWindow.open(mapInstance, marker);
                });

                return { ...location, marker }; // Return location with marker reference
            });

            setMarkers(newMarkers);
        };

        if (window.google) {
            loadMap(); // If google maps is already loaded, initialize the map
        } else {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyALTuqkqvxEDo-UAiv61dQFAIPe_5qLXvk&callback=initMap`;
            script.async = true;
            script.defer = true;
            window.initMap = loadMap; // Set the callback function
            document.body.appendChild(script); // Append the script to load Google Maps
        }

        // Cleanup function to remove the script when the component is unmounted
        return () => {
            const scriptTag = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
            if (scriptTag) {
                scriptTag.remove();
            }
        };
    }, []);

    const filterMarkers = () => {
        markers.forEach(markerObj => {
            if (categoryFilter === "all" || markerObj.type === categoryFilter) {
                markerObj.marker.setMap(map); // Show the marker
            } else {
                markerObj.marker.setMap(null); // Hide the marker
            }
        });
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
            <div id="controls" style={{ textAlign: "center", marginBottom: "10px" }}>
                <input
                    type="text"
                    placeholder="Search for a location..."
                    style={{ padding: "8px", margin: "5px", width: "200px" }}
                />
                <select
                    id="categoryFilter"
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    style={{ padding: "8px", margin: "5px", width: "200px" }}
                >
                    <option value="all">Show All</option>
                    <option value="shelter">Shelters</option>
                    <option value="restaurant">Restaurants</option>
                    <option value="foodbank">Food Banks</option>
                    <option value="charity">Charities</option>
                </select>
                <button
                    onClick={filterMarkers}
                    style={{ padding: "8px", margin: "5px", cursor: "pointer" }}
                >
                    Apply Filter
                </button>
            </div>

            <div
                ref={mapRef}
                id="map"
                style={{ height: "400px", width: "100%", marginBottom: "10px" }}
            ></div>
        </div>
    );
};

export default KarimMap;
