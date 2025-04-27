import { useContext } from 'react';
import { StoreContext } from '../store/StoreContext';
import React, { useState } from 'react';
import api from '../services/api.js';
import '../App.css';

export default function TechSupport() {
  const { user } = useContext(StoreContext);

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [addedId, setAddedId] = useState(null);

  let tempUrl = "/techsupportadd/?name=";

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      tempUrl += name + "&content=" + content;
      const response = await api.post(tempUrl);
      const { id } = response.data;
      setAddedId(response.data);
      //console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'post request failed');
    }
  }

  return (
    <div className='home-container'>
      <h1>Welcome {user?.firstName}, to Tech Support</h1>
        <form onSubmit={handleSubmit}>
            <div className='home-images'>
            <input
                    type="name"
                    value={name} 
                    placeholder="name"
                    onChange={e => setName(e.target.value)}
                    required 
                />
                </div>
                <div>
                <input 
                    type="content"
                    value={content} 
                    placeholder="content"
                    onChange={e => setContent(e.target.value)}
                    required 
                />
            </div>
            <br />
            <button className="btn-blue-tech" type="submit">Post</button>
            {addedId && (<h2>Added new post with ID: {addedId}, Welcome {user?.firstName}</h2>)}
            {error && (<p style={{ color: 'red' }}>{error}</p>)}
        </form>
    </div>
  );
}