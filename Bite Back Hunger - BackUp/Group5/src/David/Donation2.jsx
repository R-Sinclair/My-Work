import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Donation2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount || "£0";
  const donationId = location.state?.donationId;
  const [donorDetails, setDonorDetails] = useState(null);

  const [bankDetails, setBankDetails] = useState({
    fullName: "",
    bankName: "",
    accountNumber: "",
    sortCode: "",
    paymentDate: new Date(),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch donor details when component mounts
  useState(() => {
    const fetchDonorDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/donations/${donationId}`
        );
        if (response.ok) {
          const donation = await response.json();
          setDonorDetails({
            email: donation.donorEmail,
            name: donation.donorName,
          });
        }
      } catch (error) {
        console.error("Failed to fetch donor details:", error);
      }
    };
    if (donationId) {
      fetchDonorDetails();
    }
  }, [donationId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (day, month, year) => {
    setBankDetails((prev) => ({
      ...prev,
      paymentDate: new Date(year, month, day),
    }));
  };

  const validateBankDetails = () => {
    if (!bankDetails.fullName.trim()) {
      throw new Error("Please enter the account holder's name");
    }
    if (!bankDetails.bankName.trim()) {
      throw new Error("Please enter the bank name");
    }
    if (!/^\d{8}$/.test(bankDetails.accountNumber)) {
      throw new Error("Please enter a valid 8-digit account number");
    }
  };

  const handleSubmit = async () => {
    try {
      setError("");
      setLoading(true);
      setSuccess(false);

      // Validate bank details
      validateBankDetails();

      // Process payment with the new API
      const paymentResponse = await fetch(
        "http://localhost:8080/api/payments/process",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: donorDetails?.email,
            userName: donorDetails?.name,
            amount: parseFloat(amount.replace("£", "")),
            donationId: donationId,
            paymentDetails: {
              accountHolder: bankDetails.fullName,
              bankName: bankDetails.bankName,
              accountNumber: bankDetails.accountNumber,
              sortCode: bankDetails.sortCode,
              scheduledDate: bankDetails.paymentDate.toISOString(),
            },
          }),
        }
      );

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json();
        throw new Error(errorData.error || "Payment processing failed");
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/donations");
      }, 3000);
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            padding: "30px",
            borderRadius: "10px",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Thank You for Your Donation!</h2>
          <p>
            Your payment is being processed. You will be redirected shortly...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
   
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        minWidth: "100vw", // ✅ ensure full width
        backgroundColor: "#ffffff", // ✅ full white background
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#2e7d32",
          color: "white",
          padding: "20px",
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          width: "100%",
        }}
      >
        Step 2 of 2: Your Bank Details
      </header>

      {/* Banner */}
      <div
        style={{
          backgroundColor: "#e0e0e0",
          padding: "12px 20px",
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "500",
          width: "100%",
        }}
      >
        <strong>If you are not the account holder</strong>, this is a{" "}
        <strong>business account</strong> or{" "}
        <strong>more than one person</strong> is required to authorise debits on
        the account, please call our supporter care team on{" "}
        <strong>0300 456 11 55</strong>.
      </div>

      {/* Form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "700px",
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
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
          {/* Date selection */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <select
              style={dropdownStyle}
              onChange={(e) =>
                handleDateChange(
                  e.target.value,
                  bankDetails.paymentDate.getMonth(),
                  bankDetails.paymentDate.getFullYear()
                )
              }
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              style={dropdownStyle}
              onChange={(e) =>
                handleDateChange(
                  bankDetails.paymentDate.getDate(),
                  [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].indexOf(e.target.value),
                  bankDetails.paymentDate.getFullYear()
                )
              }
            >
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <select
              style={dropdownStyle}
              onChange={(e) =>
                handleDateChange(
                  bankDetails.paymentDate.getDate(),
                  bankDetails.paymentDate.getMonth(),
                  e.target.value
                )
              }
            >
              {["2024", "2025", "2026"].map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>

          <p style={{ fontSize: "14px", marginBottom: "20px", color: "#444" }}>
            We must allow a minimum of 16 days to set up your Direct Debit.
          </p>

          {/* Form fields */}
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={bankDetails.fullName}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="bankName"
            placeholder="Bank name"
            value={bankDetails.bankName}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="accountNumber"
            placeholder="Account Number"
            value={bankDetails.accountNumber}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="sortCode"
            placeholder="Sort Code"
            value={bankDetails.sortCode}
            onChange={handleInputChange}
            style={inputStyle}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: loading ? "#cccccc" : "#4b752e",
              color: "white",
              padding: "14px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              borderRadius: "4px",
              marginTop: "20px",
            }}
          >
            {loading ? "Processing..." : `Donate ${amount}`}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#2e7d32",
          color: "white",
          padding: "20px",
          textAlign: "center",
          width: "100%",
        }}
      >
        &copy; 2025 Food Security Initiative London. All Rights Reserved.
      </footer>
    </div>
    </div>
  );
};

const dropdownStyle = {
  flex: 1,
  padding: "10px",
  backgroundColor: "#fff",
  color: "#333",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  backgroundColor: "#fff",
  color: "#333",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

export default Donation2;
