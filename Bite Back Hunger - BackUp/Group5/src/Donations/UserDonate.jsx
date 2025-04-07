import React, { useState, useEffect } from 'react';
import UserLayout from "../Components/UserLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import './UserDonate.css';

export default function UserDonate() {
   const [donations, setDonations] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   

   useEffect(() => {
    const fetchDonations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Donations/AllDonations');
            const allDonations = response.data;
            
            setDonations(allDonations);
            setIsLoading(false);

        } catch (error) {
            setError("An error occurred while fetching donations.");
            setIsLoading(false);
        }
    };

    fetchDonations();
   }, []);

   const donationsGroupedByName = donations.reduce((acc, donation) => {
     const { name , completedTask, } = donation;
     if (!acc[name]) {
       acc[name] = [];
     }
     acc[name].push(donation);

     if (completedTask === 'COMPLETEDTASK') {
        acc[name] = acc[name].filter(d => d !== donation);
     }
     return acc;
   }, {});

   return (
        <div>
            <UserLayout />
            <h1>Donations from Restaurants</h1>
            {isLoading ? (
                <p>Loading donations...</p>
            ) : donations.length === 0 ? (
                <h2>No donations at the moment</h2>
            ) : (
                <div>
                    {Object.keys(donationsGroupedByName).map((restaurantName) => (
                        <div key={restaurantName}>
                            <h2>
                              
                                  Donations from {restaurantName}
                             
                            </h2>
                            {donationsGroupedByName[restaurantName].map((donation, index) => (
                                <div key={index}>
                                    <ul>
                                        <li>
                                            <strong>Drop Off Location:</strong> {donation.location} <br />
                                            <strong>status:</strong> {donation.completedTask} <br />
                                            <Link
                                              to={`/DonationUSide?donationName=${donation.name}&location=${donation.location}&pickUp=${donation.pickUp}&code=${donation.code}&id=${donation.donationId}`}
                                            >
                                              View Details
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
