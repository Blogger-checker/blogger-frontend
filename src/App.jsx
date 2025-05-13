import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './component/Navbar'
import Submitform from './pages/Submitform'
import Dashboard from './pages/Dashboard'
import Blogslist from './pages/Blogslist';

function App() {

  return (
    <>
      <div className='main'>
       <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Submitform/>}/>
            <Route path='/blog-list' element={<Blogslist/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>  
       </Router>
      </div> 
    </>
  )
}

export default App
