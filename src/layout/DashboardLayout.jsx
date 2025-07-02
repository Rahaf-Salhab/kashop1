import React from 'react'
import { Outlet } from 'react-router'

export default function DashboardLayout() {

  return (
    <>
    <h1>Admin Page</h1>
    <Outlet />
    <p>End Admin Page</p>
    </>
   )
}
