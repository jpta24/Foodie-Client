import { Routes, Route } from "react-router-dom";
import './App.css';

import { ToastContainer } from 'react-toastify';
import IsAnon from "./components/IsAnon";
import Navbar from "./components/Nabvar";
import IsPrivate from "./components/IsPrivate";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import CreateBusiness from "./pages/CreateBusiness";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import BusinessView from "./pages/BusinessView";
import BusinessProducts from "./pages/BusinessProducts";
import CreateProduct from "./pages/CreateProduct";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="App">
    <Navbar/>
    <div>
    <ToastContainer />
    </div>
      <Routes>      
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route exact path="/login" element={<IsAnon><LoginPage /></IsAnon>} />  
        <Route exact path="/dashboard" element={<IsPrivate><Dashboard /></IsPrivate>} />
        <Route exact path="/profile/:userID" element={<IsPrivate><ProfilePage /></IsPrivate>} />
        <Route exact path="/create-business" element={<IsPrivate><CreateBusiness /></IsPrivate>} />
        <Route exact path="/product/:productID" element={<ProductDetails />} />
        <Route exact path="/:businessName/dashboard" element={<IsPrivate><BusinessView /></IsPrivate>} />
        <Route exact path="/:businessName/products" element={<IsPrivate><BusinessProducts /></IsPrivate>} />
        <Route exact path="/:businessName/create-product" element={<IsPrivate><CreateProduct /></IsPrivate>} />
        <Route exact path="/errorPage" element={<ErrorPage />} /> 
      </Routes>
      
    </div>
  );
}

export default App;
