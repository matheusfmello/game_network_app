import {React, useEffect, useState} from 'react';
import './AccountPage.css';
import axios from 'axios';

const EditableField = ({label, value, originalUsername, onSave}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEditCancelButton = () => {
    if (isEditing) {
      setFieldValue(originalValue)
    }
    setIsEditing(!isEditing);
  }

  const handleSaveButton = async () => {
    const result = await onSave(fieldValue);
    if (result && result.error) {
      setError(true);
      setErrorMessage(result.message);
    } else {
      setIsEditing(false);
      setError(false);
      setErrorMessage('');
    }
  };

  return (
    <div className='editable-field'>
      <label>{label}</label>
      <input
        type='text'
        value={fieldValue}
        onChange={(e) => {setFieldValue(e.target.value)}}
        readOnly={!isEditing}
      />
      {error && (
        <p style={{color:'red'}}>{errorMessage}</p>
      )}
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

  const handleSave = async (field, newValue, originalUsername) => {
    try {
      const response = await axios.put(
        `http://localhost:3333/user/${originalUsername}`,
        { [field]: newValue },
        { withCredentials: true }
      );
      setUser((prevUser) => ({ ...prevUser, [field]: newValue }));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleSaveUser = async (field, newUsername, originalUsername) => {
    try {
      const response = await axios.get(
        `http://localhost:3333/user/${newUsername}`
      );
      if (response.status === 200) {
        console.log(response);
        return { error: true, message: `Username '${response.data.username}' already exists` };
      } else if (response.status === 204) {
        await handleSave(field, newUsername, originalUsername);
        return { error: false, message: '' };
      }
    } catch (error) {
      console.error('Could not check database for existing users');
      return { error: true, message: 'Could not check database for existing users' };
    }
  }

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
            originalUsername={user.username}
            onSave={(newValue) => handleSaveUser('username', newValue, user.username)}
          />
          <EditableField
            label="Name"
            value={user.name}
            originalUsername={user.username}
            onSave={(newValue) => handleSave('name', newValue)}
          />
          <EditableField
            label="Email"
            value={user.email}
            originalUsername={user.username}
            onSave={(newValue) => handleSave('email', newValue)}
          />
          <EditableField
            label="Bio"
            value={user.bio}
            originalUsername={user.username}
            onSave={(newValue) => handleSave('bio', newValue)}
          />
        </>
      )}
    </div>
  );
};

export default AccountPage;
