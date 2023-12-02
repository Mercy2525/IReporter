import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import '../styles/Redflag.css';

const Redflag = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [redflags, setRedflags] = useState([]);

  useEffect(() => {
    const apiUrl = `https://ireporter-backend.onrender.com/redflags`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRedflags(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <Menu />
      <div id="page-content">
        <div className="header">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search redflags..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="user-info">
            <img src="" alt="User Avatar" />
            <span>ADMIN</span>
          </div>
        </div>
        <div className="redflag-table-container">
          {loading ? (
            <p className="loading">Loading...</p>
          ) : (
            <>
              <h1>Redflags</h1>
              <table className="redflag-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Video</th>
                    <th>Status</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {redflags.map((redflag) => (
                    <tr key={redflag.id}>
                      <td>{redflag.id}</td>
                      <td>{redflag.title}</td>
                      <td>{redflag.description}</td>
                      <td>{redflag.image}</td>
                      <td>{redflag.video}</td>
                      <td>{redflag.status}</td>
                      <td>{redflag.created_at}</td>
                      <td>
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Redflag;
