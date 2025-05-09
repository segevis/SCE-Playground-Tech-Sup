import { useContext } from 'react';
import { StoreContext } from '../store/StoreContext';
import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import '../App.css';

export default function TechSupport() {
  const { user } = useContext(StoreContext);

  const agentPage = 1;
  const userPage = 2;
  const loadingScreen = 5;

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [addedId, setAddedId] = useState(null);

  // page state modifier.
  const [pageState, setPageState] = useState(5);

  let tempUrl = '/ts/techsupportadd/?name=';

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      tempUrl += name +'&content=' + content;
      const response = await api.post(tempUrl);
      const { id } = response.data;
      setAddedId(response.data);
      //console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'post request failed');
    }
  }

  useEffect(() => {
  async function getPageType() {

    if (!user?.email) // ignore strict mode triple call.
      return;

    const res = await api.get("/ts/techsupportisagent/?email=" + user?.email);

    if (res?.data.agent === true)
      setPageState(agentPage);
    else
      setPageState(userPage);
  }

  getPageType();
}, [user?.email]);

  if (pageState === agentPage) {
    return (
      <div className='home-container'>
        <h1> You are an agent! {user?.email}. </h1>
      </div>
    );
  }

  if (pageState === userPage) {
    return (
      <div className='home-container'>
        <h1> You are an user! {user?.email}. </h1>
      </div>
    );
  }

  return (
    <div className='home-container'>
      <h2>Loading...</h2>
        <img src='/loading-ts.gif'></img>
    </div>
  );
}