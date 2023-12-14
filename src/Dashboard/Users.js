import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import '../styles/UsersDashboard.css';
import Admin from '../assets/Admin2.jpg';

const Users = ({admin}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const apiUrl = `/users`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container" id="users-div">
      <Menu />
      <div className="page-content">
        <div className="header">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div onClick={handleOpenModal} className="user-info">
            <img src={Admin} alt="User Avatar" />
            {admin?(<span>{admin.username.toUpperCase()}</span>): (<span>ADMIN</span>)}
            
          </div>
        </div>
        {isModalOpen && (
                <div className="modal-overlay">
                  <div className="modal">
                    <button onClick={handleCloseModal}>X</button>
                    <h2>admin</h2>
                    <p>admin@admin</p>
                  </div>
                </div>
              )}
        <div>
          {loading ? (
            <p className="loading">Loading...</p>
          ) : (
            <>
              <h1>Users</h1>
              <table id="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Username</th>
                    {/* <th>Email</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.full_name}</td>
                      <td>{user.username}</td>
                      {/* <td>{user.email}</td> */}
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

export default Users;
