import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import VideoDetail from './pages/videoDetail/videoDetail';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import allReducers from './reducers'

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>  
        <Route path="/videoDetail/:videoId" element={<VideoDetail/>}/>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);