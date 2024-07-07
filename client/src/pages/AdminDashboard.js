import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pending users:', error);
        setError('Error fetching pending users: ' + (error.response?.data?.error || error.message));
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const approveUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/users/${id}/approve`, { status: 'approved' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Failed to approve user:', error);
      setError('Failed to approve user: ' + (error.response?.data?.error || error.message));
    }
  };

  const rejectUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/users/${id}/approve`, { status: 'rejected' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Failed to reject user:', error);
      setError('Failed to reject user: ' + (error.response?.data?.error || error.message));
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} ({user.email})
            <button onClick={() => approveUser(user._id)}>Approve</button>
            <button onClick={() => rejectUser(user._id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
