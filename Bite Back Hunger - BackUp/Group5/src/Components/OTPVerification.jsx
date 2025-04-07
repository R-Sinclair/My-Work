import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useResendOtpTimer from "../hooks/useResendOtpTimer";
import "../styles/OtpPages.css";

function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = sessionStorage.getItem("pendingEmail");
  const { counter, canResend, attemptsLeft, triggerResend } = useResendOtpTimer(
    3,
    30
  );

  useEffect(() => {
    if (!email && !sessionStorage.getItem("otpVerified")) {
      toast.error("No email found. Redirecting...");
      navigate("/Sign_Up");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error("Please enter the OTP.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/business/verify-otp", {
        email,
        otp,
      });
      toast.success("OTP verified ✅ Redirecting...");
      sessionStorage.removeItem("pendingEmail");
      sessionStorage.setItem("otpVerified", true);
      setTimeout(() => {
        navigate("/SignInHome");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!triggerResend()) return;

    try {
      await axios.post("http://localhost:8080/email/send", {
        toEmail: email,
        subject: "Resend OTP",
        text: "Here is your new OTP for verification.",
      });
      toast.info("OTP re-sent 📩");
    } catch {
      toast.error("Failed to resend OTP ❌");
    }
  };

  return (
    <div className="otp-container">
      <form onSubmit={handleSubmit}>
        <h2>Verify Your Email</h2>
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
        <button type="submit" className="otp-button" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        <button
          type="button"
          className="otp-button"
          onClick={handleResend}
          disabled={!canResend || attemptsLeft === 0}
        >
          {attemptsLeft === 0
            ? "Max attempts reached"
            : `Resend OTP (${counter}s, ${attemptsLeft} left)`}
        </button>
      </form>
    </div>
  );
}

export default OTPVerification;
