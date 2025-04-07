import React, { useEffect, useRef, useState } from 'react';
import UserLayout from '../Components/UserLayout';
import RestaurantLayout from '../Components/RestaurantLayout';
import Layout from '../Components/Layout';
import { useNavigate } from 'react-router';
import axios from 'axios';  
import pic from '../picture_logo/BiteBackHunger.png';

function ProfilePage() {
    const navigate = useNavigate();
    const [signInUser, setSignInUser] = useState("");
    const [signInRestaurant, setSignInRestaurant] = useState("");
    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [rotateAngle, setRotateAngle] = useState(0);
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
        const rotateImage = () => {
            setRotateAngle(prevAngle => (prevAngle + 1) % 360); 
            requestAnimationFrame(rotateImage); 
        };

        requestAnimationFrame(rotateImage); 

        return () => cancelAnimationFrame(rotateImage);
    }, []);

    const handleSave = async () => {
        if (!passwordRef.current.value || !nameRef.current.value || !emailRef.current.value ) {
            alert("Information missing.");
            return;
        }
        else if ( !emailRef.current.value.match(mailformat)) {
            alert("Please add an email and make sure it's correct");
            return;
        }

        if (signInUser && emailRef.current.value.match(mailformat)) {
            try {
                const userRData = {
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                    userType: "USER"  // Add user type for normal users
                };
                const NUpdate = await axios.put(`http://localhost:8080/NormalUsers/Update/${signInUser}`, userRData);
                if (NUpdate.status === 200) {
                    sessionStorage.setItem("userEmail", emailRef.current.value);
                    alert("Details updated");
                    navigate('/SignInHome');
                }
            } catch (error) {
                console.error('Update error:', error);
                alert('Not able to send data to users');
            }
        } else if (signInRestaurant && emailRef.current.value.match(mailformat)) {
            try {
                const userData = {
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                    userType: "BUSINESS"  // Add user type for restaurant users
                };
                const RUpdate = await axios.put(`http://localhost:8080/Restaurant/Update/${signInRestaurant}`, userData);
                if (RUpdate.status === 200) {
                    sessionStorage.setItem("restaurantEmail", emailRef.current.value);
                    alert("Details updated");
                    navigate('/SignInHome');
                }
            } catch (error) {
                console.error('Update error:', error);
                alert('Not able to send data to restaurant');
            }
        }
    };


    const styles = {
        container: {
            width: '60%',
            backgroundColor: 'white',
            overflowY: 'auto',
            padding: '20px'
        },
        header: {
            backgroundColor: '#07b441',
            textAlign: 'center',
            padding: '30px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px'
        },
        profileHeaderContainer: {
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '3px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        profileImage: {
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover'
        },
        profilePictureText: {
            color: 'black',
            fontWeight: 'bold',
            fontSize: '16px'
        },
        formSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            padding: '50px'
        },
        input: {
            width: '90%',
            padding: '10px',
            margin: '0 auto 30px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            outline: 'none'
        },
        updateBtn: {
            width: '100%',
            padding: '12px',
            backgroundColor: 'rgb(11, 78, 11)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s'
        },
        updateBtnHover: {
            backgroundColor: '#333'
        }
    };

    return (

        <div>{signInUser ? (
            <UserLayout />
        ) : signInRestaurant ? (
            <RestaurantLayout />
        ) : (
            <Layout />
        )}

        <img
            src={pic}
            alt="Rotating"
            style={{
                width: '180px',          
                height: '180px',
                borderRadius: '20%',
                transform: `rotate(${rotateAngle}deg)`,
                transition: 'transform 0.3s linear',
            }}
        />
        <h2><u style={styles.input}>Edit Profile details</u></h2>
        <div style={styles.formSection}>
            <input
                ref={nameRef}
                type="text"
                placeholder="Name"
                style={styles.input}
            />
            <input
                ref={emailRef}
                type="email"
                placeholder="Email"
                style={styles.input}
            />
            <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                style={styles.input}
            />
            <button
                style={styles.updateBtn}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#333')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgb(11, 78, 11)')}
                onClick={handleSave}
            >
                Update
            </button>
        </div>
    </div>


    );
};

export default ProfilePage;
