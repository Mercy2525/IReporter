import React, { useState, useEffect } from 'react';
import '../styles/Redflag.css'

const RedFlag = ({user}) => {
  console.log(user);
  const [redFlags, setRedFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redFlagData, setRedFlagData] = useState({
    title: '',
    description: '',
    location: '',
    images: [],
    videos: [],
  });

  useEffect(() => {
    const apiUrl = 'https://ireporter-backend.onrender.com/redflags';
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRedFlags(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setRedFlagData({
      ...redFlagData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    fetch('https://ireporter-backend.onrender.com/redflags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(redFlagData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);

        setRedFlagData({
          title: '',
          description: '',
          location: '',
          images: [],
          videos: [],
        });
      })
      .catch((error) => {
        console.error('Error posting redflag:', error);
      });
  };

  return (
    <div>
      <h2>Red-Flag Records</h2>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          redFlags.map((redFlag) => (
            <div key={redFlag.id}>
              <h3>Title: {redFlag.status}</h3>
              <p>Description: </p>
              <p>Location: {redFlag.location}</p>
              <p>Status: {redFlag.status}</p>
              <p>Created at: {redFlag.created_at}</p>
              <img src={redFlag.image} alt="" />
            </div>
          ))
        )}
      </div>
      <p>
        If you have witnessed an incident linked to corruption, please use this form to report the details.
        Your contribution helps in promoting transparency and fighting against corruption in our community.
      </p>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" onChange={handleInputChange} required />

        <label>Description:</label>
        <textarea name="description" onChange={handleInputChange} required />

        <label>Location:</label>
        <input type="text" name="location" onChange={handleInputChange} required />

        <label>Images:</label>
        <input type="text" onChange={handleInputChange} />

        <label>Videos:</label>
        <input type="text" onChange={handleInputChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RedFlag;

