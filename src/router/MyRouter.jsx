import { Route, Routes } from 'react-router-dom'
import { CATEGORIES, ADMIN, SIGNUP, LOGIN, ACCOUNT, FAVOURITES, SEARCH, DETAILS, CHANGEPASS, ARTIST, ALBUM, PLAYLIST, RECOVER } from './paths'
import { Register, Login, Search } from '../components';
import { AccountSettingsPage } from '../pages/AccountSettingsPage';
import { ChangePasswordPage } from '../pages/ChangePasswordPage';
import { DetailsPage } from '../pages/DetailsPage';
import { AdminPage } from '../pages/AdminPage';
import { CategoriesPage } from '../pages/CategoriesPage';
import { HomePage } from '../pages/HomePage';
import PrivateRoute from '../router/PrivateRoute/PrivateRoute';
import { FavouritesPage } from '../pages/FavouritesPage';
import ListContent from '../components/Categories/ListContent/ListContent';
import { ArtistsPage } from '../pages/ArtistsPage';
import { AlbumsPage } from '../pages/AlbumsPage';
import { PlaylistsPage } from '../pages/PlaylistsPage';
import { RecoverPage } from '../pages/RecoverPage';
import { PrivateAdminRoute } from './PrivateAdminRoute/PrivateAdminRoute';


export const MyRouter = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<HomePage />} />
        <Route path={`${SIGNUP}`} element={<Register />} />
        <Route path={`${LOGIN}`} element={<Login />} />
        <Route path={`${CATEGORIES}`} element=
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

        <Route path={`${SEARCH}`} element={<Search />} />
        <Route path={`${ARTIST}`} element={<ArtistsPage />} />
        <Route path={`${ALBUM}`} element={<AlbumsPage />} />
        <Route path={`${RECOVER}`} element={<RecoverPage />} />
        <Route path={`${PLAYLIST}`} element={<PlaylistsPage />} />
        <Route path={`${DETAILS}`}>
          <Route path=':type/:id' element={<DetailsPage />} />
        </Route>


        <Route path={`${ADMIN}`} element={
          <PrivateAdminRoute>
            <AdminPage />
          </PrivateAdminRoute>
        } />


        <Route path={`${ACCOUNT}`} element=
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

        <Route path={`${FAVOURITES}`} element=
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
