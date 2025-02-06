import React, { useRef } from "react";

function LoginPage() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!emailRef.current.value || !passwordRef.current.value) {
            alert("Both fields are required.");
            return;
        }

        alert(`Email: ${emailRef.current.value}, Password: ${passwordRef.current.value}`);
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>Login</h2>
                <div style={styles.field}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" ref={emailRef} required />
                </div>
                <div style={styles.field}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" ref={passwordRef} required />
                </div>
                <button type="submit" style={styles.button}>Login</button>
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

export default LoginPage;
