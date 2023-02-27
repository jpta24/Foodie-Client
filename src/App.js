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
import EditProduct from "./pages/EditProduct";
import RedirectPage from "./pages/RedirectPage";
import EditBusiness from "./pages/EditBusiness";
import About from "./pages/AboutUs";

function App() {
  return (
    <div className="App">
    <div className="background-shapes"></div>
    <Navbar/>
    <div>
    <ToastContainer className='my-5 ztoast'/>
    </div>
      <Routes>      
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/about-us" element={<About />} />
        <Route exact path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route exact path="/login" element={<IsAnon><LoginPage /></IsAnon>} />  
        <Route exact path="/signup/:businessName" element={<IsAnon><SignupBizPage /></IsAnon>} />
        <Route exact path="/login/:businessName" element={<IsAnon><LoginBizPage /></IsAnon>} />  
        <Route exact path="/dashboard/:userID" element={<IsPrivate><Dashboard /></IsPrivate>} />
        <Route exact path="/profile/:userID" element={<IsPrivate><ProfilePage /></IsPrivate>} />
        <Route exact path="/create-business" element={<IsPrivate><CreateBusiness /></IsPrivate>} />        
        <Route exact path="/edit-business/:businessName" element={<IsPrivate><EditBusiness /></IsPrivate>} />
        <Route exact path="/cart/:userID" element={<IsPrivate><CartPage /></IsPrivate>} />
        <Route exact path="/orders/:userID" element={<IsPrivate><OrdersPage /></IsPrivate>} />
        <Route exact path="/product/:productID" element={<ProductDetails />} />
        <Route exact path="/redirect" element={<IsPrivate><RedirectPage /></IsPrivate>} />
        <Route exact path="/mySavedProducts" element={<IsPrivate><RedirectPage /></IsPrivate>} />
        <Route exact path="/myVisitedBusiness" element={<IsPrivate><RedirectPage /></IsPrivate>} />
        <Route exact path="/:businessName" element={<Business />} />
        <Route exact path="/:businessName/dashboard" element={<IsPrivate><BusinessView /></IsPrivate>} />
        <Route exact path="/:businessName/products" element={<IsPrivate><BusinessProducts /></IsPrivate>} />
        <Route exact path="/:businessName/create-product" element={<IsPrivate><CreateProduct /></IsPrivate>} />
        <Route exact path="/:businessName/edit-product/:productID" element={<IsPrivate><EditProduct/></IsPrivate>} />
        <Route exact path="/:businessName/orders" element={<IsPrivate><BusinessOrders /></IsPrivate>} />
        <Route exact path="/errorPage" element={<ErrorPage />} /> 
      </Routes>
      
    </div>
  );
}

export default App;
