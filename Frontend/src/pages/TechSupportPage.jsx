import { useContext } from "react";
import { StoreContext } from "../store/StoreContext";
import React, { useState, useEffect } from "react";
import api from "../services/api.js";
import "../App.css";

export default function TechSupportPage() {
  const { user } = useContext(StoreContext); // Gets the logged in user from the context

  // Page states
  const agentPage = 1;
  const userPage = 2;
  const addRequestPage = 3;
  const loadingScreen = 5;

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null); // null means no popup yet

  const [requests, setRequests] = useState([]);

  // agent page requests.
  const [costumerReq, setCostumerReq] = useState([]);

  // page state modifier.
  const [pageState, setPageState] = useState(loadingScreen);

  let tempUrl = "/ts/techsupportadd/?name=";

  // Checking if the user is an Agent
  useEffect(() => {
    async function getPageType() {
      if (!user?.email)
        // Prevent error if user or user.email is undefined
        return;

      const res = await api.get("/ts/techsupportisagent/?email=" + user?.email);

      if (res?.data.agent === true) setPageState(agentPage);
      else setPageState(userPage);
    }

    getPageType();
  }, [user?.email]);

  // Loading requests from the DB
  useEffect(() => {
    async function fetchRequests() {

      if (pageState === loadingScreen)
        return;

      if (pageState === agentPage) {
        try {
          const res = await api.get("/ts/techsupport");

          res.data.sort((a, b) => {
            if (a.urgency !== b.urgency) {
              return a.urgency - b.urgency;
            }
            return a.id - b.id;
          });

          setCostumerReq(res.data);
        } catch (err) {
          console.error(err);
          setError("Failed to load support requests");
        }
      }
      else { // change the function to sapirs new function !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        try {
          const res = await api.get("/ts/techsupport");
          setRequests(res.data);
        } catch (err) {
          console.error(err);
          setError("Failed to load support requests");
        }
      }
    }

    fetchRequests();
  }, [pageState != loadingScreen]);

  // Function to determine color by content (fake status)
  const getStatusColor = (status) => {
    if (status === 1)
      return 'green';
    if (status === 2)
      return 'orange';
    else 
    return 'red';
  };

  // Clicking the Add Request button
  const handleAddRequest = () => {
    setPageState(addRequestPage);
  };

  const getUrgencyText = (level) => {
    if (level === 1)
      return 'high';

    if (level === 2)
      return 'medium';

    if (level === 3)
      return 'low';
  };

  // Clicking the Send button in the popup
  const handleSendMessage = () => {
    alert("Send button was clicked");
  };

  if (pageState === agentPage) {
    return (
      <div className="tech-agent-requests-page">
        <h2 className="tech-client-requests-page-title">
          Welcome agent: {user?.firstName}.
        </h2>
  
        <div className="tech-agent-content">
          {/* LEFT PANEL: type === 1 */}
          <div className="tech-left-agent-panel">
            <h2 className="tech-panel-title">Customers</h2>
  
            <div className="tech-request-header-row">
              <span className="tech-request-cell">Status</span>
              <span className="tech-request-cell">Category</span>
              <span className="tech-request-cell">Urgency</span>
              <span className="tech-request-cell">ID</span>
            </div>
  
            {costumerReq
              .filter((req) => req.type === 1)
              .map((req) => (
                <div
                  key={req.id}
                  className="tech-request-row"
                  onClick={() => setSelectedRequest(req)}
                >
                  <span className="tech-request-cell">
                    <span
                      className={`tech-status-circle ${getStatusColor(req.status)}`}
                      style={{ marginRight: '8px' }}
                    ></span>
                  </span>
  
                  <span className="tech-request-cell">{req.category}</span>
  
                  <span className="tech-request-cell">
                    {getUrgencyText(req.urgency)}
                  </span>
  
                  <span className="tech-request-cell tech-request-id">
                    Request #{req.id}
                  </span>
                </div>
              ))}
          </div>
  
          {/* RIGHT PANEL: type === 2 */}
          <div className="tech-right-agent-panel">
            <h2 className="tech-panel-title">Leads</h2>
  
            <div className="tech-request-header-row">
              <span className="tech-request-cell">Status</span>
              <span className="tech-request-cell">Category</span>
              <span className="tech-request-cell">Urgency</span>
              <span className="tech-request-cell">ID</span>
            </div>
  
            {costumerReq
              .filter((req) => req.type === 2)
              .map((req) => (
                <div
                  key={req.id + "-lead"}
                  className="tech-request-row"
                  onClick={() => setSelectedRequest(req)}
                >
                  <span className="tech-request-cell">
                    <span
                      className={`tech-status-circle ${getStatusColor(req.status)}`}
                      style={{ marginRight: '8px' }}
                    ></span>
                  </span>
  
                  <span className="tech-request-cell">{req.category}</span>
  
                  <span className="tech-request-cell">
                    {getUrgencyText(req.urgency)}
                  </span>
  
                  <span className="tech-request-cell tech-request-id">
                    Request #{req.id}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
  
  

  if (pageState === addRequestPage) {
    return (
      <div>

      </div>
    );
  }

  if (pageState === userPage) {
    return (
      <>
        <div className="tech-client-requests-page">
          <h2 className="tech-client-requests-page-title">My Requests</h2>

          {error && <p className="tech-error">{error}</p>}

          {requests.length === 0 ? (
            <p className="tech-no-requests">No requests yet.</p>
          ) : (
            <div className="tech-requests-list">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="tech-request-row"
                  onClick={() => setSelectedRequest(req)}
                >
                  <span
                    className={`tech-status-circle ${getStatusColor(
                      req.content
                    )}`}
                  ></span>
                  <span className="tech-request-category">{req.content}</span>
                  <span className="tech-request-id"> Request #{req.id}</span>
                </div>
              ))}
            </div>
          )}

          <div className="tech-add-request-container">
            <button className="tech-buttons" onClick={handleAddRequest}>
              Add Request +
            </button>
          </div>
        </div>

        {/* view request popup */}
        {selectedRequest && (
          <>
            <div
              className="tech-view-request-overlay"
              onClick={() => setSelectedRequest(null)}
            ></div>

            <div className="tech-view-request">
              <h3 className="tech-view-request-title">
                {selectedRequest.category || "Request Category"}
              </h3>
              <p className="tech-view-request-subtitle">Date 31.3.25 | Time 14:00</p>
              <div className="tech-view-request-history">
                <p className="tech-view-request-message">
                  <span className="tech-bold-label">You:</span>{" "}
                  {selectedRequest.content}
                </p>
                <p className="tech-view-request-message">
                  <span className="tech-bold-label">Support:</span> We're checking
                  this issue.
                </p>
              </div>
              <textarea
                className="tech-view-request-textbox"
                placeholder="Write your reply here..."
              />

              <div className="tech-view-request-buttons">
                <button className="tech-buttons" onClick={handleSendMessage}>
                  Send
                </button>

                <button
                  className="tech-buttons"
                  onClick={() => setSelectedRequest(null)}
                >
                  Back
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <div className="home-container">
      <h2>Loading...</h2>
      <img src="/loading-ts.gif"></img>
    </div>
  );
}
