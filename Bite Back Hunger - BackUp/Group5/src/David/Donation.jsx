import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const DonatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedAmount, setSelectedAmount] = useState("£25");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: "",
    targetAmount: 0,
    startDate: "",
    endDate: "",
    status: "ACTIVE",
  });

  function handleClick() {
    setShowCreateForm(true);
  }

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toISOString().split(".")[0];
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
      console.error("Failed to create campaign:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "targetAmount") {
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

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    // If campaign ID is passed through navigation
    if (location.state?.campaignId) {
      const campaign = campaigns.find(
        (c) => c.id === location.state.campaignId
      );
      if (campaign) {
        setSelectedCampaign(campaign);
      }
    }
  }, [location.state, campaigns]);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/campaigns");
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data);
        // If no campaign is selected and we have campaigns, select the first active one
        if (!selectedCampaign && data.length > 0) {
          const activeCampaign = data.find((c) => c.status === "ACTIVE");
          if (activeCampaign) {
            setSelectedCampaign(activeCampaign);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    if (!selectedCampaign) {
      alert("Please select a campaign first");
      return;
    }
    navigate("/donation1", {
      state: {
        amount: selectedAmount,
        campaignId: selectedCampaign.id,
      },
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
        Loading...
      </div>
    );
  }

  return (
    <div><Navbar/>
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
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
        Support London&apos;s Fight Against Food Insecurity
      </header>

      {/* Mission section */}
      <section
        style={{
          padding: "30px 20px",
          backgroundColor: "#4b692f", // unified green
          color: "white",
          maxWidth: "1000px",
          margin: "20px auto",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ fontSize: "22px", textAlign: "center" }}>
          Why Donate to <strong>Bite Back Hunger</strong>?
        </h2>
        <p
          style={{
            textAlign: "center",
            maxWidth: "800px",
            margin: "20px auto",
          }}
        >
          Your donation helps us fight food insecurity head-on by making sure no
          one in London goes hungry. Every pound helps put warm meals on tables
          and brings hope to families struggling to make ends meet.
        </p>
        <ul
          style={{
            maxWidth: "700px",
            margin: "0 auto 20px auto",
            padding: "0 20px",
            textAlign: "left",
          }}
        >
          <li>🍲 Provide hot meals to families and individuals in need</li>
          <li>📦 Stock up local food banks with essential supplies</li>
          <li>🏠 Support shelters offering nutrition and dignity</li>
          <li>💚 Empower long-term recovery through consistent care</li>
        </ul>
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          Every pound makes a difference. Help us <u>bite back hunger</u>.
        </p>
      </section>

      {/* Campaign Selection */}
      <section
        style={{
          padding: "30px 20px",
          backgroundColor: "#4b692f",
          color: "white",
          maxWidth: "1000px",
          margin: "20px auto",
          borderRadius: "10px",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Select a Campaign
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {campaigns
            .filter((c) => c.status === "ACTIVE")
            .map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => setSelectedCampaign(campaign)}
                style={{
                  padding: "15px",
                  backgroundColor:
                    selectedCampaign?.id === campaign.id
                      ? "#dfeadf"
                      : "#7d9562",
                  color: selectedCampaign?.id === campaign.id ? "#000" : "#fff",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                <h3>{campaign.name}</h3>
                <p>{campaign.description}</p>
                <div style={{ marginTop: "10px" }}>
                  Target: £{campaign.targetAmount}
                </div>
              </div>
            ))}
        </div>
        <button
          onClick={handleClick}
          style={{
            backgroundColor: "#89a76d",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          Create New Campaign
        </button>
      </section>

      {/* Campaign Creation Modal */}
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ color: "#4b692f", margin: 0 }}>
                Create New Campaign
              </h2>
              <button
                onClick={() => setShowCreateForm(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                name="name"
                placeholder="Campaign Name *"
                value={newCampaign.name}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <textarea
                name="description"
                placeholder="Campaign Description *"
                value={newCampaign.description}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  height: "100px",
                }}
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
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{ display: "block", marginBottom: "5px", color: "#666" }}
              >
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={newCampaign.startDate}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{ display: "block", marginBottom: "5px", color: "#666" }}
              >
                End Date *
              </label>
              <input
                type="date"
                name="endDate"
                value={newCampaign.endDate}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                style={{
                  padding: "10px 20px",
                  border: "1px solid #4b692f",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  color: "#4b692f",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4b692f",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Create Campaign
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Amount Selection */}
      <section
        style={{
          padding: "30px 20px",
          backgroundColor: "#89a76d",
          maxWidth: "1000px",
          margin: "20px auto",
          borderRadius: "10px",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            textAlign: "center",
            marginBottom: "20px",
            color: "#fff",
          }}
        >
          How much would you like to donate?
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          {["£25", "£50", "£100", "Other"].map((amt) => (
            <button
              key={amt}
              onClick={() => setSelectedAmount(amt)}
              style={{
                padding: "10px 20px",
                backgroundColor: selectedAmount === amt ? "#dfeadf" : "#7d9562",
                border: selectedAmount === amt ? "2px solid white" : "none",
                color: selectedAmount === amt ? "#000" : "#fff",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {amt}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button
            onClick={handleNavigate}
            disabled={!selectedCampaign}
            style={{
              backgroundColor: !selectedCampaign ? "#cccccc" : "#a30000",
              color: "white",
              padding: "14px 24px",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: !selectedCampaign ? "not-allowed" : "pointer",
            }}
          >
            Continue to Payment
          </button>
        </div>
      </section>
    </div>
    </div>
  );
};

export default DonatePage;
