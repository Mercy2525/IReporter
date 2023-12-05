import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import '../styles/RedflagDashboard.css';
import Admin from'../assets/Admin2.jpg';

const Redflag = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [redflags, setRedflags] = useState([]);

  const [editedStatus, setEditedStatus] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

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

  const handleEdit = async (record) => {
    setEditedStatus(record.status);
    setSelectedRecord(record);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`https://ireporter-backend.onrender.com/redflags/${selectedRecord.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: editedStatus,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Record edited successfully:', data);
        setSelectedRecord(null);
      } else {
        console.error('Error editing record:', data);
      }
    } catch (error) {
      console.error('Error editing record:', error);
    }
  };


  return (
    <div id="redflag-div">
      <Menu />
      <div id="hero-redflag">
        <div className="header">
          <div>
            <input
              type="text"
              placeholder="Search redflags..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="user-info">
            <img src={Admin} alt="User Avatar" />
            <span>ADMIN</span>
          </div>
        </div>
        <div>
          {loading ? (
            <p className="loading">Loading...</p>
          ) : (
            <>
              <h1>Redflags</h1>
              <table id="redflag-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Created At</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {redflags.map((redflag) => (
                    <tr key={redflag.id}>
                      <td>{redflag.id}</td>
                      <td>{redflag.title}</td>
                      <td>{redflag.description}</td>
                      <td><img src={redflag.image} /></td>
                      <td>{redflag.created_at}</td>
                      <td>{redflag.status}</td>                
                      <td id="crud-btns">
                        <button onClick={() => handleEdit(redflag)}>Change status</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedRecord && (
                <>
                  <div>
                    <h2>Edit Redflag Record</h2>
                    <label>Status:</label>
                    <select
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value)}
                    >
                      <option></option>
                      <option value="under investigation">Under Investigation</option>
                      <option value="resolved">Resolved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button onClick={handleSaveEdit}>Save Changes</button>
                    <button onClick={() => setSelectedRecord(null)}>Cancel</button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Redflag;
