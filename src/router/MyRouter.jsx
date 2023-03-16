import { Route, Routes } from 'react-router-dom'
import { CategoriesPage } from '../pages/CategoriesPage'
import { HomePage } from '../pages/HomePage'
import Register from '../pages/Register'
import { SIGNUP } from './paths'
import { RadioPage } from '../pages/RadioPage'
import { VideoPage } from '../pages/VideoPage'


export const MyRouter = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<HomePage />} />
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='/radio' element={<RadioPage />} />
        <Route path='/video' element={<VideoPage />} />
            <Route path={`/${SIGNUP}`} element={<Register />} />
      </Route>

    </Routes>
  )
}
