import { useContext } from 'react';
import { StoreContext } from '../store/StoreContext';
import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import '../App.css';

export default function TechSupportPage() {
  const { user } = useContext(StoreContext); // Gets the logged in user from the context
  
  // Page states
  const agentPage = 1;
  const userPage = 2;
  const addRequestPage = 3;
  const loadingScreen = 5;

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [addedId, setAddedId] = useState(null);

  const [requests, setRequests] = useState([]);

  // page state modifier.
  const [pageState, setPageState] = useState(5);

  let tempUrl = '/ts/techsupportadd/?name=';

  // Checking if the user is an Agent
  useEffect(() => { 
  async function getPageType() {

    if (!user?.email) // Prevent error if user or user.email is undefined
      return;

    const res = await api.get("/ts/techsupportisagent/?email=" + user?.email);

    if (res?.data.agent === true)
      setPageState(userPage); // change back.
    else
      setPageState(userPage);
  }

  getPageType();
}, [user?.email]);
  
  // Loading requests from the DB
  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await api.get("/ts/techsupport");
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load support requests");
      }
    }

    fetchRequests();
  }, []);
  
  // Function to determine color by content (fake status)
  const getStatusColor = (content) => {
    return "red"; // Closed (default)
  };
  
  // Clicking the Add Request button
  const handleAddRequest = () => {
    alert("Add Request button was clicked");
  };

  if (pageState === agentPage) {
    return (
      <div className='home-container'>
        <h1> You are an agent! {user?.email}. </h1>
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
      <div className="client-requests-page">
        <h2 className="client-requests-page-title">My Requests</h2>
    
        {error && <p className="error">{error}</p>}
    
        {requests.length === 0 ? (
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
    
        <div className="add-request-container">
          <button className="add-request-btn" onClick={handleAddRequest}>
            Add Request +
          </button>
        </div>
      </div>
    )};
    

  return (
    <div className='home-container'>
      <h2>Loading...</h2>
        <img src='/loading-ts.gif'></img>
    </div>
  );
}
