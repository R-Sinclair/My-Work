import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Layout from "../../Components/Layout";
import { toast } from "react-toastify";

function LoginPage() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Security: Input validation to prevent empty credentials
        if (!emailRef.current.value || !passwordRef.current.value) {
            alert("Both fields are required.");
            return;
        }

        try {
            // Security: Normal user authentication attempt
            const loginData = {
                email: emailRef.current.value,
                password: passwordRef.current.value
            };

            const response = await axios.post('http://localhost:8080/NormalUsers/findByEmail', loginData);
            
            if (response.status === 200 && response.data === "Login Successful!") {
                // Security: Store user credentials in session storage
                toast.success("Successful login as Normal User");
                const userResponse = await axios.get(`http://localhost:8080/NormalUsers/findByEmail/${emailRef.current.value}`);
                const userData = userResponse.data;
                sessionStorage.setItem("idUser", userData.id);
                sessionStorage.setItem("userEmail", emailRef.current.value);
                setTimeout(() => navigate("/SignInHome"), 1500);
                return;
            }
        } catch (error) {
            // Security: Handle authentication failure for normal user
            console.log("Normal User login failed: ", error);
        }

        try {
            // Security: Restaurant user authentication attempt
            const loginData = {
                email: emailRef.current.value,
                password: passwordRef.current.value
            };

            const response = await axios.post('http://localhost:8080/Restaurant/findByEmail', loginData);
            
            if (response.status === 200 && response.data === "Login Successful!") {
                // Security: Store restaurant credentials in session storage
                toast.success("Successful login as Restaurant User");
                const restaurantResponse = await axios.get(`http://localhost:8080/Restaurant/email/${emailRef.current.value}`);
                const restaurantData = restaurantResponse.data;
                sessionStorage.setItem("restaurantId", restaurantData.id);
                sessionStorage.setItem("restaurantEmail", emailRef.current.value);
                setTimeout(() => navigate("/SignInHome"), 1500);
                return;
            }
        } catch (error) {
            // Security: Handle authentication failure for restaurant user
            console.log("Restaurant User login failed: ", error);
        }

        // Security: Handle invalid credentials
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
                    <div> <a href="/reset-password-request" style={styles.forgotPassword}>
          Forgot Password?
        </a></div>

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
