import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Agent from './Agent'
import Profile from './Profile'

export default function Dashboard() {
  return (
    <>
    <Routes>
        <Route path="/agent" element={<Agent />} />
        <Route path="/profile" element={<Profile />} />
    </Routes>
    </>
  )
}
