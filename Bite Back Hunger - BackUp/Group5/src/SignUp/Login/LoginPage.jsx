import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Layout from "../../Components/Layout";

function LoginPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailRef.current.value || !passwordRef.current.value) {
            alert("Both fields are required.");
            return;
        }

        try {
           
            localStorage.clear(); 

            
            const emailCheckUser = await axios.get(`http://localhost:8080/NormalUsers/findByEmail/${emailRef.current.value}`);

            const responseUser = emailCheckUser.data;
            const passwordUser = responseUser.password;
            const userType = responseUser.userType;
            const idUser = responseUser.id;

            if (emailCheckUser.status === 200 && passwordUser === passwordRef.current.value && userType === 'USER') {
                alert("Successful login as Normal User");

                
                sessionStorage.setItem("idUser",idUser);
                sessionStorage.setItem("userEmail", emailRef.current.value);

                navigate('/SignInHome');
                return;
            }
        } catch (error) {
            console.log("Normal User login failed: ", error); 
        }

        try {
          
            const emailCheckRestaurant = await axios.get(`http://localhost:8080/Restaurant/email/${emailRef.current.value}`);

            const responseRestaurant = emailCheckRestaurant.data;
            const passwordRestaurant = responseRestaurant.password;
            const userTypeRestaurant = responseRestaurant.userType;
            const idRestaurant = responseRestaurant.id; 

            if (emailCheckRestaurant.status === 200 && passwordRestaurant === passwordRef.current.value && userTypeRestaurant === 'BUSINESS') {
                alert("Successful login as Restaurant User");

               
                sessionStorage.setItem("restaurantId", idRestaurant);
                sessionStorage.setItem("restaurantEmail", emailRef.current.value);
                navigate('/SignInHome');
                return;
            }
        } catch (error) {
            console.log("Restaurant User login failed: ", error); 
        }

       
        alert("Invalid login credentials.");
    };

    return (
        <div>
            <Layout />
            <div style={styles.container}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h2 style={styles.heading}>Login</h2>
                    <div style={styles.field}>
                        <label htmlFor="email" style={styles.label}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            ref={emailRef}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.field}>
                        <label htmlFor="password" style={styles.label}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            ref={passwordRef}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f1f8f6",
    },
    form: {
        padding: "30px",
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8e1",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#2a7f62", 
    },
    field: {
        marginBottom: "20px",
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontSize: "14px",
        color: "#333",
    },
    input: {
        width: "100%",
        padding: "12px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxSizing: "border-box",
        transition: "border-color 0.3s",
    },
    button: {
        width: "100%",
        padding: "12px",
        backgroundColor: "#4CAF50", 
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s",
    },
};

export default LoginPage;
