import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserLayout from '../Components/UserLayout';
import axios from 'axios';
import RestaurantLayout from '../Components/RestaurantLayout';

function DonationRSide() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const donationName = queryParams.get('donationName');
    const locations = queryParams.get('location');
    const code = queryParams.get('code');
    const donationId = queryParams.get('id');

    




    return (
        <div>
            <RestaurantLayout />
            {donationName && locations && code ? (
                <div>
                    <h1>Donation Details for {donationName}</h1>
                    <ul>
                        <li><strong>Donation Name:</strong> {donationName}{}</li>
                        <li><strong>Location:</strong> {locations} {donationId}</li>
                        <li><strong>Donation Code:</strong> {code}</li>
                    </ul>
                </div>
            ) : (
                <p>No donation details available.</p>
            )}

            <button type="submit">
                Submit
            </button>
        </div>
    );
}

export default DonationRSide;
