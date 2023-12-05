import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import '../styles/InterventionDashboard.css';
import Admin from'../assets/Admin2.jpg';

const Intervention = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [intervention, setIntervention] = useState([]);

  const [editedStatus, setEditedStatus] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const apiUrl = `/intervention`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setIntervention(data);
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
      const response = await fetch(`/intervention/${selectedRecord.id}`, {
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
    <div id="intervention-div">
      <Menu />
      <div>
        <div className="header">
          <div>
            <input
              type="text"
              placeholder="Search interventions..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="user-info">
            <img src={Admin} alt="Admin" />
            <span>ADMIN</span>
          </div>
        </div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h1>Interventions</h1>
              <table id="intervention-table">
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
                  {intervention.map((interventions) => (
                    <tr key={interventions.id}>
                      <td>{interventions.id}</td>
                      <td>{interventions.title}</td>
                      <td>{interventions.description}</td>
                      <td><img id="table-img" src={interventions.image} /></td>
                      <td>{interventions.created_at}</td>
                      <td>{interventions.status}</td>                     
                      <td id="crud-btns">
                        <button onClick={() => handleEdit(interventions)}>Change status</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedRecord && (
                <>
                  <div>
                    <h2>Edit Redflag Status</h2>
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

export default Intervention;