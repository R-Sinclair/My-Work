import { useState } from "react";
import axios from "axios";
import "../Home/Home.css";

const BusinessLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/business/login",
        formData
      );
      if (res.data?.token) {
        localStorage.setItem("jwtToken", res.data.token);
        alert("Login Successful!");
        window.location.href = "/RHomePage";
      } else {
        alert("Token not found in response.");
      }
    } catch (err) {
      console.error("Login Failed:", err.response || err.message);
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.heading}>Business Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              style={styles.input}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password:</label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              style={styles.input}
              onChange={handleChange}
              required
            />
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={passwordVisible}
                onChange={() => setPasswordVisible(!passwordVisible)}
              />{" "}
              Show Password
            </label>
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <a href="/reset-password-request" style={styles.forgotPassword}>
          Forgot Password?
        </a>
      </div>
    </div>
  );
};

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
  forgotPassword: {
    fontSize: "14px",
    color: "#333",
    display: "block",
    marginTop: "10px",
    textAlign: "center",
  },
  checkboxLabel: {
    fontSize: "14px",
    display: "inline-block",
    marginTop: "5px",
    color: "#555",
  },
};

export default BusinessLogin;
