import { useAuthContext } from '../../context/AuthContext';
import { useGlobalContext } from '../../context/GlobalContext';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import './Home.css';
import Slider from '../Slider/Slider';
import Cover from '../Cover/Cover';
import { useFetchAllHomeArtists } from '../../hooks';
import { useFetchAllHomeAlbums } from '../../hooks';
import { useFetchAllHomePlaylists } from '../../hooks';
import { useFetchAllHomeTracks } from '../../hooks';
import { FILTER_TYPES } from '../Search/filterTypes';


const Home = () => {

  const { text } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  const { artists, artistsLoaded } = useFetchAllHomeArtists();
  const { albums, albumsLoaded } = useFetchAllHomeAlbums();
  const { playlists, playlistsLoaded } = useFetchAllHomePlaylists();
  const { tracks, tracksLoaded } = useFetchAllHomeTracks();


  const { authState, resetFirstTime } = useAuthContext();
  const { dataState } = useGlobalContext();

  useEffect(() => {
    if (authState.firstTime) {
      toast.success('Log in successfully!',
        {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 2000
          }
        }
      )
      resetFirstTime();
    }
  }, [])

  return (
    <div className='pb-20 main-home'>
      <div className="home">
        <div className="first-row">
          <Slider
            name="The best!"
            list={artistsLoaded && artists}
            type={FILTER_TYPES.ARTISTS}
            isFirstRowSection={true}
          />
        </div>
        <div className="w-full">
          <div className="home__carousel">
            <Cover
              loaded={loaded}
              setLoaded={setLoaded}
            />
          </div>
          {/*           <div className='home__sections'>
            <Section
              tracks={selectedTracks}
              loaded={loaded}
            />
            <Section
              tracks={selectedTracks}
              loaded={loaded}
            />
          </div> */}
        </div>
        <div className="rows">
          <Slider
            name={text.filters.playlists}
            list={playlistsLoaded && playlists}
            type={FILTER_TYPES.PLAYLISTS}
          />
          <Slider
            name={text.filters.tracks}
            list={tracksLoaded && tracks}
            type={FILTER_TYPES.TRACKS}
          />
          <Slider
            name={text.filters.albums}
            list={albumsLoaded && albums}
            type={FILTER_TYPES.ALBUMS}
          />
          <Slider
            name={text.filters.artists}
            list={artistsLoaded && artists}
            type={FILTER_TYPES.ARTISTS}
          />

        </div>
      </div>
      <div className={`transition-img ${loaded ? 'loaded' : ''}`} style={{
        backgroundImage: `url(https://www.mondosonoro.com/wp-content/uploads/2016/02/zoo.jpg)`
      }}></div>
    </div>
  )
}

export default Home;