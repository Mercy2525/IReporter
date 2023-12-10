import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import '../styles/InterventionDashboard.css';
import Admin from '../assets/Admin2.jpg';



const Intervention = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [intervention, setIntervention] = useState([]);
  const [editedStatus, setEditedStatus] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 

  const filteredInterventions = intervention.filter((intervention) =>
  intervention.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInterventions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



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
    setCurrentPage(1);
  };

  const handleEdit = async (record) => {
    setEditedStatus(record.status);
    setSelectedRecord(record);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          <div onClick={handleOpenModal} className="user-info">
            <img src={Admin} alt="Admin" />
            <span>ADMIN</span>
          </div>
        </div>
        {isModalOpen && (
                <div className="modal-overlay">
                  <div className="modal">
                    <button onClick={handleCloseModal}>X</button>
                    <p>Admin</p>
                    <p>admin@admin</p>
                  </div>
                </div>
              )}
        <div>
          {loading ? (
            <p className="loading">Loading...</p>
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
                  {currentItems.map((intervention) => (
                    <tr key={intervention.id}>
                      <td>{intervention.id}</td>
                      <td>{intervention.title}</td>
                      <td>{intervention.description}</td>
                      <td>
                        <img id="table-img" src={intervention.image} alt={intervention.title} />
                      </td>
                      <td>{intervention.created_at}</td>
                      <td>{selectedRecord && selectedRecord.id === intervention.id ? (
                          <>
                            <select
                              value={editedStatus}
                              onChange={(e) => setEditedStatus(e.target.value)}
                            >
                              <option></option>
                              <option value="under investigation">Under Investigation</option>
                              <option value="resolved">Resolved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                            <button className="edit-status" onClick={handleSaveEdit}>Save</button>
                            <button className="edit-status" onClick={() => setSelectedRecord(null)}>Cancel</button>
                          </>
                        ) : (
                          intervention.status
                        )}</td>
                      <td id="crud-btns" onClick={() => handleEdit(intervention)}>
                        <button>Change status</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: Math.ceil(filteredInterventions.length / itemsPerPage) }, (_, i) => (
                  <button id="page-number" key={i + 1} onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredInterventions.length / itemsPerPage)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Intervention;
