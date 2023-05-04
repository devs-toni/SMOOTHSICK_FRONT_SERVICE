import { Route, Routes } from 'react-router-dom'
import { CATEGORIES, RADIO, SIGNUP, LOGIN, VIDEO, ACCOUNT, FAVOURITES, SEARCH, DETAILS, CHANGEPASS, ARTIST, ALBUM } from './paths'
import { Register, Login, Search } from '../components';
import { AccountSettingsPage } from '../pages/AccountSettingsPage';
import { ChangePasswordPage } from '../pages/ChangePasswordPage';
import { DetailsPage } from '../pages/DetailsPage';
import { RadioPage } from '../pages/RadioPage';
import { VideoPage } from '../pages/VideoPage';
import { CategoriesPage } from '../pages/CategoriesPage';
import { HomePage } from '../pages/HomePage';
import PrivateRoute from '../router/PrivateRoute/PrivateRoute';
import { FavouritesPage } from '../pages/FavouritesPage';
import ListContent from '../components/Categories/ListContent/ListContent';
import { ArtistsPage } from '../pages/ArtistsPage';
import { AlbumsPage } from '../pages/AlbumsPage';


export const MyRouter = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<HomePage />} />
        <Route path={`/${SIGNUP}`} element={<Register />} />
        <Route path={`/${LOGIN}`} element={<Login />} />
        <Route path={`/${CATEGORIES}`} element=
          {
            <PrivateRoute>
              <CategoriesPage />
            </PrivateRoute>
          }
        />

        <Route path={`${CATEGORIES}/:name`} element=
          {
            <PrivateRoute>
              <ListContent />
            </PrivateRoute>
          }
        />



        <Route path={`/${VIDEO}`} element={<VideoPage />} />
        <Route path={`/${RADIO}`} element={<RadioPage />} />
        <Route path={`/${SEARCH}`} element={<Search />} />
        <Route path={`/${ARTIST}`} element={<ArtistsPage />} />
        <Route path={`/${ALBUM}`} element={<AlbumsPage />} />
        <Route path={`/${DETAILS}`}>
          <Route path=':type/:id' element={<DetailsPage />} />
        </Route>




        <Route path={`/${ACCOUNT}`} element=
          {
            <PrivateRoute>
              <AccountSettingsPage />
            </PrivateRoute>
          }
        />

        <Route path={`${ACCOUNT}/${CHANGEPASS}`} element={
          <PrivateRoute>
            <ChangePasswordPage />
          </PrivateRoute>
        } />

        <Route path={`/${FAVOURITES}`} element=
          {
            <PrivateRoute>
              <FavouritesPage />
            </PrivateRoute>
          }
        />

      </Route>
    </Routes>
  )
}
