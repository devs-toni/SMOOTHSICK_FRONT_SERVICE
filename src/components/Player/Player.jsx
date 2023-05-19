
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import { usePlayer } from '../../context/PlayerContext';
import { useEffect, useState } from 'react';
import { AiOutlineHeart, AiOutlinePlus } from 'react-icons/ai';
import "./Player.css"
import { ProvideContent } from './ProvideContent/ProvideContent';
import { useUser } from '../../context/UserContext';
import { FILTER_TYPES } from '../Search/filterTypes';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { BiShuffle } from 'react-icons/bi'
import { useLanguage } from "../../context/LanguageContext"
import { AddToPlaylist } from './AddToPlaylist/AddToPlaylist'
import { v4 as uuidv4 } from 'uuid';
import { Dropdown } from 'flowbite-react';

const Player = () => {
  const { playerState, playSong, addQueue, setIsListening } = usePlayer();

  const { text } = useLanguage()
  const { nextTrack, prevTrack } = ProvideContent();
  const { handleAddToPlaylist } = AddToPlaylist()
  const { toggleLike, userState } = useUser();
  const { authState } = useAuth();
  const { userPlaylist } = userState
  const { current, queue, list } = playerState
  const { preview, picture, name, artist } = current
  const [randomActive, setRandomActive] = useState(false)
  const [showDataSong, setShowDataSong] = useState("")
  const [showDataImg, setShowDataImg] = useState("")
  const [isPlay, setIsPlay] = useState();
  const [isLike, setIsLike] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isPlaylistSong, setIsPlaylistSong] = useState(false);


  useEffect(() => {
    (isChanged || current) &&
      axios.get(import.meta.env.VITE_BACKEND + "tracks/" + current.id)
        .then(({ data }) => {
          setIsPlaylistSong(data.album_id ? false : true)
          setIsOwner((data.disk_number === -1 && authState.user.id === data.artist_id) ? true : false)
          setIsLike(data.likes?.filter(ids => ids === authState.user.id).length > 0 ? true : false);
        })
    return setIsChanged(false);
  }, [isChanged, current])

  const handleIsPlaying = () => {
    setIsPlay(true)
    setShowDataSong("data-track-slide")
    setShowDataImg("data-track-slideup")
    setIsListening(true)
  }

  const handleIsPaused = () => {
    setIsPlay(false)
    setIsListening(false)
  }

  const handleClickNext = () => {
    setShowDataSong("hidden")
    setShowDataImg("hidden")
    if (nextTrack) return playSong(nextTrack)
    setIsChanged(true)
    setIsListening(true)
  };

  const handleClickPrevious = () => {
    setShowDataSong("hidden")
    setShowDataImg("hidden")
    if (prevTrack) return playSong(prevTrack)
    setIsChanged(true)
    setIsListening(true)
  };

  const handleFinish = () => {
    setShowDataSong("hidden")
    setShowDataImg("hidden")
    playSong(nextTrack)
    setIsChanged(true)
    setIsListening(true)
  };


  const handleRandomSong = () => {
    const randomList = queue.toSorted(() => { return Math.random() - 0.5 });
    if (randomActive === false) {
      addQueue(randomList)
      setRandomActive(true)
    } else {
      setRandomActive(false)
      addQueue(list)
    }
  }

  const heartStyles = isLike ? { color: "#ef5567", } : { color: "gray" }

  const onClick = (listId, listTitle, trackId,) => {
    handleAddToPlaylist(listId, listTitle, trackId)
  }

  return (
    playerState.current === null ? '' :
      <div className='pt-10 pr-6'>
        <AudioPlayer
          autoPlay
          src={preview}
          showSkipControls
          showFilledVolume
          onPlaying={handleIsPlaying}
          onPause={handleIsPaused}
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrevious}
          showJumpControls={false}
          onEnded={handleFinish}
          customControlsSection=
          {
            [
              <div className={` flex justify-center md:items-center md:flex-row flex-col gap-2 md:gap-4 absolute ${showDataImg}`}>
                {
                  preview
                    ?
                    <>
                      <img className={`h-8 w-8 md:h-9 md:w-9 rounded-full  ${!isPlay ? '' : "animate-[spin_3s_linear_infinite] "}`} src={picture} />
                      <div className='hidden w-14 truncate relative select-none md:flex md:flex-col md:w-20 lg:w-40 xl:w-full '>
                        <span className={`text-xs font-bold ${showDataSong}`}>{name ? name : ""}</span>
                        <span className={`text-xs ${showDataSong}`}>{artist}</span>
                      </div>
                    </>
                    :
                    ""
                }
              </div>,
              RHAP_UI.ADDITIONAL_CONTROLS,
              preview ?
                authState.isAuthenticated && current.id !== authState.id
                  ?
                  <Dropdown
                    className='bg-zinc-700 border-none px-0 py-0 cursor-pointer'
                    inline
                    label={<AiOutlinePlus color='#868686' size={25} className='cursor-pointer' />}
                    placement="top-start"
                    arrowIcon={false}
                  >
                    <Dropdown.Header className='text-white'>
                      {text.playlists.add}
                    </Dropdown.Header>
                    {
                      userPlaylist.map((list) => (
                        <Dropdown.Item key={uuidv4()} className='text-white' onClick={() => onClick(list.id, list.title, current.id)}>
                          <span>{list.title}</span>
                        </Dropdown.Item>
                      ))
                    }
                  </Dropdown>
                  :
                  ""
                :
                "",
              RHAP_UI.MAIN_CONTROLS,
              <div className='hidden md:flex md:gap-2 items-center'>
                {
                  (!isOwner && !isPlaylistSong) &&
                  <AiOutlineHeart color='#868686' size={25} style={heartStyles} className='cursor-pointer' onClick={() => toggleLike(FILTER_TYPES.TRACKS, playerState.current, isLike, setIsLike)} />
                }
                <BiShuffle color={randomActive ? "#ef5567" : "#868686"} className='cursor-pointer' size={27} onClick={handleRandomSong} />

              </div>,
              RHAP_UI.VOLUME_CONTROLS
            ]
          }
        />
      </div>

  )
}

export default Player;