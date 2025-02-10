import React, { useRef } from "react";
import Layout from "./Layout";

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
        backgroundColor: "#f1f8f6", // Soft light green background
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
        color: "#2a7f62", // Darker green for heading
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
    inputFocus: {
        borderColor: "#4CAF50", // Green border on focus
    },
    button: {
        width: "100%",
        padding: "12px",
        backgroundColor: "#4CAF50", // Green button
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s",
    },
    buttonHover: {
        backgroundColor: "#45a049", // Darker green on hover
    },
};

export default LoginPage;