import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { LOGIN, SIGNUP } from './paths'


export const MyRouter = () => {
  return (
    <Routes>
        <Route path='/'>
            <Route index element={<HomePage/>}/>
            <Route path={`/${SIGNUP}`} element={<Register />} />
            <Route path={`/${LOGIN}`} element={<Login />} />

        </Route>
    </Routes>
  )
}
