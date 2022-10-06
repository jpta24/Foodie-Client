import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css'
import './custom.scss';

import App from './App';
import { AuthProviderWrapper } from './context/auth.context';
import {CartProviderWrapper} from './context/cart.context'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <CartProviderWrapper>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </CartProviderWrapper>
    </Router>
  </React.StrictMode>
);
