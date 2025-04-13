import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";

const Profile = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [userPlan, setUserPlan] = useState({})
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate()// State to control modal visibility


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Generate a preview URL
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', selectedFile);

    try {
      const response = await axios.post(
        'http://localhost:5500/api/v1/gym/upload-profile-picture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setUploadMessage(response.data.message);
      setPreviewUrl(response.data.profilePictureUrl); // Update with server's saved URL
      setShowModal(false);
      getUser()
      // Close modal after successful upload
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.error
          ? error.response.data.error
          : 'Failed to upload profile picture.';
      setUploadMessage(errorMessage);
    }
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5500/api/v1/gym/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserInfo(response.data.user);
      setUserPlan(response.data.user.planId || null)
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch user info');
      setLoading(false);
    }
  };

  const calculateRemainingDays = (endDate) => {
    if (!endDate) return 0;
    
    const now = new Date();
    const end = new Date(endDate);
    
    // Calculate difference in milliseconds
    const differenceInTime = end.getTime() - now.getTime();
    
    // Convert to days and round to nearest whole number
    const remainingDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    
    // Return 0 if subscription has expired
    return Math.max(0, remainingDays);
  };

  // Calculate days remaining
  const daysRemaining = calculateRemainingDays(userInfo.subscriptionEnd);

  // Add an effect to update days remaining periodically
  useEffect(() => {
    // Update days remaining every day at midnight
    const updateInterval = setInterval(() => {
      if (userInfo.subscriptionEnd) {
        const remaining = calculateRemainingDays(userInfo.subscriptionEnd);
        // Force re-render by updating state
        setUserInfo(prev => ({...prev}));
      }
    }, 24 * 60 * 60 * 1000); // 24 hours

    return () => clearInterval(updateInterval);
  }, [userInfo.subscriptionEnd]);

  useEffect(() => {
    getUser();
  }, []);
  if(!isLoggedIn) return navigate('/')
  if (loading) return <p style={{ textAlign: 'center', fontSize: '40px' }}>Loading...</p>;
  if (error) return <p>{error}</p>;
  

  return (
    <>
    <div className="back-btn" onClick={() => navigate('/')}>
    
<IoReturnUpBack size={30}/>
<span>Back</span> 
    </div>
    <div className="profile-container">
    
      <div className="profile-header">
        <img
          src={ userInfo && userInfo.profilePicture ? `http://localhost:5500${userInfo.profilePicture}` :' /defaultProfile.png'}
          alt="Profile"
          className="profile-image"
        />
        <h2 className="username">{userInfo.username}</h2>
      </div>

      <div className="subscription-info">
        <h3>Subscription Details</h3>
        <p>
          Plan: <span>{userPlan? userPlan.name : "Not a member"}</span>
        </p>
        <p>
          Days Remaining: <span>{daysRemaining || 0}</span>
        </p>
        <p>
          Status:{" "}
          <span
            
            className={userInfo.subscriptionStatus == 'active' ? 'Active': 'inactive'}
          >
            {userInfo.subscriptionStatus}
          </span>
        </p>
      </div>

      <button className="upload-btn" onClick={() => setShowModal(true)}>
        Upload Profile Picture
      </button>

      {/* Modal for file upload */}
      {showModal && (
        <div className="prof-modal">
          <div className="prof-modal-content">
            <span className="prof-close-btn" onClick={() => setShowModal(false)}><IoClose/></span>
            <h3>Select Profile Picture</h3>
            <form onSubmit={handleUpload}>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button type="submit" className="upload-btn">
                Upload
              </button>
            </form>
            {previewUrl && (
              <div style={{ marginTop: '20px' }}>
                <h3>Preview:</h3>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{ maxWidth: '150px', borderRadius: '50%' }}
                />
              </div>
            )}
            {uploadMessage && <p>{uploadMessage}</p>}
          </div>
        </div>
      )}
    </div>
    </>
    
  );
};

export default Profile;
