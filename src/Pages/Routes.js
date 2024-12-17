import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Frontend from './Frontend'
import Dashboard from './Dashboard'
import Auth from './Auth'

import { useAuthContext } from 'Context/AuthContext'
import PrivateRoute from './PrivateRoutes'
// import Header from 'Components/Header'
// import Footer from 'Components/Footer'

export default function Index() {
  const isAuth = useAuthContext()
  let auth = isAuth.isAuth
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path='/*' element={<Frontend />} />
        <Route path='/dashboard/*' element={<PrivateRoute Component={Dashboard} />} />
        <Route path='/auth/*' element={!auth ? <Auth /> : <Navigate to={"/dashboard/agent"} />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}
