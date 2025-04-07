import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const CampaignList = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: "",
    targetAmount: 0,
    startDate: "",
    endDate: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/campaigns");
      if (!response.ok) {
        throw new Error("Failed to fetch campaigns");
      }
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      // Format dates to include time component
      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toISOString().split(".")[0]; // This will give format: YYYY-MM-DDTHH:mm:ss
      };

      const campaignData = {
        ...newCampaign,
        targetAmount: Number(newCampaign.targetAmount),
        startDate: formatDate(newCampaign.startDate),
        endDate: formatDate(newCampaign.endDate),
      };

      const response = await fetch("http://localhost:8080/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaignData),
      });

      if (!response.ok) {
        throw new Error("Failed to create campaign");
      }

      // Refresh campaigns list
      await fetchCampaigns();
      setShowCreateForm(false);
      setNewCampaign({
        name: "",
        description: "",
        targetAmount: 0,
        startDate: "",
        endDate: "",
        status: "ACTIVE",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "targetAmount") {
      // Ensure only valid decimal numbers are entered
      if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
        setNewCampaign((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setNewCampaign((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
        Loading campaigns...
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
        Campaign Management
      </header>

      {/* Action Buttons */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <button
          onClick={() => setShowCreateForm(true)}
          style={{
            backgroundColor: "#4b692f",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Create New Campaign
        </button>
        <button
          onClick={() => navigate("/donation")}
          style={{
            backgroundColor: "#89a76d",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Start Donation
        </button>
      </div>

      {/* Create Campaign Form */}
      {showCreateForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <form
            onSubmit={handleCreateCampaign}
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginBottom: "20px", color: "#4b692f" }}>
              Create New Campaign
            </h2>

            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                name="name"
                placeholder="Campaign Name *"
                value={newCampaign.name}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <textarea
                name="description"
                placeholder="Campaign Description *"
                value={newCampaign.description}
                onChange={handleInputChange}
                required
                style={{ ...inputStyle, height: "100px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <input
                type="number"
                name="targetAmount"
                placeholder="Target Amount (£) *"
                value={newCampaign.targetAmount}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                pattern="^\d*(\.\d{0,2})?$"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={newCampaign.startDate}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                End Date *
              </label>
              <input
                type="date"
                name="endDate"
                value={newCampaign.endDate}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  backgroundColor: "#4b692f",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Create Campaign
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                style={{
                  flex: 1,
                  backgroundColor: "#a30000",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Campaigns List */}
      <div
        style={{
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            padding: "20px",
          }}
        >
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ color: "#4b692f", marginBottom: "10px" }}>
                {campaign.name}
              </h3>
              <p style={{ marginBottom: "15px", color: "#666" }}>
                {campaign.description}
              </p>
              <div style={{ marginBottom: "10px" }}>
                <strong>Target:</strong> £{campaign.targetAmount}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <strong>Start:</strong>{" "}
                {new Date(campaign.startDate).toLocaleDateString()}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <strong>End:</strong>{" "}
                {new Date(campaign.endDate).toLocaleDateString()}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    backgroundColor:
                      campaign.status === "ACTIVE" ? "#2e7d32" : "#757575",
                    color: "white",
                  }}
                >
                  {campaign.status}
                </span>
              </div>
              <button
                onClick={() =>
                  navigate("/donation", { state: { campaignId: campaign.id } })
                }
                style={{
                  width: "100%",
                  backgroundColor: "#89a76d",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                Donate to this Campaign
              </button>
            </div>
          ))}
        </div>
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

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "14px",
};

export default CampaignList;
