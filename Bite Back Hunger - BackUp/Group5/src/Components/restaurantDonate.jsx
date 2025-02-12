import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import RestaurantLayout from './RestaurantLayout';
import './RestaurantDonate.css';  
import axios from "axios";

function RestaurantDonate() {
    const donateRef = useRef();
    const locationRef = useRef();
    const emailRef = useRef();
    const [isChecked, setIsChecked] = useState(false);  // State to manage checkbox status
    const [isSubmitted, setIsSubmitted] = useState(false);  // State to track if form is submitted
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const empty = "";

    const [formData, setFormData] = useState({
        Donate:false,
        email:'',
        location:'',
        
    })
  

    const navigate = useNavigate();  

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true); 

        if (!donateRef.current.checked) {
            alert("You must click here to donate");
            return;
        }

        if (locationRef.current.value === empty) {
            alert("Please add a location");
            return;
        }
        if (emailRef.current.length == 0|| !formData.email.match(mailformat)) {
            alert("Please add an email and make sure it's correct");
            return;
        }

 
        

        try {
            const response = await axios.get('http://localhost:8080/h2-console/Restaurant/user/id{email}');
            const restaurantData = response.data; // assuming the response contains the restaurant data
            const restaurantId = restaurantData.id;  // Use the correct field for the restaurant ID

            
            const donationId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
            const code = Math.floor(Math.random() * (99 - 10 + 1)) + 10;

            const dataToSend = {
                restaurantId,
                donationId,
                code,
                location: location,
                userId: null, 
            };

            const responsePost = await axios.post('http://localhost:8080/h2-console/Donations/AddDonations', dataToSend);
            
            if (responsePost.status === 201) {
                alert("Registered successfully.");
                
                
                navigate('/Home');  
            }
            setFormData(() =>({
                Donate:false,
                email:'',
                location:'',
            }))

        } catch (error) {
            console.error(error);
            alert("There was an error with the donation process.");
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked(donateRef.current.checked);  // Update state based on checkbox status
    };

    return (
        <div>
            <RestaurantLayout />
            <div className="donate-container">
                <div className="donate-form-container">
                    <form onSubmit={handleSubmit} className="donate-form">
                        <div className="donateCheckbox">
                            <input
                                type="checkbox"
                                ref={donateRef}
                                name = "donate"
                                className="donate-checkbox-input"
                                onChange={handleCheckboxChange} // Handle checkbox change
                            />
                            <label className="text-lg text-gray-700">
                                <a target="_blank" rel="noopener noreferrer">
                                    Do You want to donate
                                </a>
                            </label>
                        </div>

                        {isChecked && (
                            <div>
                                <label htmlFor="email" className="email">email:</label>
                                <input
                                    name="email"
                                    type="email"
                                    id="location"
                                    ref={locationRef}
                                    required
                                    className="donate-location-input"
                                    placeholder="Search..."
                                />
           
                                <label htmlFor="Location" className="donate-location-label">Location of foodbank/charity:</label>
                                <input
                                    name="location"
                                    type="text"
                                    id="location"
                                    ref={locationRef}
                                    required
                                    className="donate-location-input"
                                    placeholder="Search..."
                                />
                            </div>
                        )}
                        {isSubmitted ? (
                        <button type="submit" disabled className="donate-button">
                            Submitting...
                        </button>
                    ) : (
                        <button type="submit" className="donate-button">
                            Submit
                        </button>
                    )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RestaurantDonate;
