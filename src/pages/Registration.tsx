import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import bgImg from "../assets/backgroundImg.jpg"

interface User {
  id: string;
  username: string;
  password: string;
  dateRegistered: Date;
}

const Registration = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  
  const validateUsername = (username: string): boolean => {
    return username.length >= 3 && username.length <= 20;
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const checkUserExists = (username: string): boolean => {
    const existingUsers = localStorage.getItem('users');
    if (!existingUsers) return false;
    
    const users: User[] = JSON.parse(existingUsers);
    return users.some(user => user.username.toLowerCase() === username.toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (!validateUsername(username)) {
      setError('Username must be between 3 and 20 characters');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (checkUserExists(username)) {
      setError('Username already exists. Please choose a different one.');
      return;
    }

    
    const newUser: User = {
      id: Date.now().toString(), 
      username: username.trim(),
      password: password, 
      dateRegistered: new Date()
    };

    
    const existingUsers = localStorage.getItem('users');
    const users: User[] = existingUsers ? JSON.parse(existingUsers) : [];

    
    users.push(newUser);

    
    try {
      localStorage.setItem('users', JSON.stringify(users));
      setSuccess('Registration successful! You can now log in.');
      
      
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      
      
      setTimeout(() => {
        
      }, 2000);
      
    } catch (error) {
      setError('Failed to save user data. Please try again.');
      console.error('LocalStorage error:', error);
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  return (
    <div style={mainStyle}>
      <div style={cardStyle}>
        <h2>Sign Up to <strong>JobBuddy</strong></h2>
        
        {error && <div style={errorStyle}>{error}</div>}
        {success && <div style={successStyle}>{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label style={lblSt}>
                    Username: <br />
                    <input
                      style={inputStyle}
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username (3-20 characters)"
                      required
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label style={lblSt}>
                    Password: <br />
                    <input
                      style={inputStyle}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password (min 6 characters)"
                      required
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label style={lblSt}>
                    Confirm Password: <br />
                    <input
                      style={inputStyle}
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                    />
                  </label>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>
                  <button type="submit" style={btnStyle}>
                    Sign Up
                  </button>
                  <button type="button" onClick={handleReset} style={resetBtnStyle}>
                    Reset
                  </button>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center', paddingTop: '10px' }}>
                    <hr />
                    Already have an account?
                    
                  <span style={{ margin: '0 10px' }}>|</span>
                  <Link to="/" style={signBtnSt}>
                     Login
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  )
}

export default Registration


const mainStyle: React.CSSProperties = {
  backgroundColor: '#fdf5c7ff',
  height: "95vh",
  width: "99.5vw",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${bgImg})`,
  color: "#e4e4e4"

}

const cardStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  width: "35%",
  height: "70%", 
  justifySelf: "right",
  position: "absolute",
  top: "12%", 
  marginRight: '6%',
  borderRadius: "5%",
  display: "flex",
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  backdropFilter: "blur(11px)", 
  boxShadow: "5px 5px 5px 4px #00a8e8",
}

const lblSt: React.CSSProperties = {
  fontSize: "1.3rem",
  marginBottom: "10px",
  display: "block"
}

const inputStyle: React.CSSProperties = {
  width: "25rem",
  height: '1.6rem',
  borderRadius: "0.5rem",
  backgroundColor: "#c8ecfaff",
  boxShadow: "2px 2px 2px",
  borderColor: "transparent",
  padding: "5px",
  marginBottom: "15px"
}

const btnStyle: React.CSSProperties = {
  marginTop: "4%",
  width: "45%",
  height: "2rem",
  borderRadius: '0.4rem',
  borderColor: "#00a8e8",
  boxShadow: "2px 2px 2px",
  backgroundColor: "transparent",
  color: "#00a8e8",
  fontSize: "1rem",
  cursor: "pointer",
  marginRight: "10px"
}

const resetBtnStyle: React.CSSProperties = {
  marginTop: "4%",
  width: "35%",
  height: "2rem",
  borderRadius: '0.4rem',
  borderColor: "transparent",
  boxShadow: "2px 2px 2px",
  backgroundColor: "#f44336",
  color: "white",
  fontSize: "1rem",
  cursor: "pointer"
}

const signBtnSt: React.CSSProperties = {
  padding: "7px 35px",
  borderRadius: "0.5rem",
  borderColor: "#00a8e8",
  backgroundColor: "transparent",
  boxShadow: "2px 2px 2px",
  textDecoration: "none",
  color: "#00a8e8",
  fontSize: "0.9rem"
}


const errorStyle: React.CSSProperties = {
  backgroundColor: "#ffebee",
  color: "#c62828",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ef5350",
  marginBottom: "15px",
  width: "90%",
  textAlign: "center"
}

const successStyle: React.CSSProperties = {
  backgroundColor: "#e8f5e8",
  color: "#2e7d32",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #4caf50",
  marginBottom: "15px",
  width: "90%",
  textAlign: "center"
}