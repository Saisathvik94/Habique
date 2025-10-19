import React from 'react'
import './App.css'
import Nav from './components/Navbar'
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-calendar/dist/Calendar.css';

function App() {
  return(
    <div className="w-full">
      <Router>
        <Nav/>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
