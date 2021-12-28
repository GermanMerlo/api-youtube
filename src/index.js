import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css';
import App from './App';
import VideoDetail from './pages/videoDetail/videoDetail';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>  
      <Route path="videoDetail" element={<VideoDetail/>}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);