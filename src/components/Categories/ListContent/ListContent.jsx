import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../../context/UserContext';
import { useLanguage } from '../../../context/LanguageContext';
import { BsClock, BsTrash3Fill } from 'react-icons/bs';
import { CATEGORIES, PLAYLIST, SEARCH } from '../../../router/paths';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { SongCard } from '../CategoriesSongCard/CategoriesSongCard';
import { v4 as uuidv4 } from 'uuid';
import { FaPlay } from 'react-icons/fa';
import defaultImage from '../../../assets/imgs/defaultImage.png';
import { usePlayer } from '../../../context/PlayerContext';
import { Audio } from 'react-loader-spinner';

const ListContent = () => {

  const { text } = useLanguage();
  const { getMyPlaylists, userState } = useUser();
  const { authState } = useAuth();
  const { id } = useParams()
  const navigate = useNavigate()
  const [changeIcon, setChangeIcon] = useState(<FaPlay className='hidden md:block' size={20} />)
  const { addList, addQueue, playSong, playerState } = usePlayer();


  const [tracks, setTracks] = useState([])
  const [data, setData] = useState({})
  const [playlistImage, setPlaylistImage] = useState("")


  const getPlaylistTracks = async () => {
    let finalData = [];
    await axios.get(import.meta.env.VITE_BACKEND + "playlists/" + id)
      .then(async ({ data }) => {
        const title_playlist = data.title
        setData({
          id: data.id,
          artist_name: data.title,
          total: data.nb_tracks,
          artist_picture: data.picture,
          fans: data.fans,
          description: data.description,
          picture: data.picture
        });
        await Promise.all(data.tracklist.map(async (id) => {
          await axios.get(import.meta.env.VITE_BACKEND + "tracks/image/" + id)
            .then(({ data }) => {
              if (playlistImage.length === 0) data?.album_cover ? setPlaylistImage(data.album_cover) : ""
              
              const newData = {
                ...data,
                album_cover: data.album_cover,
                title_playlist,
              }
              finalData.push(newData)
            })
        }))
        setTracks(finalData);
      })
  }

  useEffect(() => {
    getPlaylistTracks();
    
  }, [id, userState.userPlaylist])

  const handleDeletePlaylist = () => {
    axios.delete(import.meta.env.VITE_BACKEND + 'users/deletePlaylist/' + id, { headers: { "Authorization": `${authState.token}` } })
      .then(({ status, data }) => {
        if (status === 201) {
          getMyPlaylists()
          navigate(`${CATEGORIES}${PLAYLIST}`)
          toast.success(text.toast.toast4, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            error: {
              duration: 5000,
            },
          });
        } else {
          toast.error(text.toast.toast5, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            error: {
              duration: 5000,
            },
          });
        }
      })
  }

  const handleSetNewPlaylist = () => {
    playSong({
      id: tracks[0].id,
      picture: tracks[0].album_cover,
      preview: tracks[0].preview,
      name: tracks[0].title,
      artist: tracks[0].artist_name
    })
    addQueue(tracks)
    addList(tracks)
  }

  return (
    <>
      <div className="flex w-full items-center justify-center pb-12">
        <div className="w-full h-full p-6 md:ml-20 lg:ml-52 mt-14 md:mt-20">
          <div className="flex flex-col md:flex-row gap-5 lg:gap-10 h-full items-center lg:justify-start mb-12">
            <img
              src={playlistImage.length > 0 ? playlistImage : defaultImage}
              alt="User playlist picture"
              className="w-44 lg:w-52 rounded-xl object-cover"
            />
            <div className="flex flex-col gap-3">
              <span className='text-left text-xl md:text-2xl lg:text-4xl py-3 lg:pt-11'>{data.artist_name}</span>
              <div className='flex items-center gap-3'>
                <button className='w-20 md:w-36 inline-flex gap-5 justify-center items-center hover:bg-deezer-dark p-2 md:p-3 rounded-full bg-deezer' onClick={handleDeletePlaylist}>
                  <BsTrash3Fill className='hidden md:block' size={20} />
                  <span className='text-sm md:text-lg font-bold'>Delete</span>
                </button>
                <button className='w-20 md:w-36 inline-flex gap-5 justify-center items-center hover:bg-deezer-dark p-2 md:p-3 rounded-full bg-deezer' onClick={handleSetNewPlaylist} >
                  {
                    playerState.isListening
                      ?
                      <Audio
                        height="20"
                        width="20"
                        color="white"
                        wrapperClass='mb-1 mr-0'
                      />
                      :
                      <FaPlay size={20} />
                  }
                  <span className='text-sm md:text-lg font-bold'>{text.details.mix}</span>
                </button>
              </div>
            </div>
          </div>
          <div className="z-5 flex flex-col h-25 text-center justify-center w-8/6 min-w-[100%] ">
            <div className='flex items-center text-xs md:text-sm lg:text-lg justify-between border-b border-b-gray-300'>
              <span className="hidden md:block w-1/12">#</span>
              <span className="w-2/12">{text.categories.track}</span>
              <span className="w-2/12"></span>
              <span className="w-1/12  md:w-3/12">{text.categories.options}</span>
              <span className="hidden md:block w-3/12">{text.categories.artist}</span>
              <span className="hidden lg:block w-2/12">{text.liked.gender}</span>
              <BsClock className="w-3/12 md:w-2/12" />
            </div>
          </div>
          {
            tracks.length === 0
              ?
              <div className='flex flex-col items-center justify-center h-full mt-48 w-full gap-5 text-xs md:text-sm lg:text-lg'>
                <p>This playlist looks empty. Search for songs...</p>
                <Link to={SEARCH} className='w-36 md:w-44 inline-flex gap-5 justify-center items-center hover:bg-deezer-dark p-2 md:p-3 rounded-full bg-deezer text-sm md:text-lg font-bold'>
                  Explore music
                </Link>
              </div>
              :
              <>
                {
                  tracks.map((track, idx) => (
                    <SongCard
                      key={uuidv4()}
                      index={idx}
                      track={track}
                      defaultImg={defaultImage}
                      tracks={tracks}
                    />
                  ))
                }
              </>
          }
        </div>
      </div >



    </>

  )
}

export default ListContent