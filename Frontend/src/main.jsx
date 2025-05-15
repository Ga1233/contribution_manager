import React from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './index.jsx'

import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/ReactToastify.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

// import React from 'react'
// import ReactDOM from 'react-dom'
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import reportWebVitals from './reportWebVitals'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
