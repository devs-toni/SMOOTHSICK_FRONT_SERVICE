import { FaHeart, FaPencilAlt, FaPlayCircle } from 'react-icons/fa'
import { SlOptions } from 'react-icons/sl'
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { useUser } from '../../../context/UserContext';
import { AiFillDelete } from 'react-icons/ai';
import { usePlayer } from '../../../context/PlayerContext';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { Bars } from 'react-loader-spinner';

export const DetailsCard = ({ track, count, ownerImage, tracks, playlistName, album_name, setId, setUpdateIsOpen }) => {

  const { id, title, duration, preview, artist_name, album_cover, artist_id } = track;
  const { authState } = useAuth();
  const { removeFromFavourites, removeFromMyTracks } = useUser();
  const { playerState, playSong, addQueue, addList } = usePlayer();

  const isLike = true;

  const removeLike = () => {
    axios.patch(import.meta.env.VITE_BACKEND + "tracks/like/" + id, {}, {
      headers: {
        "Authorization": authState.token
      }
    })
      .then(({ data }) => {
        removeFromFavourites(id);
      })
  }

  const addSongToPlayer = () => {
    const newTrack = {
      id,
      name: title,
      picture: album_cover ? album_cover : ownerImage,
      artist: artist_name ? artist_name : playlistName,
      preview,
    }
    playSong(newTrack);
    tracks.map(tr => {
      if (!tr.artist_name) {
        tr.artist_name = playlistName
      }
    })
    addList(tracks)
    addQueue(tracks)
  }

  const removeSong = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      iconColor: '#ef5567',
      showCancelButton: true,
      background: '#18181b',
      confirmButtonColor: '#1a1e20',
      cancelButtonColor: '#ef5567',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(import.meta.env.VITE_BACKEND + "tracks/" + id, {
          headers: {
            "Authorization": authState.token
          }
        })
          .then(({ data }) => {
            removeFromMyTracks(id)
          })
      }
    })
  }

  const updateTrack = () => {
    setUpdateIsOpen(true)
    setId(id);
  }

  return (
    <div className='flex w-full items-center justify-center h-full'>
      <div className='w-full md:max-w-2xl lg:max-w-3xl min-w-[100%] pt-2'>
        <div className='flex items-center rounded-xl hover:bg-chart h-12 md:h-16'>
          <span className='hidden md:block md:w-1/12 text-center'>{count + 1}</span>
          <div className=' flex w-2/12 items-center justify-center relative'>
            <img className="rounded-lg w-12 md:w-14 lg:w-16 cursor-pointer" src={!ownerImage ? album_cover : ownerImage} alt="image description" width="" height="" />
            {
              playerState.current.name === title ?
                <div className="absolute w-10">
                  <Bars color='#ef5567' />
                </div>
                :
                <div className="opacity-0 absolute object-cover w-full h-full flex justify-center items-center transition-all cursor-pointer hover:opacity-60" onClick={addSongToPlayer}>
                  <FaPlayCircle className="w-10 h-10" />
                </div>
            }
          </div>
          <div className='inline-flex w-4/12 justify-center truncate md:w-2/12'>
            <span className="text-xs pl-3 md:pl-0 text-center w-2/12 md:text-md grow truncate">{title}</span>
          </div>
          <div className={`${isLike ? "border-red-500" : "border-gray-400"} w-3/12 flex items-center justify-center text-xs md:text-2xl rounded-full my-auto cursor-pointer `}>
            {
              (ownerImage && artist_id === authState.id) &&
              <>
                <AiFillDelete className='ml-4 mr-4 text-2xl' onClick={removeSong} />
                <FaPencilAlt className='mr-4 text-xl' onClick={updateTrack} />
              </>
            }
            {
              !ownerImage &&
              <FaHeart className={`${isLike ? "text-red-400" : "text-gray-600"} mr-4`} onClick={removeLike} />
            }
          </div>
          <span className="text-xs text-center font-normal hidden md:block md:w-3/12 md:text-md truncate">{track.title_playlist ? track.title_playlist : album_name || artist_name}</span>
          <span className="text-xs text-center hidden lg:block lg:w-2/12 md:text-md grow truncate">{track.label}</span>
          <span className="text-xs text-center w-2/12 md:text-md grow truncate">{(duration / 60).toFixed(2)} min</span>
        </div>
      </div>
    </div>
  )
}
