import { Route, Routes } from 'react-router-dom'
import { ADMIN, SIGNUP, LOGIN, ACCOUNT, FAVOURITES, SEARCH, DETAILS, CHANGEPASS, ARTIST, ALBUM, PLAYLIST, RECOVERY, MYSONGS, PLAYLISTS } from './paths'
import { Register, Login, Search, ComunityPlaylists } from '../components';
import { AccountSettingsPage } from '../pages/AccountSettingsPage';
import { ChangePasswordPage } from '../pages/ChangePasswordPage';
import { DetailsPage } from '../pages/DetailsPage';
import { AdminPage } from '../pages/AdminPage';
import { PlaylistsPage } from '../pages/PlaylistsPage';
import { HomePage } from '../pages/HomePage';
import PrivateRoute from '../router/PrivateRoute/PrivateRoute';
import { FavouritesPage } from '../pages/FavouritesPage';
import ListContent from '../components/Categories/ListContent/ListContent';
import { ArtistsPage } from '../pages/ArtistsPage';
import { AlbumsPage } from '../pages/AlbumsPage';
import { ComunityPlaylistsPage } from '../pages/ComunityPlaylistsPage';
import { RecoverPage } from '../pages/RecoverPage';
import { PrivateAdminRoute } from './PrivateAdminRoute/PrivateAdminRoute';
import MySongsPage from '../pages/MySongsPage';


export const MyRouter = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<HomePage />} />
        <Route path={`${SIGNUP}`} element={<Register />} />
        <Route path={`${LOGIN}`} element={<Login />} />
        <Route path={`${PLAYLISTS}`} element={<PlaylistsPage />} />

        <Route path={`${PLAYLISTS}/:name`} element=
          {
            <PrivateRoute>
              <ListContent />
            </PrivateRoute>
          }
        />

        <Route path={`${SEARCH}`} element={<Search />} />
        <Route path={`${ARTIST}`} element={<ArtistsPage />} />
        <Route path={`${ALBUM}`} element={<AlbumsPage />} />
        <Route path={`${PLAYLIST}`} element={<ComunityPlaylistsPage />} />
        <Route path={`${DETAILS}`}>
          <Route path=':type/:id' element={<DetailsPage />} />
        </Route>

        <Route path={`${RECOVERY}`}>
          <Route path=':userId/:userToken' element={<RecoverPage />} />
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

        <Route path={`${MYSONGS}`} element=
          {
            <PrivateRoute>
              <MySongsPage />
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
