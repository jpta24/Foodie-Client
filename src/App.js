import { Routes, Route } from "react-router-dom";

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
import Business from "./pages/Business";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import BusinessOrders from "./pages/BusinessOrders";
import LoginBizPage from "./pages/LoginBizPage";
import SignupBizPage from "./pages/SignupBizPage";

function App() {
  return (
    <div className="App">
    <div className="background-shapes"></div>
    <Navbar/>
    <div>
    <ToastContainer className='my-5'/>
    </div>
      <Routes>      
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route exact path="/login" element={<IsAnon><LoginPage /></IsAnon>} />  
        <Route exact path="/signup/:businessName" element={<IsAnon><SignupBizPage /></IsAnon>} />
        <Route exact path="/login/:businessName" element={<IsAnon><LoginBizPage /></IsAnon>} />  
        <Route exact path="/dashboard" element={<IsPrivate><Dashboard /></IsPrivate>} />
        <Route exact path="/profile/:userID" element={<IsPrivate><ProfilePage /></IsPrivate>} />
        <Route exact path="/create-business" element={<IsPrivate><CreateBusiness /></IsPrivate>} />
        <Route exact path="/cart/:userID" element={<IsPrivate><CartPage /></IsPrivate>} />
        <Route exact path="/orders/:userID" element={<IsPrivate><OrdersPage /></IsPrivate>} />
        <Route exact path="/product/:productID" element={<ProductDetails />} />
        <Route exact path="/:businessName" element={<Business />} />
        <Route exact path="/:businessName/dashboard" element={<IsPrivate><BusinessView /></IsPrivate>} />
        <Route exact path="/:businessName/products" element={<IsPrivate><BusinessProducts /></IsPrivate>} />
        <Route exact path="/:businessName/create-product" element={<IsPrivate><CreateProduct /></IsPrivate>} />
        <Route exact path="/:businessName/orders" element={<IsPrivate><BusinessOrders /></IsPrivate>} />
        <Route exact path="/errorPage" element={<ErrorPage />} /> 
      </Routes>
      
    </div>
  );
}

export default App;
