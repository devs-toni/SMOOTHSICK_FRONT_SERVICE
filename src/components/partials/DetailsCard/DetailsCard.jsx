import { FaHeart, FaPencilAlt } from 'react-icons/fa'
import { SlOptions } from 'react-icons/sl'
import { GiMicrophone } from "react-icons/gi";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { useUser } from '../../../context/UserContext';
import { AiFillDelete } from 'react-icons/ai';
import { usePlayer } from '../../../context/PlayerContext';

export const DetailsCard = ({ track, count, ownerImage, tracks, playlistName, album_name }) => {

  const { id, title, duration, preview, artist_name, album_cover, artist_id } = track;
  const { authState } = useAuth();
  const { removeFromFavourites, removeFromMyTracks } = useUser();
  const { playSong, addQueue } = usePlayer();

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
      picture: album_cover,
      artist: artist_name ? artist_name : playlistName,
      preview,
    }
    playSong(newTrack);
    tracks.map(tr => {
      if (!tr.artist_name) {
        tr.artist_name = playlistName
      }
    })
    addQueue(tracks)
  }

  const removeSong = () => {
    axios.delete(import.meta.env.VITE_BACKEND + "tracks/" + id, {
      headers: {
        "Authorization": authState.token
      }
    })
      .then(({ data }) => {
        removeFromMyTracks(id)
      })
  }


  return (
    <div className='flex w-full items-center justify-center h-full'>
      <div className='w-full md:max-w-2xl lg:max-w-3xl min-w-[100%] pt-2'>
        <div className='flex items-center rounded-xl hover:bg-chart h-16'>
          <span className='hidden md:block md:w-1/12 text-center'>{count + 1}</span>
          <div className=' flex w-2/12 items-center justify-center'>
            <img className="rounded-lg w-16 cursor-pointer" src={!ownerImage ? album_cover : ownerImage} onClick={addSongToPlayer} alt="image description" width="" height="" />
          </div>
          <div className='inline-flex w-4/12 justify-center truncate md:w-2/12'>
            <span className="text-xs pl-3 md:pl-0 text-center w-2/12 md:text-md grow truncate">{title}</span>
          </div>
          <div className={`${isLike ? "border-red-500" : "border-gray-400"} w-3/12 flex items-center justify-center text-xs md:text-2xl rounded-full my-auto cursor-pointer `}>
            {
              (ownerImage && artist_id === authState.id) &&
              <>
                <AiFillDelete className='ml-4 mr-4 text-3xl' onClick={removeSong} />
                <FaPencilAlt className='mr-4 text-2xl' />
              </>
            }
            <FaHeart className={`${isLike ? "text-red-400" : "text-gray-600"} mr-4`} onClick={removeLike} />
            <SlOptions className="text-withe-600" />
          </div>
          <span className="text-xs text-center font-normal hidden md:block md:w-3/12 md:text-md truncate">{album_name}</span>
          <span className="text-xs text-center hidden lg:block lg:w-2/12 md:text-md grow truncate">{track.label}</span>
          <span className="text-xs text-center w-2/12 md:text-md grow truncate">{(duration / 60).toFixed(2)} min</span>
        </div>
      </div>
    </div>
  )
}
