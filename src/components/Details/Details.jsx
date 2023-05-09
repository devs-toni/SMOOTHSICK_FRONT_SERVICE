import { useParams } from 'react-router-dom'
import { FILTER_TYPES } from '../Search/filterTypes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArtistHeader, FavouritesSongCard, HomeSongCard, Section } from '../index';
import { ArtistOptions } from '../index';
import { useFetchAllAlbums } from '../../hooks';
import { useLanguage } from '../../context/LanguageContext';
import { v4 as uuidv4 } from 'uuid';
import { BsClock } from 'react-icons/bs';
import { usePlayer } from '../../context/PlayerContext';


export const Details = () => {

  const { type, id } = useParams();
  const { text } = useLanguage();
  const [data, setData] = useState({});
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const { playerState } = usePlayer();
    

  const getDetails = async () => {
    switch (type.charAt(0).toUpperCase() + type.slice(1)) {
      case FILTER_TYPES.ALBUMS:
        return axios.get(import.meta.env.VITE_BACKEND + "albums/" + id)
          .then(({ data }) => {
            setData(data);
          })

      case FILTER_TYPES.ARTISTS:
        await axios.get(import.meta.env.VITE_BACKEND + "artists/" + id)
          .then(({ data }) => {
            setData({
              id: data.id,
              title: data.name,
              total: data.nb_album,
              picture: data.picture,
              fans: data.nb_fan
            });
          });
        await axios.get(import.meta.env.VITE_BACKEND + "tracks/top/" + id)
          .then(({ data }) => {
            setTracks(data);
          })
        await axios.get(import.meta.env.VITE_BACKEND + "albums/top/" + id)
          .then(({ data }) => {
            setAlbums(data);
          })
        break;


      case FILTER_TYPES.PLAYLISTS:
        let finalData = [];
        await axios.get(import.meta.env.VITE_BACKEND + "playlists/" + id)
          .then(async ({ data }) => {
            const image = data.picture
            setData({
              id: data.id,
              title: data.title,
              total: data.nb_tracks,
              picture: data.picture,
              fans: data.fans

            });
            await Promise.all(data.tracklist.map(async (id) => {
              await axios.get(import.meta.env.VITE_BACKEND + "tracks/" + id)
                .then(({ data }) => {

                  const newData = {
                    ...data,
                    album_cover: image
                  }
                  finalData.push(newData)
                })
            }))
            setTracks(finalData);
            
          })


      case FILTER_TYPES.TRACKS:
        break;
    }
  }

  useEffect(() => {
    getDetails();
  }, [])


  return (
    <div className='flex justify-center'>
      <div className="sm:w-full flex flex-col items-center justify-center mt-10 md:mt-24 overflow-hidden z-10 md:ml-20 lg:ml-52">
        {
          Object.keys(data).length > 0
            ?
            FILTER_TYPES.ARTISTS === type.charAt(0).toUpperCase() + type.slice(1)
              ?
              (
                <>
                  <div className="sm:w-full flex flex-col items-center justify-center mt-10 md:mt-12 overflow-hidden z-10">
                    <div className='max-w-81rem'>
                      <ArtistHeader img={data.picture} name={data.title} fans={data.fans} isLike={true} />
                      <ArtistOptions />
                      <div>
                        <Section tracks={tracks} targetClass="artists-tracks" />
                      </div>
                      <div>
                        <div>
                          {
                            albums.length > 0 &&
                            <>
                              <h1 className='albums__title'>{text.filters.albums}</h1>
                              <div className='albums__section'>
                                {
                                  albums.map(obj => {
                                    return (
                                      <HomeSongCard
                                        key={uuidv4()}
                                        obj={obj}
                                        targetClass="albums"
                                        type={FILTER_TYPES.ALBUMS}
                                      />
                                    )
                                  })
                                }
                              </div>
                            </>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
              :
              FILTER_TYPES.ALBUMS === type.charAt(0).toUpperCase() + type.slice(1)
                ?
                (
                  <>
                    <div className='sm:w-full flex flex-col items-center justify-center mt-10 md:mt-12 overflow-hidden z-10'></div>
                    <div className='max-w-81rem'>
                      <ArtistHeader img={data.picture} name={data.title} fans={data.fans} isLike={true} />
                    </div>
                    <div className="z-5 flex flex-col h-25 text-center justify-center w-8/6 min-w-[100%] ">
                      <div className='flex items-center justify-between border-b border-b-gray-300'>
                        <p className="w-1/12">#</p>
                        <p className="w-2/12">{text.liked.track}</p>
                        <p className="w-2/12"></p>
                        <p className="w-3/12">Options</p>
                        <p className="w-3/12">{text.liked.album_table}</p>
                        <p className="w-2/12">{text.liked.gender}</p>
                        <p className="w-2/12"><BsClock className='w-11/12' /></p>
                      </div>
                    </div>
                    {
                        tracks.length > 0 && tracks.map((track, index) => {
                          return (
                            <FavouritesSongCard
                              key={uuidv4()}
                              track={track}
                              count={index}
                            />
                          )
                        })
                      }

                  </>
                )
                :
                (
                  <>
                    <div className="sm:w-full flex flex-col items-center justify-center mt-10 md:mt-12 overflow-hidden z-10">
                      <div className='max-w-81rem'>
                        <ArtistHeader img={data.picture} name={data.title} fans={data.fans} isLike={true}  tracks={tracks}/>
                      </div>
                      <div className="z-5 flex flex-col h-25 text-center justify-center w-8/6 min-w-[100%] ">
                        <div className='flex items-center justify-between border-b border-b-gray-300'>
                          <p className="w-1/12">#</p>
                          <p className="w-2/12">{text.liked.track}</p>
                          <p className="w-2/12"></p>
                          <p className="w-3/12">Options</p>
                          <p className="w-3/12">{text.liked.album_table}</p>
                          <p className="w-2/12">{text.liked.gender}</p>
                          <p className="w-2/12"><BsClock className='w-11/12' /></p>
                        </div>
                      </div>
                      {
                        tracks.length > 0 && tracks.map((track, index) => {
                          return (
                            <FavouritesSongCard
                              key={uuidv4()}
                              track={track}
                              count={index}
                            />
                          )
                        })
                      }
                    </div>



                  </>
                )
            :
            <p>Cargando</p>
        }
      </div>
    </div>
  )
}