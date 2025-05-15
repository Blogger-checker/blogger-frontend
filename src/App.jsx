import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './component/Navbar'
import Submitform from './pages/Submitform'
import Dashboard from './pages/Dashboard'
import Blogslist from './pages/Blogslist';
import BlogView from './pages/BlogView';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <Route path="/blogs/:id" element={<BlogView/>}/>
          </Routes>  
       </Router>
      </div> 
      <ToastContainer position="top-right" />
    </>
  )
}

export default App
