import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios'

const Dashboard = () => {
const [users, setUsers] = useState([])
const [error, setError] = useState('')
  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5500/api/v1/gym/dashboard', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setUsers(response.data.users)
    } catch (error) {
      setError("This route is restricted")
    }
  }


  useEffect(() => {
    getUsers()
  }, [])
  const calculateRemainingDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const differenceInTime = end.getTime() - start.getTime();
    const remainingDays = differenceInTime / (1000 * 3600 * 24);
  
    return remainingDays;
  };

  if(error) return <h1 style={{textAlign: 'center'}}>{error}</h1>
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <table className="members-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Subscription Status</th>
            <th>Days Left</th>
          </tr>
        </thead>
        <tbody>
          {users.map((member) => (
            
            <tr key={member._id}>
              <td>{member._id}</td>
              <td>{member.username}</td>
              <td
                className={
                  member.subscriptionStatus === 'active'
                    ? 'status-active'
                    : 'status-inactive'
                } 
              >
                {member.subscriptionStatus}
              </td>
              <td>{calculateRemainingDays(member.subscriptionStart, member.subscriptionEnd)}</td>
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
