import { Routes, Route } from "react-router-dom";
import './App.css';

import { ToastContainer } from 'react-toastify';
import IsAnon from "./components/IsAnon";
import Navbar from "./components/Nabvar";
import IsPrivate from "./components/IsPrivate";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
// import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import CreateBusiness from "./pages/CreateBusiness";

function App() {
  return (
    <div className="App">
    <Navbar/>
    <div>
    <ToastContainer />
    </div>
      <Routes>      
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/dashboard" element={<IsPrivate><Dashboard /></IsPrivate>} />
        <Route exact path="/create-business" element={<IsPrivate><CreateBusiness /></IsPrivate>} />
        <Route exact path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route exact path="/login" element={<IsAnon><LoginPage /></IsAnon>} />     
      </Routes>
      
    </div>
  );
}

export default App;
