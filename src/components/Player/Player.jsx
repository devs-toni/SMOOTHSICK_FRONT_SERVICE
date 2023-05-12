
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import { usePlayer } from '../../context/PlayerContext';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdQueueMusic } from 'react-icons/md';
import { FaRandom } from 'react-icons/fa';
import "./Player.css"
import { ProvideContent } from './ProvideContent/ProvideContent';


const Player = () => {
  const { playerState, playSong, addQueue } = usePlayer();
  const { nextTrack, prevTrack, searchQueue } = ProvideContent()
  const { current, queue, list } = playerState
  const { preview, picture, name, artist } = current


  const [randomActive, setRandomActive] = useState(false)
  const [showDataSong, setShowDataSong] = useState("")
  const [showDataImg, setShowDataImg] = useState("")
  const [isPlay, setIsPlay] = useState()



  const handleIsPlaying = () => {
    setIsPlay(true)
    setShowDataSong("data-track-slide")
    setShowDataImg("data-track-slideup")
  }

  const handleIsPaused = () => {
    setIsPlay(false)
  }

  const handleClickNext = () => {
    playSong(nextTrack)
    setShowDataSong("hidden")
    setShowDataImg("hidden")
  };

  const handleClickPrevious = () => {
    playSong(prevTrack)
    setShowDataSong("hidden")
    setShowDataImg("hidden")
  };


  const handleFinish = () => {
    playSong(nextTrack)
    setShowDataSong("hidden")
    setShowDataImg("hidden")
  }


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
              <div className='flex md:gap-3'>
                <FaRandom color={randomActive ? "#ef5567" : "#868686"} className='cursor-pointer' size={23} onClick={handleRandomSong} />
              </div>,
              RHAP_UI.MAIN_CONTROLS,
              <div className='hidden md:flex md:gap-1 items-center'>
                <AiOutlineHeart color='#868686' size={25} className='cursor-pointer' />
                <MdQueueMusic color='#868686' size={25} className='cursor-pointer' />
              </div>,
              RHAP_UI.VOLUME_CONTROLS,
            ]
          }
        />
      </div>

  )
}

export default Player;