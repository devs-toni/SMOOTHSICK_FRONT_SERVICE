import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { FaHeart, FaPlayCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { usePlayer } from "../../../context/PlayerContext";
import { Audio } from "react-loader-spinner";
import { useUser } from "../../../context/UserContext";
import { toast } from "react-hot-toast";
import { FILTER_TYPES } from '../../Search/filterTypes';
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";



export const SongCard = ({ track, tracks, index, defaultImg }) => {
  const { addList, addQueue, playSong, playerState } = usePlayer();
  const playlistId = useParams()
  const { authState } = useAuth()
  const { getMyPlaylists, toggleLike } = useUser()
  const [isLike, setIsLike] = useState(track.likes?.filter(ids => ids === authState.user.id).length > 0 ? true : false);

  const mins = Math.floor(track.duration % 3600 / 60)
  const secs = Math.floor(track.duration % 3600 % 60)
  const mDisplay = mins < 10 ? (`0${mins}`) : mins
  const sDisplay = secs < 10 ? (`0${secs}`) : secs

  const addSongToPlayer = () => {
    const newTrack = {
      id: track.Id,
      name: track.title,
      picture: track.album_cover ? track.album_cover : defaultImg,
      artist: track.artist_name,
      preview: track.preview,
    }
    let newList = []
    playSong(newTrack);
    tracks.map(item => {
      let newListObj = {
        album_id: item.album_id,
        artist_id: item.artist_id,
        artist_name: !item.artist_name ? 'Comunity playlist' : item.artist_name,
        duration: item.duration,
        id: item.Id,
        likes: item.likes,
        preview: item.preview,
        readable: item.readable,
        title: item.title,
        album_cover: !item.album_cover ? defaultImg : item.album_cover,
      }
      newList.push(newListObj)
    })
    addList(newList)
    addQueue(newList)
  }

  const handleRemoveFromPlaylist = async () => {
    await axios.patch(import.meta.env.VITE_BACKEND + 'playlists/removeFromPlaylist', { trackId: track.id, playlistId: playlistId.id })
      .then(({ status }) => {
        getMyPlaylists()
        if (status === 201) {
          toast.success('Track removed from playlist!', {
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
          toast.error('Something went wrong!', {
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

  const heartStyles = isLike ? { color: "#ef5567", } : { color: "gray" }


  const handleLikesState = () => {
    toggleLike(FILTER_TYPES.TRACKS, track, isLike, setIsLike)

  }

  return (
    <>
      <div className='flex w-full items-center justify-center h-full'>
        <div className='w-full md:max-w-2xl lg:max-w-3xl min-w-[100%] pt-2'>
          <div className='flex items-center rounded-xl hover:bg-zinc-900 h-12 md:h-16'>
            <span className="hidden md:block md:w-1/12 text-center">{index + 1}</span>
            <div className="flex w-2/12 items-center justify-center relative">
              <img className="rounded-lg w-12 md:w-14 lg:w-16 cursor-pointer object-cover" src={track.album_cover ? track.album_cover : defaultImg} alt="image description" />
              {
                (playerState.current.name === track.title && playerState.isListening) ?
                  <Audio
                    height="30"
                    width="30"
                    color="#ef5567"
                    wrapperClass='mb-1 mr-0 absolute'
                  />
                  :
                  playerState.current.name !== track.title &&
                  <div className="opacity-0 absolute object-cover w-full h-full flex justify-center items-center transition-all cursor-pointer hover:opacity-60" >
                    <FaPlayCircle className="w-10 h-10 absolute" onClick={addSongToPlayer} />
                  </div>
              }
            </div>
            <div className='inline-flex w-4/12 justify-center truncate md:w-2/12'>
              <span className="text-xs pl-3 md:pl-0 text-left w-2/12 md:text-md grow truncate">{track.title}</span>
            </div>
            <div className="w-3/12 flex items-center justify-center text-xs md:text-2xl rounded-full my-auto ">
              <div className='flex items-center justify-center w-full gap-3'>
                <FaHeart className='text-lg md:text-2xl cursor-pointer' style={heartStyles} onClick={handleLikesState} />
                <AiFillDelete className=' text-lg md:text-2xl cursor-pointer' onClick={handleRemoveFromPlaylist} />
              </div>
            </div>
            <span className=" text-xs text-center font-normal hidden md:block md:w-3/12 md:text-md truncate">{track.artist_name ? track.artist_name : "Comunity playlist"}</span>
            <span className="text-xs text-center hidden lg:block lg:w-2/12 md:text-md grow truncate">{track.label}</span>
            <span className="text-xs text-center w-2/12 md:text-md grow truncate">{`${mDisplay}:${sDisplay} `}</span>
          </div>
        </div>
      </div>
    </>
  );
};
