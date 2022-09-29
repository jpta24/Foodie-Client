import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../context/auth.context';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };
 
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
      // Request to the server's endpoint `/auth/login` returns a response
      // with the JWT string ->  response.data.authToken
        // console.log('JWT token', response.data.authToken );
        storeToken(response.data.authToken) // store in my localStorage the authToken
        authenticateUser() // verify token is valid to get the user information from the server 
        navigate('/');                               
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleLoginSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <br />

        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
