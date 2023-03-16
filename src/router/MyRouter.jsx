import { Route, Routes } from 'react-router-dom'
import { CategoriesPage } from '../pages/CategoriesPage'
import { HomePage } from '../pages/HomePage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { CATEGORIES, RADIO, SIGNUP,LOGIN, VIDEO, ACCOUNT } from './paths'
import { RadioPage } from '../pages/RadioPage'
import { VideoPage } from '../pages/VideoPage'
import { AccountSettingsPage } from '../pages/AccountSettingsPage'


export const MyRouter = () => {
  return (
    <Routes>
        <Route path='/'>
            <Route index element={<HomePage/>}/>
            <Route path={`/${SIGNUP}`} element={<Register />} />
            <Route path={`/${LOGIN}`} element={<Login />} />
            <Route path={`/${CATEGORIES}`} element={<CategoriesPage />} />
            <Route path={`/${VIDEO}`} element={<VideoPage />} />
            <Route path={`/${RADIO}`} element={<RadioPage />} />
            <Route path={`/${ACCOUNT}`} element={<AccountSettingsPage />} />
        </Route>
    </Routes>
  )
}
