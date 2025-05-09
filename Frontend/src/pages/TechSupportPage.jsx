import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../store/StoreContext";
import api from "../services/api.js";
import "../App.css";

export default function TechSupportPage() {
  const { user } = useContext(StoreContext);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Loading requests from the DB
  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await api.get("/techsupport");
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load support requests");
      } finally {
        setIsLoading(false); // סיים לטעון
      }
    }

    fetchRequests();
  }, []);

  // Function to determine color by content (fake status)
  const getStatusColor = (content) => {
    const text = content.toLowerCase();
    if (text.includes("crash") || text.includes("security")) return "green"; // Opened
    if (text.includes("performance") || text.includes("install"))
      return "orange"; // In Progress
    return "red"; // Closed (default)
  };

  // Clicking the Add Request button
  const handleAddRequest = () => {
    alert("Add Request button was clicked");
  };

  return (
    <div className="client-requests-page">
      <h2 className="client-requests-page-title">
        {isLoading ? "Loading..." : "My Requests"}
      </h2>

      {error && <p className="error">{error}</p>}

      {isLoading ? (
        <div className="client-page-spinner"></div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : requests.length === 0 ? (
        <p className="no-requests">No requests yet.</p>
      ) : (
        <div className="requests-list">
          {requests.map((req) => (
            <div
              key={req.id}
              className="request-row"
              onClick={() => alert(`Request #${req.id} clicked`)}
            >
              <span
                className={`status-circle ${getStatusColor(req.content)}`}
              ></span>
              <span className="request-category">{req.content}</span>
              <span className="request-id"> Request #{req.id}</span>
            </div>
          ))}
        </div>
      )}
      {!isLoading && (
        <div className="add-request-container">
          <button className="add-request-btn" onClick={handleAddRequest}>
            Add Request +
          </button>
        </div>
      )}
    </div>
  );
}
