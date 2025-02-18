import React from "react";
import RestaurantDonate from "./restaurantDonate";
import RestaurantLayout from "./RestaurantLayout";
import axios from "axios";

function DonationRSide(){

const id =  setUserId();
    
    const donation= async () =>
    {
            
            const codeS = await axios.get(`http://localhost:8080/Donation/findByRestaurantId/${id}`);
            const donationData = codeS.data
            const code = donationData.code
            const locality = donationData.location

    
        }


        const handleComplete = async (event)=>
        {
            event.preventDefault()
            const Handle = await axios.get(`http://localhost:8080/Donation/findByRestaurantId/${id}`);
            const completed = Handle.data;

            let beans = false;

            if (!completed.completed == beans)
                {
                    alert("donation completetd ");
                    navigate('/Home');
                }
        }
    return(
        <div>
        <RestaurantLayout/>




        </div>
    );

} export default DonationRSide;