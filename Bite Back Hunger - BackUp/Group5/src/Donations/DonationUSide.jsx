import React, { useState, useEffect } from 'react';
import { Await, useLocation, useNavigate } from 'react-router-dom';
import UserLayout from '../Components/UserLayout';
import axios from 'axios';

function DonationUSide() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const donationName = queryParams.get('donationName');
    const locations = queryParams.get('location');
    const code = queryParams.get('code');
    const donationId = parseInt(queryParams.get('id'), 10);

    const Uid = sessionStorage.getItem("idUser");


   

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
                const pos = await axios.post('http://localhost:8080/Donations/AddDonations', dataToSend);// once report page made post to that database
                alert('Donation completed');
                navigate('/UserDonate');
            
            
            
     


            
        
            
    };

    return (
        <div>
            <UserLayout />
            {donationName && locations && code ? (
                <div>
                    <h1>Donation Details for {donationName}</h1>
                    <ul>
                        <li><strong>Donation Name:</strong> {donationName}{}</li>
                        <li><strong>Location:</strong> {locations} </li>
                        <li><strong>Donation Code:</strong> {code}</li>
                    </ul>
                </div>
            ) : (
                <p>No donation details available.</p>
            )}

            <button onClick={HandleSubmit} type="button">
                Submit
            </button>

         
        </div>
    );
}

export default DonationUSide;
