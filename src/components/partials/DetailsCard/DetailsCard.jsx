import { FaHeart, FaPencilAlt, FaPlayCircle } from 'react-icons/fa'
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { useUser } from '../../../context/UserContext';
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai';
import { usePlayer } from '../../../context/PlayerContext';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { Audio } from 'react-loader-spinner';
import { Dropdown } from 'flowbite-react';
import { v4 as uuidv4 } from 'uuid';
import { useLanguage } from '../../../context/LanguageContext';
import { AddToPlaylist } from '../../Player/AddToPlaylist/AddToPlaylist'
import defaultImage from '../../../assets/imgs/defaultImage.png'


export const DetailsCard = ({ track, count, ownerImage, tracks, playlistName, album_name, setId, setUpdateIsOpen, isPlaylist }) => {

  const { text } = useLanguage();
  const { Id, title, duration, preview, artist_name, album_cover, artist_id, likes } = track;

  const { authState } = useAuth();
  const { removeFromFavourites, removeFromMyTracks, userState } = useUser();
  const { userPlaylist } = userState
  const { playerState, playSong, addQueue, addList } = usePlayer();
  const [isLike, setIsLike] = useState(likes?.filter(ids => ids === authState.user.id).length > 0 ? true : false)
  const { handleAddToPlaylist } = AddToPlaylist()

  

  const toggleLike = () => {
    axios.patch(import.meta.env.VITE_BACKEND + "tracks/like/" + Id, {}, {
      headers: {
        "Authorization": authState.token
      }
    })
      .then(({ data }) => {
        setIsLike(!isLike);
        removeFromFavourites(Id);
      })
  }


  const addSongToPlayer = () => {
    const newTrack = {
      id: Id,
      name: title,
      picture: album_cover ? album_cover : ownerImage,
      artist: artist_name ? artist_name : playlistName,
      preview,
    }
    let newList = []
    playSong(newTrack);
    tracks.map(item => {
      let newListObj = {
        album_id: item.album_id,
        artist_id: item.artist_id,
        artist_name: !item.artist_name ? playlistName : item.artist_name,
        duration: item.duration,
        id: item.Id,
        likes: item.likes,
        preview: item.preview,
        readable: item.readable,
        title: item.title,
        album_cover: !item.album_cover ? ownerImage : item.album_cover,
      }
      newList.push(newListObj)

    })
    addList(newList)
    addQueue(newList)
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
        axios.delete(import.meta.env.VITE_BACKEND + "tracks/" + Id, { headers: { "Authorization": authState.token } })
          .then(({ data }) => {
            removeFromMyTracks(Id)
          })
      }
    })
  }

  const updateTrack = () => {
    setUpdateIsOpen(true)
    setId(Id);
  }


  const onClick = (listId, listTitle, trackId,) => {
    handleAddToPlaylist(listId, listTitle, trackId)
  }



  return (
    <div className='flex w-full items-center justify-center h-full'>
      <div className='w-full md:max-w-2xl lg:max-w-3xl min-w-[100%] pt-2'>
        <div className='flex items-center rounded-xl hover:bg-zinc-900 h-12 md:h-16'>
          <span className='hidden md:block md:w-1/12 text-center'>{count + 1}</span>
          <div className=' flex w-2/12 items-center justify-center relative'>
            <img className="rounded-lg w-12 md:w-14 lg:w-16 cursor-pointer" src={album_cover ? album_cover : ownerImage?.length > 0 ? ownerImage : defaultImage} alt="image description" width="" height="" />
            {
              (playerState.current.name === title && playerState.isListening) ?
                <Audio
                  height="30"
                  width="30"
                  color="#ef5567"
                  wrapperClass='mb-1 mr-0 absolute'
                />
                :
                playerState.current.name !== title &&
                <div className="opacity-0 absolute object-cover w-full h-full flex justify-center items-center transition-all cursor-pointer hover:opacity-60" onClick={addSongToPlayer}>
                  <FaPlayCircle className="w-10 h-10 absolute" />
                </div>
            }
          </div>
          <div className='inline-flex w-4/12 justify-center truncate md:w-2/12'>
            <span className="text-xs pl-3 md:pl-0 text-left w-2/12 md:text-md grow truncate">{title}</span>
          </div>
          <div className={`${isLike ? "border-red-500" : "border-gray-400"} w-3/12 flex items-center justify-center text-xs md:text-2xl rounded-full my-auto `}>
            {
              authState.isAuthenticated && artist_id !== authState.id
                ?
                <Dropdown
                  className='bg-zinc-700 border-none px-0 py-0 cursor-pointer'
                  inline
                  label={<AiOutlinePlus />}
                  placement="top-start"
                  arrowIcon={false}
                >
                  <Dropdown.Header className='text-white'>
                    {text.playlists.add}
                  </Dropdown.Header>
                  {
                    userPlaylist.map((list) => (
                      <Dropdown.Item key={uuidv4()} className='text-white' onClick={() => onClick(list.Id, list.title, track.Id)}>
                        <span>{list.title}</span>
                      </Dropdown.Item>
                    ))
                  }
                </Dropdown>
                :
                ""
            }

            {
              (ownerImage && artist_id === authState.id) &&
              <div className='flex items-center justify-center w-full gap-3'>
                <AiFillDelete className=' text-lg md:text-2xl' onClick={removeSong} />
                <FaPencilAlt className=' text-md md:text-xl' onClick={updateTrack} />
              </div>
            }

            {
              (!ownerImage && !isPlaylist) &&
              <FaHeart className={`${isLike ? "text-red-400" : "text-gray-600"} mr-7 ml-2 md:mr-2 lg:mr-1 lg:ml-2`} onClick={toggleLike} />
            }
          </div>
          <span className="text-xs text-center font-normal hidden md:block md:w-3/12 md:text-md truncate">{track.title_playlist ? track.title_playlist : album_name || artist_name}</span>
          <span className="text-xs text-center hidden lg:block lg:w-2/12 md:text-md grow truncate">{track.label}</span>
          <span className="text-xs text-center w-2/12 md:text-md grow truncate">{(duration / 60).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
