import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Preferences from './pages/Preferences';
import Login from './pages/Login';
import useToken from './useToken';


function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return<Login setToken={setToken} />
  }
  
  return (
    <div className="App-header">
      <BrowserRouter>
        <Routes>
          
          <Route path='/dashboard' element={<Dashboard/>}>
            {/* <Dashboard /> */}
          </Route>
          <Route path='/preferences' element={<Preferences/>}>
            {/* <Dashboard /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


    // <div className="App">
    //   <header className="App-header">
    //     <Dashboard />
    //   </header>
    // </div>
export default App;
