import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import Register from '../pages/Register'
import { SIGNUP } from './paths'


export const MyRouter = () => {
  return (
    <Routes>
        <Route path='/'>
            <Route index element={<HomePage/>}/>
            <Route path={`/${SIGNUP}`} element={<Register />} />
        </Route>
    </Routes>
  )
}
