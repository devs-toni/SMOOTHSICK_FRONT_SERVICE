
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import { usePlayer } from '../../context/PlayerContext';
import { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdQueueMusic } from 'react-icons/md';
import { FaRandom } from 'react-icons/fa';
import "./Player.css"
import { useUser } from '../../context/UserContext';
import { Audio } from 'react-loader-spinner';



const Player = () => {

  const { playerState } = usePlayer();
  const { current, queue } = playerState
  const [isPlay, setIsPlay] = useState()
  const [showDataSong, setShowDataSong] = useState("")
  const [showDataImg, setShowDataImg] = useState("")
  const [currentSong, setCurrentSong] = useState(0)
  const { toggleLike } = useUser();


  playerState.current = current ? current : queue[0]?.preview
  

  const track = queue.find((e) => e.preview === playerState.current);
  const currentSongIndex = queue.indexOf(track)

  

  const handleClickNext = () => {
    setCurrentSong(currentSong < queue.length - 1 ? currentSong + 1 : 0);
    if (currentSongIndex + 1 === queue.length) {
      playerState.current = queue[0].preview
    } else {
      playerState.current = queue[currentSongIndex + 1].preview
    }
    setShowDataSong("hidden")
    setShowDataImg("hidden")
  };


  const handleClickPrevious = () => {
    setCurrentSong(currentSong < queue.length - 1 ? currentSong - 1 : 0);
    if (currentSongIndex === 0) {
      playerState.current = queue[queue.length - 1].preview
    } else {
      playerState.current = queue[currentSongIndex - 1].preview
    }
    setShowDataSong("hidden")
    setShowDataImg("hidden")

  };


  const handleIsPlaying = () => {
    setIsPlay(true)
    setShowDataSong("data-track-slide")
    setShowDataImg("data-track-slideup")
  }

  const handleIsPaused = () => {
    setIsPlay(false)
  }


  return (
    playerState.current === null ? '' :
      <div className='pt-10 pr-6'>
        <AudioPlayer
          autoPlay
          src={playerState.current}
          showSkipControls
          showFilledVolume
          onPlaying={handleIsPlaying}
          onPause={handleIsPaused}
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrevious}
          showJumpControls={false}
          customControlsSection=
          {
            [
              <div className={` flex justify-center md:items-center md:flex-row flex-col gap-2 md:gap-4 absolute ${showDataImg}`}>
                {
                  track
                    ?
                    <img className={`h-8 w-8 md:h-9 md:w-9 rounded-full  ${!isPlay ? '' : "animate-[spin_3s_linear_infinite] "}`} src={track.album_cover} />
                    :
                    ""
                }

                <div className='hidden w-14 truncate relative select-none md:flex md:flex-col md:w-20 lg:w-40 xl:w-full '>
                  <span className={`text-xs font-bold ${showDataSong}`}>{track ? track.title : ""}</span>
                  <span className={`text-xs ${showDataSong}`}>{track ? track.artist_name : ""}</span>
                </div>
              </div>,
              RHAP_UI.ADDITIONAL_CONTROLS,
              <div className='flex md:gap-3'>
                <FaRandom color='#868686' size={23} />
              </div>,
              RHAP_UI.MAIN_CONTROLS,
              <div className='hidden md:flex md:gap-1 items-center'>
                <AiOutlineHeart color='#868686' size={25} />
                <MdQueueMusic color='#868686' size={25} />
              </div>,
              RHAP_UI.VOLUME_CONTROLS,
            ]
          }
        />
      </div>

  )
}

export default Player;