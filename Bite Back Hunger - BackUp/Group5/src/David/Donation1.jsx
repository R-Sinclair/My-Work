import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Donation1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount || "£0";
  const campaignId = location.state?.campaignId || "1";

  // Form state
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate email format
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate phone format (optional field)
  const validatePhone = (phone) => {
    return phone === "" || /^[\d\s+()-]{10,}$/.test(phone);
  };

  // Add this validation function near your other validation functions
  const validateUKPostcode = (postcode) => {
    // This regex handles standard UK postcode formats
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    return postcodeRegex.test(postcode.trim());
  };

  // 🔁 Submit to backend + validation
  const handleSubmit = async () => {
    try {
      setError("");
      setLoading(true);

      // Validate required fields
      if (!title || !firstName || !lastName || !email || !postcode) {
        throw new Error("Please fill in all required fields");
      }

      // Validate email format
      if (!validateEmail(email)) {
        throw new Error("Please enter a valid email address");
      }

      // Validate phone format if provided
      if (!validatePhone(phone)) {
        throw new Error("Please enter a valid phone number");
      }

      // Add postcode validation
      if (!validateUKPostcode(postcode)) {
        throw new Error("Please enter a valid UK postcode");
      }

      // 1. Create donor
      const donorResponse = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          firstName,
          lastName,
          email,
          phone,
          postcode,
        }),
      });

      if (!donorResponse.ok) {
        const errorData = await donorResponse.json();
        throw new Error(errorData.error || "Failed to create donor");
      }

      const donor = await donorResponse.json();

      // 2. Create donation
      const donationResponse = await fetch(
        "http://localhost:8080/api/donations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            donor: {
              id: donor.id,
            },
            amount: parseFloat(amount.replace("£", "")),
            paymentStatus: "PENDING",
            paymentMethod: "CARD",
            campaign: {
              id: campaignId,
            },
          }),
        }
      );

      if (!donationResponse.ok) {
        const errorData = await donationResponse.json();
        throw new Error(errorData.error || "Failed to create donation");
      }

      const donation = await donationResponse.json();

      // Navigate to payment page with donation details
      navigate("/donation2", {
        state: {
          amount,
          donationId: donation.id,
          donorId: donor.id,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div> 
    <Navbar/>
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#2e7d32",
          color: "white",
          padding: "20px",
          fontSize: "24px",
          textAlign: "center",
          fontWeight: "bold",
          width: "100vw",
        }}
      >
        Step 1 of 2: Your Personal Details
      </header>

      {/* Donation Summary */}
      <div
        style={{
          backgroundColor: "#ddd",
          padding: "15px 20px",
          fontWeight: "bold",
          textAlign: "center",
          width: "100vw",
        }}
      >
        I would like to make the following donation to Support people in crisis:
        <span
          style={{
            display: "inline-block",
            marginLeft: "10px",
            backgroundColor: "#555",
            color: "white",
            padding: "5px 12px",
            borderRadius: "5px",
          }}
        >
          {amount}
        </span>
      </div>

      {/* Form */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "white",
          padding: "30px",
          marginTop: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{ fontSize: "20px", marginBottom: "20px", color: "#2e7d32" }}
        >
          Your details
        </h2>

        {error && (
          <div
            style={{
              backgroundColor: "#ffebee",
              color: "#c62828",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ marginBottom: "15px" }}>
          <label>Title</label>
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          >
            <option value="">Select</option>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="First name *"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{ flex: 1, padding: "10px" }}
          />
          <input
            type="text"
            placeholder="Last name *"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{ flex: 1, padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            placeholder="Email address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "30px" }}>
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <h2
          style={{ fontSize: "20px", marginBottom: "15px", color: "#2e7d32" }}
        >
          Billing address
        </h2>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Postcode *"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: loading ? "#ccc" : "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          {loading ? "Processing..." : "Continue to Payment"}
        </button>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#2e7d32",
          color: "white",
          padding: "20px",
          textAlign: "center",
          width: "100vw",
          marginTop: "40px",
        }}
      >
        &copy; 2025 Food Security Initiative London. All Rights Reserved.
      </footer>
    </div>
    </div>
  );
};

export default Donation1;
