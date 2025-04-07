import { useState, useEffect } from "react";
import Navbar from "./Navbar";

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/donations");
      if (!response.ok) {
        throw new Error("Failed to fetch donations");
      }
      const data = await response.json();
      setDonations(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Loading donations...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          fontFamily: "Arial, sans-serif",
          color: "#a30000",
        }}
      >
        Error: {error}
      </div>
    );
  }

  return (
    <div><Navbar/>
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#4b692f",
          color: "white",
          padding: "20px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Donation Records
      </header>

      {/* Summary Section */}
      <section
        style={{
          padding: "20px",
          backgroundColor: "#89a76d",
          color: "white",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>
          Total Donations: {donations.length}
        </h2>
        <p>
          Total Amount: £
          {donations
            .reduce((sum, donation) => sum + donation.amount, 0)
            .toFixed(2)}
        </p>
      </section>

      {/* Donations Table */}
      <div
        style={{
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#4b692f", color: "white" }}>
              <th style={tableHeaderStyle}>Donor Name</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Amount</th>
              <th style={tableHeaderStyle}>Campaign</th>
              <th style={tableHeaderStyle}>Payment Method</th>
              <th style={tableHeaderStyle}>Payment Status</th>
              <th style={tableHeaderStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr
                key={donation.id}
                style={{
                  borderBottom: "1px solid #eee",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <td style={tableCellStyle}>{donation.donorName}</td>
                <td style={tableCellStyle}>{donation.donorEmail}</td>
                <td style={tableCellStyle}>£{donation.amount.toFixed(2)}</td>
                <td style={tableCellStyle}>
                  {donation.campaignName || "General"}
                </td>
                <td style={tableCellStyle}>
                  {donation.paymentMethod.replace("_", " ")}
                </td>
                <td style={tableCellStyle}>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      backgroundColor: getStatusColor(donation.paymentStatus),
                      color: "white",
                    }}
                  >
                    {donation.paymentStatus}
                  </span>
                </td>
                <td style={tableCellStyle}>{formatDate(donation.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#4b692f",
          color: "white",
          padding: "20px",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        &copy; 2025 Food Security Initiative London. All Rights Reserved.
      </footer>
    </div>
    </div>
  );
};

const tableHeaderStyle = {
  padding: "15px",
  textAlign: "left",
  fontWeight: "bold",
};

const tableCellStyle = {
  padding: "15px",
  textAlign: "left",
};

const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case "COMPLETED":
      return "#2e7d32";
    case "PROCESSING":
      return "#f57c00";
    case "PENDING":
      return "#1976d2";
    case "FAILED":
      return "#d32f2f";
    default:
      return "#757575";
  }
};

export default DonationList;
