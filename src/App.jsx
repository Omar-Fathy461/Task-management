import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Test from './components/Test'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {

  return (
    <Router>
      <div className='app'>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path='/' element={<Test />} />
              <Route path='/main' element={<Test />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </ Router>
  )
}

export default App
