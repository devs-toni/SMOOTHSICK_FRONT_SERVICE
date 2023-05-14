import { Route, Routes } from 'react-router-dom'
import { ADMIN, SIGNUP, LOGIN, ACCOUNT, FAVOURITES, SEARCH, DETAILS, CHANGEPASS, ARTIST, ALBUM, PLAYLIST, RECOVERY, MYSONGS, HOME, CATEGORIES } from './paths'
import { AccountSettingsPage } from '../pages/AccountSettingsPage';
import { ChangePasswordPage } from '../pages/ChangePasswordPage';
import { DetailsPage } from '../pages/DetailsPage';
import { AdminPage } from '../pages/AdminPage';
import { CategoriesPage } from '../pages/CategoriesPage';
import { HomePage } from '../pages/HomePage';
import { PrivateRoute } from '../router/PrivateRoute/PrivateRoute';
import { FavouritesPage } from '../pages/FavouritesPage';
import { ArtistsPage } from '../pages/ArtistsPage';
import { AlbumsPage } from '../pages/AlbumsPage';
import { ComunityPlaylistsPage } from '../pages/ComunityPlaylistsPage';
import { RecoverPage } from '../pages/RecoverPage';
import { PrivateAdminRoute } from './PrivateAdminRoute/PrivateAdminRoute';
import { MySongsPage } from '../pages/MySongsPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { SearchPage } from '../pages/SearchPage';
import { ListContent } from '../components';


export const MyRouter = () => {
  return (
    <Routes>
      <Route path={HOME}>
        <Route index element={<HomePage />} />
        <Route path={LOGIN} element={<LoginPage />} />
        <Route path={SIGNUP} element={<RegisterPage />} />
        <Route path={SEARCH} element={<SearchPage />} />
        <Route path={ARTIST} element={<ArtistsPage />} />
        <Route path={ALBUM} element={<AlbumsPage />} />

        <Route path={CATEGORIES} element={<CategoriesPage />} >
          <Route path=":path" element={<ComunityPlaylistsPage />} />
          <Route path=":path" element={<FavouritesPage />} />
          <Route path=":path" element={<MySongsPage />} />
        </Route>
        <Route path={`${CATEGORIES}${PLAYLIST}/:id`} element={<ListContent />} />





        <Route path={DETAILS}>
          <Route path=':type/:id' element={<DetailsPage />} />
        </Route>

        <Route path={RECOVERY}>
          <Route path=':userId/:userToken' element={<RecoverPage />} />
        </Route>


        <Route path={ADMIN} element=
          {
            <PrivateAdminRoute>
              <AdminPage />
            </PrivateAdminRoute>
          }
        />


        <Route path={ACCOUNT} element=
          {
            <PrivateRoute>
              <AccountSettingsPage />
            </PrivateRoute>
          }
        />

        <Route path={MYSONGS} element=
          {
            <PrivateRoute>
              <MySongsPage />
            </PrivateRoute>
          }
        />

        <Route path={`${ACCOUNT}${CHANGEPASS}`} element=
          {
            <PrivateRoute>
              <ChangePasswordPage />
            </PrivateRoute>
          }
        />

        <Route path={FAVOURITES} element=
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
