import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PageNotFount from './pages/PageNotFount'
import Auth from './pages/Auth'
import Project from './pages/Project'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import 'react-toastify/dist/ReactToastify.css';


function App() {


  return (
    <>
      {/* <Header/> */}

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/project' element={<Project/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/login' element={<Auth/>} />
        <Route path='/register' element={<Auth register />} />
        {/* get PageNotFount on any path rather than the defined path */}
        <Route path='*' element={<PageNotFount/>} />  
      </Routes>

      <Footer/>
    </>
  )
}

export default App
