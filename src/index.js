import {StrictMode} from "react";
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import App from './App';

import './index.css';
//import alert css for delete contact part
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//react-toastify-106 episode
import 'react-toastify/dist/ReactToastify.css';

//bootstrap
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min";
// import 'bootstrap/dist/js/bootstrap.bundle';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
      <BrowserRouter basename="contacts-manager-app">
          <App />
      </BrowserRouter>
  </StrictMode>
);

