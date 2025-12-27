import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './Component/Navbar';
import Dashboard from './Pages/Dashboard';
import LeadForm from './Component/LeadForm';
import About from './Pages/About';
const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
             <Route path='/leads' element={<LeadForm/>}></Route>
             <Route path='/about' element={<About/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
