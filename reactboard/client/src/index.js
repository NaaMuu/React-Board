import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import View from './components/View';
import Write from './components/Write';
import Edit from './components/Edit';
import Delete from './components/Delete';
import DeleteView from './components/DeleteView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/View/:num" element={<View />} />
        <Route path="/Write" element={<Write />} />
        <Route path="/Edit/:num" element={<Edit />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/delete/:num" element={<DeleteView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();