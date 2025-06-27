import { useState } from 'react'
import './App.css'
import Calendario from './components/Calendario/Calendario.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
   return (
     <div className="app-container">
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Calendario />} />
      </Routes>
    </BrowserRouter>
       </div>
   )
 }

export default App
