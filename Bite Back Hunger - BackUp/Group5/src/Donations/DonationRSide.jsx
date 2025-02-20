import React from "react";
import RestaurantDonate from "./RestaurantDonate";
import RestaurantLayout from "../Components/RestaurantLayout";
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
            const Handle = await axios.put(`http://localhost:8080/Donation/findByRestaurantId/${id}`);
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
      
            <RestaurantLayout />
            <div style={{ padding: "20px" }}>
                <h2>Donation Details</h2>

               
                <div>
                    <label htmlFor="code">Donation Code:</label>
                    <input
                        id="code"
                        value={donation.code || "N/A"}
                        readOnly
                        style={{ padding: "10px", width: "200px", marginBottom: "10px" }}
                    />
                </div>

                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        id="location"
                        value={donation.location || "N/A"}
                        readOnly
                        style={{ padding: "10px", width: "200px", marginBottom: "20px" }}
                    />
                </div>

                {/* Submit button to complete the donation */}
                <button
                    onClick={handleComplete}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Mark Donation as Completed
                </button>

                {isCompleted && (
                    <div style={{ marginTop: "20px", color: "green" }}>
                        <strong>Donation has been completed!</strong>
                    </div>
                )}
            </div>
        </div>
    );

} export default DonationRSide;