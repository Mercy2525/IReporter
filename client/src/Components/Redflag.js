import React, { useState, useEffect } from 'react';
import '../styles/Redflag.css'
import { useParams } from 'react-router-dom';

const RedFlag = () => {
  const {id} = useParams
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
  }, [id]);

  const handleInputChange = (e) => {
    setRedFlagData({
      ...redFlagData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = 1;
    fetch('http://127.0.0.1:5555/redflags/user/' + userId, {
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

  // 
  return (
    <div>
      <h2>Red-Flag Records</h2>
      <div>
  {loading ? (
    <p>Loading...</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Location</th>
          <th>Status</th>
          <th>Created at</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {redFlags.map((redFlag) => (
          <tr key={redFlag.id}>
            <td>{redFlag.status}</td>
            <td>Description content goes here...</td>
            <td>{redFlag.location}</td>
            <td>{redFlag.status}</td>
            <td>{redFlag.created_at}</td>
            <td>
              <img src={redFlag.image} alt="" />
            </td>
            <td>
              <button >Edit</button>
              <button >Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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

