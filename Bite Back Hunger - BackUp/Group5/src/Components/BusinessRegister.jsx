import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./BusinessRegister.css";

const BusinessRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    businessAddress: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [strength, setStrength] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") setStrength(getPasswordStrength(value));
  };

  const getPasswordStrength = (pwd) => {
    if (pwd.length < 6) return "Weak";
    if (/[A-Z]/.test(pwd) && /\d/.test(pwd) && /[^A-Za-z0-9]/.test(pwd))
      return "Strong";
    return "Medium";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    try {
      await axios.post("http://localhost:8080/business/register", formData);
      toast.success("OTP sent ✅ Please verify your email.");
      sessionStorage.setItem("pendingEmail", formData.email);
      sessionStorage.removeItem("otpVerified");
      setTimeout(() => navigate("/otp-verification"), 1500);
    } catch (err) {
      const msg = err.response?.data?.error?.toLowerCase();
      if (msg?.includes("email")) setError("Email already registered ❌");
      else if (msg?.includes("mobile"))
        setError("Mobile number already in use ❌");
      else setError("Registration failed ❌");
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2 className="heading">Register</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          {["businessName", "businessAddress", "email", "mobileNumber"].map(
            (field) => (
              <div className="field" key={field}>
                <label className="label">
                  {field.replace(/([A-Z])/g, " $1")}:
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            )
          )}
          <div className="field">
            <label className="label">Password:</label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              onChange={handleChange}
              className="input"
              required
            />
            <div className={`strength ${strength.toLowerCase()}`}>
              Strength: {strength}
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm Password:</label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="confirmPassword"
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="field">
            <label className="label">
              <input
                type="checkbox"
                onChange={() => setPasswordVisible(!passwordVisible)}
              />{" "}
              Show Password
            </label>
          </div>
          <button type="submit" className="button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessRegister;
