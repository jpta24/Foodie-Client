import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {  
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [campus, setCampus] = useState("");
  const [course, setCourse] = useState("")
  const [errorMessage, setErrorMessage] = useState(undefined);

  
  
  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleCampus = (e) => setCampus(e.target.value);
  const handleCourse = (e) => setCourse(e.target.value);
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { username, password, campus, course };
 
    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignupSubmit}>
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
 
        <label>Campus:</label>
        <input 
          type="text"
          name="campus"
          value={campus}
          onChange={handleCampus}
        />

        <label>Course:</label>
        <input 
          type="text"
          name="course"
          value={course}
          onChange={handleCourse}
        />

        <br/>
 
        <button type="submit">Sign Up</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
      
    </div>
  )
}

export default Signup