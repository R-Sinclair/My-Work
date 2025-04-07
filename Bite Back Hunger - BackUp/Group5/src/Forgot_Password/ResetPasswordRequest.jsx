import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/OtpPages.css";

function ResetPasswordRequest() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/business/reset-password-request",
        {
          email,
        }
      );
      sessionStorage.setItem("resetEmail", email);
      toast.success("OTP sent! Proceed to reset password.");
      navigate("/reset-password");
    } catch (error) {
      alert("Email was not found.")
      toast.error(

        "Failed: " + (error.response?.data?.error || "Unknown error")
      );
    }
  };

  return (
    <div className="background">
      <div className="otp-container">
        <form onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordRequest;
