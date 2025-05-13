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

  //form fields
  const [userType, setUserType] = useState('');
  const [issueCategory, setIssueCategory] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  
  const [previews, setPreviews] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [messageColor, setMessageColor] = useState('');
  

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

      if (res?.data.agent === true) setPageState(userPage);
      else setPageState(userPage);
    }

    getPageType();
  }, [user?.email, requests?.length]);

  // Loading requests from the DB
  useEffect(() => {
    async function fetchRequests() {

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
      else { 
        try {
          const res = await api.get("/ts/techsupportfetchuserrequests/?email=" + user?.email);
          setRequests(res.data.userRequest);
        } catch (err) {
          console.error(err);
          setError("Failed to load support requests");
        }
      }
    }

    fetchRequests();
  }, [pageState != loadingScreen]);


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

  // Function to determine color by content
  const getStatusColor = (status) => {
    if (status === 1)
      return 'green';
    if (status === 2)
      return 'orange';
    else 
      return 'red';
  };


// segev --------------------

    
// Handle file change and preview
const handleFileChange = (e) => {
  const selectedFiles = Array.from(e.target.files);
  setFiles(selectedFiles);

  const previewImages = [];
  selectedFiles.forEach((file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      previewImages.push(reader.result);
      if (previewImages.length === selectedFiles.length) {
        setPreviews(previewImages);
      }
    };
    reader.readAsDataURL(file);
  });
};

// Get urgency based on category
const getUrgency = (category) => {
  const urgencyMap = {
    "Security concern": "High",
    "Crash or freezing issue": "High",
    "Installation issue": "High",
    "Update or version issue": "Medium",
    "Integration issue with third-party software": "Medium",
    "Bug report": "Medium",
    "Performance issue": "Low",
    "Other": "Low"
  };
  return urgencyMap[category] || "Low";
};

const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);

// Handle form submit
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!userType || !issueCategory || description.length < 10) {
    setMessageText("Please fill out all required fields correctly.");
    setMessageColor("red");
    return;
  }

  if (files.length > 4) {
    setMessageText("You can upload up to 4 images only.");
    setMessageColor("red");
    return;
  }

  for (let file of files) {
    if (file.size > 3 * 1024 * 1024) {
      setMessageText("Each image must be under 3MB.");
      setMessageColor("red");
      return;
    }

    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      setMessageText("Only JPG, PNG, and GIF files are allowed.");
      setMessageColor("red");
      return;
    }
  }

  const base64Images = await Promise.all(
    files.map((file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      })
    )
  );

  const requestId = `REQ-${Date.now()}`;
  const submissionTime = new Date().toLocaleString();

  const requestData = {
    requestId,
    userType,
    issueCategory,
    description,
    urgency: getUrgency(issueCategory),
    submissionTime,
    images: base64Images
  };

  let storedRequests = JSON.parse(localStorage.getItem("supportRequests")) || [];
  storedRequests.push(requestData);
  localStorage.setItem("supportRequests", JSON.stringify(storedRequests));

  setMessageText(`Request ${requestId} submitted successfully!`);
  setMessageColor("green");
  setFormSubmittedSuccessfully(true);

  // Reset the form
  setUserType('');
  setIssueCategory('');
  setDescription('');
  setFiles([]);
  setPreviews([]);
};

// Reset form manually
const resetForm = () => {
  setUserType('');
  setIssueCategory('');
  setDescription('');
  setFiles([]);
  setPreviews([]);
  setMessageText('');
  setFormSubmittedSuccessfully(false);
  setPageState(userPage); // חזרה לעמוד הראשי
};
  
  const handleAddRequest = () => {
    setFormSubmittedSuccessfully(false); 
    setPageState(addRequestPage);
  };


  // segev-----------------------------

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
      <div className="tech-form-container">
        <h1>Contact Technical Support</h1>
  
        {formSubmittedSuccessfully ? (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <h2 style={{ color: 'green' }}>Thank you for contacting us!</h2>
            <p>We have received your request and will get back to you shortly.</p>
            <button className="tech-buttons" onClick={resetForm}>
              Back to My Requests
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* User Type */}
            <label>User Type:</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="">Select...</option>
              <option value="before">Before Purchase</option>
              <option value="after">After Purchase</option>
            </select>
  
            {/* Issue Category */}
            <label>Issue Category:</label>
            <select
              value={issueCategory}
              onChange={(e) => setIssueCategory(e.target.value)}
              required
            >
              <option value="">Select an issue</option>
              <option value="Security concern">Security concern</option>
              <option value="Crash or freezing issue">Crash or freezing issue</option>
              <option value="Installation issue">Installation issue</option>
              <option value="Update or version issue">Update or version issue</option>
              <option value="Integration issue with third-party software">Integration issue with third-party software</option>
              <option value="Performance issue">Performance issue</option>
              <option value="Bug report">Bug report</option>
              <option value="Other">Other</option>
            </select>
  
            {/* Description */}
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minLength={10}
              maxLength={2000}
              required
            />
  
            {/* Upload Images */}
            <label>Upload Images (up to 4):</label>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.gif"
              onChange={handleFileChange}
            />
  
            {/* Previews */}
            <div id="tech-filePreview">
              {previews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  style={{ width: '100px', margin: '5px' }}
                />
              ))}
            </div>
  
            {/* Buttons */}
            <div className="tech-button-group">
              <button className="tech-buttons" type="submit">
                Submit
              </button>
              <button
                className="tech-buttons"
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
  
        {/* Message display */}
        {!formSubmittedSuccessfully && (
          <div id="tech-message" style={{ color: messageColor }}>
            {messageText}
          </div>
        )}
      </div>
    );
  }
  
  if (pageState === userPage) {
    return (
      <>
        <div className="tech-client-requests-page">
          <h2 className="tech-client-requests-page-title">My Requests</h2>

          {error && <p className="tech-error">{error}</p>}

          {requests?.length === 0 ? (
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
                      req.status
                    )}`}
                  ></span>
                  <span className="tech-request-category">{req.category}</span>
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
