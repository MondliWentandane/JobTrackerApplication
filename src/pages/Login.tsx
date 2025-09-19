import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

interface User {
  id: string;
  username: string;
  password: string;
  dateRegistered: Date;
}

interface LoginSession {
  userId: string;
  username: string;
  loginTime: Date;
  isLoggedIn: boolean;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  
  const getUsers = (): User[] => {
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) return [];
    
    try {
      return JSON.parse(storedUsers);
    } catch (error) {
      console.error('Error parsing users from localStorage:', error);
      return [];
    }
  };

  
  const authenticateUser = (username: string, password: string): User | null => {
    const users = getUsers();
    const user = users.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );
    return user || null;
  };

  
  const createLoginSession = (user: User): void => {
    const session: LoginSession = {
      userId: user.id,
      username: user.username,
      loginTime: new Date(),
      isLoggedIn: true
    };
    
    localStorage.setItem('currentSession', JSON.stringify(session));
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    
    if (!username.trim()) {
      setError('Username is required');
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError('Password is required');
      setIsLoading(false);
      return;
    }

    
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      
      const authenticatedUser = authenticateUser(username, password);

      if (authenticatedUser) {
        
        createLoginSession(authenticatedUser);
        
       
        setError('');
        
        
        navigate('/dispJobsD'); 
        
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', error);
    }

    setIsLoading(false);
  };

 
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (error) setError(''); 
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

 
  const handleReset = () => {
    setUsername('');
    setPassword('');
    setError('');
  };

  
  const hasRegisteredUsers = (): boolean => {
    return getUsers().length > 0;
  };

  return (
    <div id='allStyle'>
        <div id='sec1Style'>
          <div style={{paddingLeft:"7%"}}>
            <h1>Welcome <br />Back</h1>
            <p>
              We're excited to have you here. JobBuddy is your personal companion for tracking and
              organizing all your job applications in one simple place. Whether you're exploring 
              new opportunities, preparing for interviews, or following up on offers, we help you 
              stay on top of every step in your career journey. Start adding your applications, set reminders, and keep your progress clear and organized — so you can focus on landing the job that's right for you.
            </p>
            
            
            <div style={infoStyle}>
              <small>Registered users: {getUsers().length}</small>
            </div>
          </div>
        </div>
        
        <div id='cardStyle'>
          <div style={{paddingLeft:"2%", paddingTop:"3%"}}>
            <h3>Login</h3>
            {error && (
              <div style={errorStyle}>
                {error}
              </div>
            )}
            {!hasRegisteredUsers() && (
              <div style={warningStyle}>
                <p>No users registered yet. Please sign up first!</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label>
                        Username: <br />
                        <input
                          type="text"
                          value={username}
                          onChange={handleUsernameChange}
                          placeholder="Enter your username"
                          disabled={isLoading}
                          required
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label >
                        Password: <br />
                        <input
                          type="password"
                          value={password}
                          onChange={handlePasswordChange}
                          placeholder="Enter your password"
                          disabled={isLoading}
                          required
                        />
                      </label>                        
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button 
                        type="submit" id='btnStyle'
                        style={{
                          opacity: isLoading ? 0.6 : 1,
                          cursor: isLoading ? 'not-allowed' : 'pointer'}}
                        disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
                      
                      <button type="button" onClick={handleReset} id='resetBtnStyle'
                        disabled={isLoading}>Reset</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
            
            <div style={{marginTop: '20px'}}>
              <p>Don't have an account?</p>
              <Link to="/signUpD" id='signBtnSt'>Sign Up</Link> 
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login;

// ==== My styles below =====


// ======The style below is for the error messages by Mondli
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

const warningStyle: React.CSSProperties = {
  backgroundColor: "#fff3e0",
  color: "#e65100",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ff9800",
  marginBottom: "15px",
  width: "90%",
  textAlign: "center"
}

const infoStyle: React.CSSProperties = {
  backgroundColor: "#e3f2fd",
  color: "#1565c0",
  padding: "5px 10px",
  borderRadius: "3px",
  marginTop: "10px",
  display: "inline-block"
}

