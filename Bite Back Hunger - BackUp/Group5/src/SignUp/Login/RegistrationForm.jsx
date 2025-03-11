import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Layout from "../../Components/Layout";


function RegistrationForm() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const retypePasswordRef = useRef();
    const agreeRef = useRef();
    const navigate = useNavigate();

 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        business: false,
        user: false
    });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;


        if (name === 'business') {
            setFormData({ ...formData, business: checked, user: false });
        } else if (name === 'user') {
            setFormData({ ...formData, user: checked, business: false });
        }
    };


    const handleReg = async (e) => {
        e.preventDefault();

       
        if (!agreeRef.current.checked) {
            alert("You must agree to the Terms of Use and Privacy Policy.");
            return;
        }
        if (!formData.business && !formData.user) {
            alert("You must tick at least one box.");
            return;
        }

        if (passwordRef.current.value !== retypePasswordRef.current.value) {
            alert("Passwords do not match.");
            return;
        }

        

        try {

            if (formData.business && !formData.user){
                const RestData = {
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                   userType: "BUSINESS"
                };
                

                
                
           const RestPost =  await axios.post(`http://localhost:8080/Restaurant/AddUser`, RestData);
            
           if (RestPost.status === 201) {

            const emailCheckR = await axios.get(`http://localhost:8080/Restaurant/email/${emailRef.current.value}`);

            const responseR = emailCheckR.data;
            const idRestaurant = responseR.id; 

            sessionStorage.setItem("restaurantId", idRestaurant);
            sessionStorage.setItem("restaurantEmail", emailRef.current.value);
            const emailData = {
                toEmail: sessionStorage.getItem("restaurantEmail"),
                subject: "Restaurant Registration complete",
                text: "thank you for registering your business with us, we hope you have a great experience",
              };
               axios.post('http://localhost:8080/email/send', emailData)
            alert("Registered successfully.");
            navigate('/SignInHome');
            
        }
            }

            else if (formData.user&& !formData.business)
                {
                    const userData = {
                        name: nameRef.current.value,
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                       userType: "USER"
                    };
                const UserPost = await axios.post(`http://localhost:8080/NormalUsers/AddUser`, userData);
 
                if (UserPost.status === 201) {

                    const emailCheckU = await axios.get(`http://localhost:8080/NormalUsers/findByEmail/${emailRef.current.value}`);
                    const responseU = emailCheckU.data;
                    const idUser = responseU.id; 

                    sessionStorage.setItem("idUser",idUser);
                    sessionStorage.setItem("userEmail", emailRef.current.value);

                    const emailData = {
                        toEmail: sessionStorage.getItem("userEmail"),
                        subject: "User Registration complete",
                        text: "thank you for registering an account with us, we hope you have a great experience",
                      };
                       axios.post('http://localhost:8080/email/send', emailData)

                    alert("Registered successfully.");
                    navigate('/SignInHome');
                }
                }

        

          

           
        } catch (error) {
            console.error(error);
            alert("There was an error with registration");
            window.location.reload();
                   
        
        }
    };

    return (
        <div>
            <Layout />
            <div style={styles.container}>
                <form onSubmit={handleReg} style={styles.form}>
                    <h2 style={styles.heading}>Registration</h2>
                    <div style={styles.field}>
                        <label htmlFor="name" style={styles.label}>Name:</label>
                        <input type="text" id="name" ref={nameRef} required style={styles.input} placeholder="if a Restaurant owner please put the business name" />
                    </div>
                    <div style={styles.field}>
                        <label htmlFor="email" style={styles.label}>Email:</label>
                        <input type="email" id="email" ref={emailRef} required style={styles.input} />
                    </div>
                    <div style={styles.field}>
                        <label htmlFor="password" style={styles.label}>Password:</label>
                        <input type="password" id="password" ref={passwordRef} required style={styles.input} />
                    </div>
                    <div style={styles.field}>
                        <label htmlFor="retypePassword" style={styles.label}>Re-type Password:</label>
                        <input type="password" id="retypePassword" ref={retypePasswordRef} required style={styles.input} />
                    </div>

                    <div style={styles.field}>
                        <input
                            type="checkbox"
                            name="business"
                            checked={formData.business}
                            onChange={handleCheckboxChange}
                        />
                        <label>I am a Restaurant user.</label>

                        <input
                            type="checkbox"
                            name="user"
                            checked={formData.user}
                            onChange={handleCheckboxChange}
                        />
                        <label>I am a Normal user</label>
                    </div>

                    <div style={styles.field}>
                        <label style={styles.checkboxLabel}>
                            <input type="checkbox" ref={agreeRef} style={styles.checkbox} /> I agree to the{" "}
                            <a href="#" target="_blank" rel="noopener noreferrer">Terms of Use</a> and{" "}
                            <a href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                        </label>
                    </div>

                    <button type="submit" style={styles.button}>Register</button>
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
    checkboxLabel: {
        fontSize: "14px",
        color: "#333",
    },
    checkbox: {
        marginRight: "10px",
    },
};

export default RegistrationForm;
