import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Adding from './pages/Adding'
import EditStatus from './pages/Edit'


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <main >
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signUpD" element={<Registration/>}/>
          <Route path='/dispJobsD' element={<Home/>}/>
          <Route path='/detailsD' element={<Landing/>} />
          <Route path='/addP' element={<Adding/>}/>
          <Route path='/editPa' element={<EditStatus/>}/>
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
