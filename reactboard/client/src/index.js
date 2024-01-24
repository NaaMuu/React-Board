import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import View from './components/View'
import Write from './components/Write'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/View/:num" element={<View />} />
      <Route path="/Write" element={<Write />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();