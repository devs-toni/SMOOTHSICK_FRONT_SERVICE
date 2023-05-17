import React, { useState } from 'react'
import Search from '../../Search/Search'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../../context/UserContext';
import { useLanguage } from '../../../context/LanguageContext';
import { BsClock, BsTrash3Fill } from 'react-icons/bs';
import { Favourites } from '../../Favourites/Favourites';
import { Avatar, Button } from 'flowbite-react';
import { CATEGORIES, PLAYLIST, SEARCH } from '../../../router/paths';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { SongCard } from '../CategoriesSongCard/CategoriesSongCard';
import { DetailsCard } from '../../partials/DetailsCard/DetailsCard';
import { v4 as uuidv4 } from 'uuid';
import { FaPlay } from 'react-icons/fa';

const ListContent = () => {
  const { text } = useLanguage();
  const { getMyPlaylists } = useUser();
  const { authState } = useAuth();
  const { id } = useParams()
  const navigate = useNavigate()
  const { userState } = useUser();
  const { userPlaylistTracks, userPlaylist } = userState
  const [changeIcon, setChangeIcon] = useState(<FaPlay className='hidden md:block' size={20} />)

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

  return (
    <>
      <div className="h-full p-4 md:ml-20 lg:ml-52">
        <div className="flex flex-col items-start justify-center lg:ml-20 lg:mr-20 pt-24 mb-24 gap-5">
          <div className="flex items-left justify-left h-full w-full gap-10 mb-5">
            <img
              src={"picture"}
              alt="User playlist picture"
              className="w-32 md:w-32"
            />
            <div className="flex flex-col gap-3">
              <span className='text-left text-xl md:text-2xl lg:text-4xl py-6 lg:py-11'>{userPlaylist[0]?.title}</span>
              <div className='flex items-center gap-3'>
                <button className='w-20 md:w-36 inline-flex gap-5 justify-center items-center hover:bg-deezer-dark p-2 md:p-3 rounded-full bg-deezer' onClick={handleDeletePlaylist}>
                  <BsTrash3Fill className='hidden md:block' size={20} />
                  <span className='text-sm md:text-lg font-bold'>Delete</span>
                </button>
                <button className='w-20 md:w-36 inline-flex gap-5 justify-center items-center hover:bg-deezer-dark p-2 md:p-3 rounded-full bg-deezer' >
                  {changeIcon}
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
              <span className="w-3/12">{text.categories.options}</span>
              <span className="hidden md:block w-3/12">{text.categories.artist}</span>
              <p className="hidden lg:block w-2/12">{text.liked.gender}</p>
              {<BsClock className="w-2/12" />}
            </div>
          </div>
          {
            userPlaylistTracks.length === 0
              ?
              <div className='flex flex-col items-center justify-center h-full w-full gap-5 text-xs md:text-sm lg:text-lg'>
                <p>This playlist looks empty. Search for songs...</p>
                <Link to={SEARCH} className='w-36 md:w-44 inline-flex gap-5 justify-center items-center hover:bg-deezer-dark p-2 md:p-3 rounded-full bg-deezer text-sm md:text-lg font-bold'>
                  Explore music
                </Link>
              </div>
              :
              <div className="z-10 flex flex-col justify-center pb-20 gap-3 h-30 text-center w-full xl:w-4/5">
                {
                  userPlaylistTracks.map((track) => (
                    <SongCard
                      key={uuidv4()}
                      track={track}
                    />
                  ))
                }
              </div>
          }
        </div>
      </div >



    </>

  )
}

export default ListContent