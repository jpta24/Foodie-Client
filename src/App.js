import { Routes, Route } from "react-router-dom";
import './App.css';
import IsAnon from "./components/IsAnon";
import Navbar from "./components/Navbar";
// import IsPrivate from "./components/IsPrivate";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
// import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div className="App">
    <Navbar/>
      <Routes>      
        <Route exact path="/" element={<HomePage />} />
        {/* <Route exact path="/profile" element={<IsPrivate><ProfilePage /></IsPrivate>} /> */}
        <Route exact path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route exact path="/login" element={<IsAnon><LoginPage /></IsAnon>} /> 
              
      </Routes>
    </div>
  );
}

export default App;
