import React, { useRef } from "react";
import Layout from "./Layout";
import axios from "axios";

function ReportPage() {
    const missingItemsRef = useRef();
    const expiredFoodRef = useRef();
    const wrongOrderRef = useRef();
    const otherRef = useRef();
    const descriptionRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedIssues = [];
        if (missingItemsRef.current.checked) selectedIssues.push("Missing Items");
        if (expiredFoodRef.current.checked) selectedIssues.push("Expired Food");
        if (wrongOrderRef.current.checked) selectedIssues.push("Wrong Order");
        if (otherRef.current.checked) selectedIssues.push("Other");

        if (selectedIssues.length === 0) {
            alert("Please select at least one issue.");
            return;
        }

        alert(`Issues Reported: ${selectedIssues.join(", ")}\nDescription: ${descriptionRef.current.value}`);

        const pos = await axios.post('')// add post url here
    };

    return (

        <div>
        <Layout/>
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Submit a Report</h2>

                <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                        Missing Items <input type="checkbox" ref={missingItemsRef} style={styles.checkbox} />
                    </label>
                    <label style={styles.checkboxLabel}>
                        Expired Food <input type="checkbox" ref={expiredFoodRef} style={styles.checkbox} />
                    </label>
                    <label style={styles.checkboxLabel}>
                        Wrong Order <input type="checkbox" ref={wrongOrderRef} style={styles.checkbox} />
                    </label>
                    <label style={styles.checkboxLabel}>
                        Other <input type="checkbox" ref={otherRef} style={styles.checkbox} />
                    </label>
                </div>

                <div style={styles.field}>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" ref={descriptionRef} rows="5" style={styles.textarea} required></textarea>
                </div>

                <button type="submit" style={styles.button}>Submit Report</button>
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
        backgroundColor: "#f9f9f9",
    },
    form: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        width: "400px",
        textAlign: "center",
    },
    title: {
        marginBottom: "15px",
    },
    checkboxGroup: {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        marginBottom: "15px",
    },
    checkboxLabel: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        fontSize: "16px",
        marginBottom: "5px",
    },
    checkbox: {
        width: "16px",
        height: "16px",
    },
    field: {
        marginBottom: "15px",
        textAlign: "left",
    },
    textarea: {
        width: "100%",
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "14px",
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

export default ReportPage;


