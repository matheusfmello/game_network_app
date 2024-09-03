import {React, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './AccountPage.css';
import axios from 'axios';

const EditableField = ({label, value}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);
  const originalValue = value;

  const handleEditCancelButton = () => {
    if (isEditing) {
      setFieldValue(originalValue)
    }
    setIsEditing(!isEditing);
  }

  const handleSaveButton = async () => {
    await onSave(fieldValue);
    setIsEditing(false);
  };

  return (
    <div className='editable-field'>
      <label>{label}</label>
      <input
        type='text'
        value={fieldValue}
        onChange={(e) => {setFieldValue(e.target.value)}}
      />
      <button onClick={handleEditCancelButton}>{! isEditing ? 'Edit' : 'Cancel'}</button>
      <button onClick={handleSaveButton}>Save</button>
    </div>
  )
}

const AccountPage = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get('http://localhost:3333/account', {
        withCredentials: true,
      });
      setUser(response.data);
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  const handleSave = async (field, newValue) => {
    try {
      const response = await axios.put(
        `http://localhost:3333/account`,
        { [field]: newValue },
        { withCredentials: true }
      );
      setUser((prevUser) => ({ ...prevUser, [field]: newValue }));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="AccountPage">
      <h2>Account Information</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <EditableField
            label="Username"
            value={user.username}
            onSave={(newValue) => handleSave('username', newValue)}
          />
          <EditableField
            label="Name"
            value={user.name}
            onSave={(newValue) => handleSave('name', newValue)}
          />
          <EditableField
            label="Email"
            value={user.email}
            onSave={(newValue) => handleSave('email', newValue)}
          />
          <EditableField
            label="Bio"
            value={user.bio}
            onSave={(newValue) => handleSave('bio', newValue)}
          />
        </>
      )}
    </div>
  );
};

export default AccountPage;
