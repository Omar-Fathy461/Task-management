// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
import Test from './components/Test'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Register'
import Login from './components/Login'
import Spinner from './components/Spinner/Spinner';
import 'animate.css';
// import Header from "./layout/header/header"
// import Center from "./layout/Center"
// import Empty from "./components/Empty"
// import { createBrowserRouter, RouterProvider } from "react-router-dom"
//components
// import RootLayout from "./components/RootLayout"

//style
import './App.css'
// import { setBoardActive } from "./store/slices/boardsSlice";

import { useEffect, useState } from 'react';
import { auth } from './auth/firebase';

function App() {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user)
      setLoading(false);
    })
  }, [])

  if (loading) {
    return <Spinner />; // عرض الـ Spinner أثناء التحميل
  }

  // const [boardModalOpen, setBoardModalOpen] = useState(false);
  // const dispatch = useDispatch();
  // const boards = useSelector((state) => state.boards);
  // const activeBoard = boards.find((board) => board.isActive);
  // if (!activeBoard && boards.length > 0) {
  //   dispatch(setBoardActive({ index: 0 }))
  // }

  return (
    // <RouterProvider router={router} />
    <Router>
      <div className='app'>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path='/' element={user ? <Navigate to='/main' /> : <Login />} />
              <Route path='/Register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/main' element={<Test />} />
              {/* <Route path='/Register' element={<Register />} /> */}
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </ Router>
    // <div className="overflow-hidden scrollbar-hide overflow-x-scroll dark:bg-[#20212c] ">
    //   <>
    //     {boards.length > 0 ?
    //       <>
    //         <Header boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen} />
    //         <Center boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen} />
    //       </> :
    //       <>
    //         <Empty type='add' />
    //       </>
    //     }
    //   </>
    // </div>
    // <Test />

  )
}

export default App
