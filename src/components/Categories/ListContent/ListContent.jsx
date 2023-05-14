import React, { useState } from 'react'
import Search from '../../Search/Search'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../../context/UserContext';
import { useLanguage } from '../../../context/LanguageContext';
import { BsClock } from 'react-icons/bs';
import { Favourites } from '../../Favourites/Favourites';
import { Avatar, Button } from 'flowbite-react';
import { CATEGORIES, PLAYLIST, SEARCH } from '../../../router/paths';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ListContent = () => {
  const { text } = useLanguage();
  const { getMyPlaylists } = useUser();
  const { authState } = useAuth();
  const { id } = useParams()
  const navigate = useNavigate()

  const handleDeletePlaylist = () => {
    axios.delete(import.meta.env.VITE_BACKEND + 'users/deletePlaylist/' + id, { headers: { "Authorization": `${authState.token}` } })
      .then(({ status }) => {
        if (status === 201) {
          getMyPlaylists()
          navigate(`${CATEGORIES}${PLAYLIST}`)
          toast.success("Playlist deleted successfully", {
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
          toast.error("Something went wrong", {
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
        <div className="flex flex-col items-start justify-center ml-20 mr-20 pt-24 gap-10">
          <div className="flex items-left justify-left h-full w-full gap-5">
            <Avatar
              img={""}
              rounded={true}
              size="xl"
            />
            <div className="flex flex-col gap-3">
              <span className='text-4xl'>{ }</span>
              <p className="text-md inline-block">{authState.user.firstName + " " + authState.user.lastName}</p>
              <Button className='' onClick={handleDeletePlaylist}>delete playlist</Button>
            </div>
          </div>
          <div className="z-10 flex flex-col text-center justify-center items-center h-full w-full">
            <div className='flex items-center w-full border-b border-b-gray-300 justify-between'>
              <span className="w-1/12 xl:w-14 text-left text-xs md:text-sm lg:text-md">{text.categories.album_table}</span>
              <span className="w-4/12 text-left text-xs md:text-sm lg:text-md">{text.categories.track}</span>
              <span className="w-2/12 text-left text-xs md:text-sm lg:text-md">{text.categories.artist}</span>
              {<BsClock className="w-1/12 mb-1 text-xs md:text-sm lg:text-md" size={18} />}
              <span className="w-2/12 text-xs md:text-sm lg:text-md">{text.categories.options}</span>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center h-full w-full gap-5'>
            <p>This playlist looks empty... Search for songs to add to your playlist</p>
            <div className='rounded-full bg-red-600'>
              <Link to={SEARCH}>Explore music</Link>
            </div>
          </div>
        </div>
      </div >
      {/* {
        lists.length > 0
          ?
          ""
          :
          <>
            <div className="z-10 flex flex-col justify-center pb-20 gap-3 h-30 text-center w-full xl:w-4/5"> */}
      {/* {selectedList?.songs &&
                selectedList.songs.map((data) => (
                  <SongCard
                    key={uuidv4()}
                    data={data}
                    img={data.thumbnail}
                    name={data.name}
                    artist={data.artist}
                    track_url={data.url}
                  />
                ))} */}
      {/* </div>
          </>
      } */}
    </>

  )
}

export default ListContent