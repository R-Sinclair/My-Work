import React, { useRef } from "react";

function RegistrationForm() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const retypePasswordRef = useRef();
    const agreeRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form fields
        if (!agreeRef.current.checked) {
            alert("You must agree to the Terms of Use and Privacy Policy.");
            return;
        }

        if (passwordRef.current.value !== retypePasswordRef.current.value) {
            alert("Passwords do not match.");
            return;
        }

        alert(`Name: ${nameRef.current.value}, Email: ${emailRef.current.value}`);
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>Registration</h2>
                <div style={styles.field}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" ref={nameRef} required />
                </div>
                <div style={styles.field}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" ref={emailRef} required />
                </div>
                <div style={styles.field}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" ref={passwordRef} required />
                </div>
                <div style={styles.field}>
                    <label htmlFor="retypePassword">Re-type Password:</label>
                    <input type="password" id="retypePassword" ref={retypePasswordRef} required />
                </div>
                <div style={styles.field}>
                    <label>
                        <input type="checkbox" ref={agreeRef} /> I agree to the{" "}
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            Terms of Use
                        </a>{" "}
                        and{" "}
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            Privacy Policy
                        </a>.
                    </label>
                </div>
                <button type="submit" style={styles.button}>Register</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
    },
    form: {
        padding: "20px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        width: "400px",
    },
    field: {
        marginBottom: "15px",
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default RegistrationForm;
