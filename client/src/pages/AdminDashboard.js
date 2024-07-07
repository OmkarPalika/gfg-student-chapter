import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post('http://localhost:5000/api/refresh-token', { refreshToken });
    return response.data.token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        localStorage.setItem('token', newToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/users?approvalStatus=pending');
      setUsers(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching users:', error.response?.data || error.message);
      setError('Error fetching users: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUserAction = async (id, action) => {
    try {
      await api.put(`/users/${id}/approve`, { status: action });
      setUsers(users.filter(user => user._id !== id));
      setError('');
    } catch (error) {
      console.error(`Failed to ${action} user:`, error);
      setError(`Failed to ${action} user: ` + (error.response?.data?.message || error.message));
    }
  };

  const approveUser = (id) => handleUserAction(id, 'approved');
  const rejectUser = (id) => handleUserAction(id, 'rejected');

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && <p className="error-message">{error}</p>}
      {users.length === 0 ? (
        <p>No pending users to display.</p>
      ) : (
        <ul className="user-list">
          {users.map(user => (
            <li key={user._id} className="user-item">
              <span className="user-info">{user.name} ({user.email})</span>
              <div className="user-actions">
                <button onClick={() => approveUser(user._id)} className="approve-btn">Approve</button>
                <button onClick={() => rejectUser(user._id)} className="reject-btn">Reject</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={fetchUsers} className="refresh-btn">Refresh Users</button>
    </div>
  );
};

export default AdminDashboard;
