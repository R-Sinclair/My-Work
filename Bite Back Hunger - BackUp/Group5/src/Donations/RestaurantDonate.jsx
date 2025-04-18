import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import RestaurantLayout from '../Components/RestaurantLayout';
import './RestaurantDonate.css';  
import axios from 'axios';
import React from 'react';
import { toast } from "react-toastify";

function RestaurantDonate() {
    const donateRef = useRef();
    const locationRef = useRef();
    const emailRef = useRef();
    const cityRef = useRef();
    const nameRef = useRef();
    const postCodeRef = useRef();
    const pickUpLocRef = useRef();
    const pickUpLocCity = useRef();
    const pickUpLocSC = useRef();
    const [isChecked, setIsChecked] = useState(false);  
    const [isSubmitted, setIsSubmitted] = useState(false);  
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const [userId, setUserId] = useState(false);

    const [formData, setFormData] = useState({
                    email: '',
                    name:'',
                    location: '',
                    city: '',
                    postCode:'',
                    pickUp:'',
                    pickUpCity:'',
                    pickUpPC:'',

            
    });


  

    const navigate = useNavigate();  
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true); 
        const email = emailRef.current.value

        if (!donateRef.current.checked) {
            alert("You must click here to donate");
        }

       else if (formData.location === '') {
            alert("Please add a location");
        }
        else if (formData.name === '') {
            alert("Please add the name of the charity/foodbank");
            return;
        }

        else if (formData.city === '') {
            alert("Please add a city");
        
        }
        else if (formData.postCode === '') {
            alert("Please add a post code");
            
        }

       else if (email.length === 0 || !email.match(mailformat)) {
            alert("Please add an email and make sure it's correct");
            
        }
        else if (formData.pickUp === '') {
            alert("Please add a location");
        }
       
        else if (formData.pickUpCity === '') {
            alert("Please add a city");
        
        }
        else if (formData.pickUpPC === '') {
            alert("Please add a post code");
            
        }


            try {

                
              
                const response = await axios.get(`http://localhost:8080/Restaurant/email/${email}`);
                const restaurantId = response.data
                const id = restaurantId.id
                const name = restaurantId.name

                setUserId(id);
               

                const DonationId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                const Code = Math.floor(Math.random() * (99 - 10 + 1)) + 10;

                const dataToSend = {
                    donationId: DonationId,
                    restaurantId: id,
                    code: Code,
                    location: (locationRef.current.value + " "+cityRef.current.value +" "+postCodeRef.current.value),
                    pickUp:(pickUpLocRef.current.value +" "+pickUpLocCity.current.value+ " "+pickUpLocSC.current.value),
                    userId: null,
                    completed: 'UNCOMPLETEDTASK',
                    name: name
                };

                const responsePost = await axios.post('http://localhost:8080/Donations/AddDonations', dataToSend);
                
                if (responsePost.status === 201) {
                    localStorage.setItem("F/Cname",nameRef.current.value)
                    toast.success("Donation Sent.");
                    setTimeout(() => navigate(`/DonationRSide?donationName=${name}
                        &location=${dataToSend.location}&pickUp=${dataToSend.pickUp}&code=${dataToSend.code}&id=${DonationId}`), 1500);
                }

            

              

               
            } catch (error) {
                console.error(error);
                alert("There was an error with the donation process.");
                window.location.reload();
                       
            
            }
            
                
            
            
        };
    

      

    const handleCheckboxChange = () => {
        setIsChecked(donateRef.current.checked);  
    };

    return (
        <div>
            <RestaurantLayout/>
            <div className="donate-container">
                <div className="donate-form-container">
                    <form onSubmit={handleSubmit} className="donate-form">
                        <div className="donateCheckbox">
                            <input
                                type="checkbox"
                                ref={donateRef}
                                name="donate"
                                className="donate-checkbox-input"
                                onChange={handleCheckboxChange}
                            />
                            <label className="text-lg text-gray-700">
                                Do You want to donate
                            </label>
                        </div>

                        {isChecked && (
                            <><div>
                                <label htmlFor="email" className="donate-location-label">Your Email:</label>
                                <input
                                    name="email"
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    ref={emailRef}
                                    required
                                    className="donate-location-input"
                                    placeholder="Enter email" />
                            </div><div>

                            <label htmlFor="Name" className="donate-location-label">Name of foodbank/charity:</label>
                                    <input
                                        name="name"
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        ref={nameRef}
                                        required
                                        className="donate-location-input"
                                        placeholder="Enter charity/foodbank name" />

<label htmlFor="Location" className="donate-location-label">Pick Up location of Your Restaurant:</label>
                                    <input
                                        name="location"
                                        type="text"
                                        id="location"
                                        value={formData.pickUp}
                                        onChange={(e) => setFormData({ ...formData, pickUp: e.target.value })}
                                        ref={pickUpLocRef}
                                        required
                                        className="donate-location-input"
                                        placeholder="Enter address" />


                                         <label htmlFor="city" className="donate-location-label"></label>
                                    <input
                                        name="city"
                                        type="text"
                                        id="city"
                                        value={formData.pickUpCity}
                                        onChange={(e) => setFormData({ ...formData, pickUpCity: e.target.value })}
                                        ref={pickUpLocCity}
                                        required
                                        className="donate-location-input"
                                        placeholder="Enter city" />

                                         <label htmlFor="postCode" className="donate-location-label"></label>
                                    <input
                                        name="postCode"
                                        type= "text"
                                        id="postCode"
                                        value={formData.pickUpPC}
                                        onChange={(e) => setFormData({ ...formData, pickUpPC: e.target.value })}
                                        ref={pickUpLocSC}
                                        required
                                        className="donate-location-input"
                                        placeholder="Enter post code" />
                                        


                                    <label htmlFor="Location" className="donate-location-label">Location of foodbank/charity:</label>
                                    <input
                                        name="location"
                                        type="text"
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        ref={locationRef}
                                        required
                                        className="donate-location-input"
                                        placeholder="Enter address" />


                                         <label htmlFor="city" className="donate-location-label"></label>
                                    <input
                                        name="city"
                                        type="text"
                                        id="city"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        ref={cityRef}
                                        required
                                        className="donate-location-input"
                                        placeholder="Enter city" />

                                         <label htmlFor="postCode" className="donate-location-label"></label>
                                    <input
                                        name="postCode"
                                        type= "text"
                                        id="postCode"
                                        value={formData.postCode}
                                        onChange={(e) => setFormData({ ...formData, postCode: e.target.value })}
                                        ref={postCodeRef}
                                        required
                                        className="donate-location-input"
                                        placeholder="Enter post code" />
                                </div></>
                            
                        )}

                        {isSubmitted ? (
                            <button type="submit" disabled className="donate-button">Submitting...</button>
                        ) : (
                            <button type="submit" name = "onSubmit" className="donate-button">Submit</button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RestaurantDonate;
