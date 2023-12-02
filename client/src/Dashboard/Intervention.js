import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import '../styles/InterventionDashboard.css';

const Intervention = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [intervention, setIntervention] = useState([]);

  useEffect(() => {
    const apiUrl = `https://ireporter-backend.onrender.com/intervention`;
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
          <div>
            <img src="" alt="Admin" />
            <span>ADMIN</span>
          </div>
        </div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h1>Interventions</h1>
              <table>
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
                  {intervention.map((interventions) => (
                    <tr key={interventions.id}>
                      <td>{interventions.id}</td>
                      <td>{interventions.title}</td>
                      <td>{interventions.description}</td>
                      <td>{interventions.image}</td>
                      <td>{interventions.video}</td>
                      <td>{interventions.status}</td>
                      <td>{interventions.created_at}</td>
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

export default Intervention;