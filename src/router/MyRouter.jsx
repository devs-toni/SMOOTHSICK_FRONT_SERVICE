import { Route, Routes } from 'react-router-dom'
import { CATEGORIES, RADIO, SIGNUP, LOGIN, VIDEO, ACCOUNT, FAVOURITES, SEARCH } from './paths'
import { Register, Login, HomePage, CategoriesPage, VideoPage, RadioPage, FavouritesPage, Search, AccountSettingsPage, PrivateRoute } from '../index';


export const MyRouter = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<HomePage />} />
        <Route path={`/${SIGNUP}`} element={<Register />} />
        <Route path={`/${LOGIN}`} element={<Login />} />
        <Route path={`/${CATEGORIES}`} element={<CategoriesPage />} />
        <Route path={`/${VIDEO}`} element={<VideoPage />} />
        <Route path={`/${RADIO}`} element={<RadioPage />} />
        <Route path={`/${FAVOURITES}`} element={<FavouritesPage />} />
        <Route path={`/${SEARCH}`} element={<Search />} />

        <Route path={`/${ACCOUNT}`} element=
          {
            <PrivateRoute>
              <AccountSettingsPage />

            </PrivateRoute>
          }
        />

      </Route>
    </Routes>
  )
}
