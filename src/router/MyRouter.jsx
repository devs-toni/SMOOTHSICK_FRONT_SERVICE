import React from 'react'
import { Route, Routes } from 'react-router'
import { HomePage } from '../pages/HomePage'


export const MyRouter = () => {
  return (
    <Routes>
        <Route path='/'>
            <Route index element={<HomePage/>}/>
        </Route>
    </Routes>
  )
}
