import { useState } from 'react'
import './App.css'
import Calendario from './components/Calendario/Calendario.jsx'
import AdminLogin from './components/AdminLogin/AdminLogin.jsx';
import AdminPanel from './components/AdminPanel/AdminPanel.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
   return (
     <div className="app-container">
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Calendario />} />
        <Route path='/Login' element={<AdminLogin />} />
        <Route path='/admin-panel' element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
       </div>
   )
 }

export default App
