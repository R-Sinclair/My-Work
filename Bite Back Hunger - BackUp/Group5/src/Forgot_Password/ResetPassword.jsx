// src/Forgot_Password/ResetPassword.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/OtpPages.css";

function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("resetEmail");
    if (!stored) {
      toast.warning("No email found. Redirecting...");
      navigate("/Sign_Up");
    } else {
      setEmail(stored);
    }
  }, [navigate]);

  const getPasswordStrength = (pwd) => {
    if (pwd.length < 6) return "Weak";
    if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.match(/[^A-Za-z0-9]/))
      return "Strong";
    return "Medium";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("❌ Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Try Normal User first
      const normalUserRes = await axios.get(`http://localhost:8080/NormalUsers/findByEmail/${email}`);
      if (normalUserRes.status === 200 && normalUserRes.data?.name) {
        const { name } = normalUserRes.data;
        const NP = {
          name,
          email,
          password: newPassword,
          User: "USER",
        };

        await axios.put(`http://localhost:8080/NormalUsers/Update/${email}`, NP);
        toast.success("✅ Password reset for Normal User");
        sessionStorage.removeItem("resetEmail");
        navigate("/Login");
        return;
      }
    } catch (err) {
      // Normal User not found — continue to check Restaurant
    }

    try {
      const restaurantRes = await axios.get(`http://localhost:8080/Restaurant/email/${email}`);
      if (restaurantRes.status === 200 && restaurantRes.data?.name) {
        const { name } = restaurantRes.data;
        const NP = {
          name,
          email,
          password: newPassword,
          User: "BUSINESS",
        };

        await axios.put(`http://localhost:8080/Restaurant/Update/${email}`, NP);
        toast.success("✅ Password reset for Restaurant");
        sessionStorage.removeItem("resetEmail");
        navigate("/Login");
        return;
      }
    } catch (err) {
      // Restaurant not found — show error
    }

    toast.error("❌ Email not found in any user records");
    setLoading(false);
  };

  return (
    <div className="otp-container">
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <div className="otp-label-value">
          Email: <span className="otp-email">{email}</span>
        </div>
        <div className="otp-field">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div className="otp-field">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setStrength(getPasswordStrength(e.target.value));
            }}
            required
          />
          <div className={`strength ${strength.toLowerCase()}`}>
            Strength: {strength}
          </div>
        </div>
        <div className="otp-field">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="otp-button">
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
