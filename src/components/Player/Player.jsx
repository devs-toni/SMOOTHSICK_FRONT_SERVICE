
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import { usePlayer } from '../../context/PlayerContext';
import { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdQueueMusic } from 'react-icons/md';
import { FaRandom } from 'react-icons/fa';
import "./Player.css"
import { useUser } from '../../context/UserContext';
import { Audio } from 'react-loader-spinner';
import Login from '../Login/Login';



const Player = () => {
  const { playerState, playSong, addQueue } = usePlayer();
  const { current, queue } = playerState


  const [isPlay, setIsPlay] = useState()
  const [showDataSong, setShowDataSong] = useState("")
  const [showDataImg, setShowDataImg] = useState("")
  const [currentSong, setCurrentSong] = useState(0)
  const [randomActive, setRandomActive] = useState(false)

  current.preview = current.preview ? current.preview : queue[0]?.preview
  const track = queue.find((e) => e.preview === current.preview);
  const currentSongIndex = queue.indexOf(track)



  const handleClickNext = () => {
    setCurrentSong(currentSong < queue.length - 1 ? currentSong + 1 : 0);
    if (currentSongIndex + 1 === queue.length) {
      playSong({
        name: queue[0].title,
        picture: queue[0].album_cover,
        artist: queue[0].artist_name,
        preview: queue[0].preview,
      })
    } else {
      playSong({
        name: queue[currentSongIndex + 1].title,
        picture: queue[currentSongIndex + 1].album_cover,
        artist: queue[currentSongIndex + 1].artist_name,
        preview: queue[currentSongIndex + 1].preview,
      })
    }
    setShowDataSong("hidden")
    setShowDataImg("hidden")
  };


  const handleClickPrevious = () => {
    setCurrentSong(currentSong < queue.length - 1 ? currentSong - 1 : 0);
    if (currentSongIndex === 0) {
      current.preview = queue[queue.length - 1].preview
      current.picture = queue[queue.length - 1].album_cover
      current.name = queue[queue.length - 1].title
      current.artist = queue[queue.length - 1].artist_name
    } else {
      current.preview = queue[currentSongIndex - 1].preview
      current.picture = queue[currentSongIndex - 1].album_cover
      current.name = queue[currentSongIndex - 1].title
      current.artist = queue[currentSongIndex - 1].artist_name
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

  const handleFinish = (e) => {
    playSong({
      id: queue[currentSongIndex + 1].id,
      name: queue[currentSongIndex + 1].title,
      picture: queue[currentSongIndex + 1].album_cover,
      artist: queue[currentSongIndex + 1].artist_name,
      preview: queue[currentSongIndex + 1].preview,
    })
    setShowDataSong("hidden")
    setShowDataImg("hidden")
  }


  const handleRandomSong = () => {
    const randomList = queue.sort(() => { return Math.random() - 0.5 });
    if (randomActive === true) {
      addQueue(queue)
      setRandomActive(false)
    } else {
      setRandomActive(true)
      addQueue(randomList)
    }
  }



  return (
    playerState.current === null ? '' :
      <div className='pt-10 pr-6'>
        <AudioPlayer
          autoPlay
          src={current.preview}
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
                  current.preview
                    ?
                    <>
                      <img className={`h-8 w-8 md:h-9 md:w-9 rounded-full  ${!isPlay ? '' : "animate-[spin_3s_linear_infinite] "}`} src={current.picture} />
                      <div className='hidden w-14 truncate relative select-none md:flex md:flex-col md:w-20 lg:w-40 xl:w-full '>
                        <span className={`text-xs font-bold ${showDataSong}`}>{current ? current.name : ""}</span>
                        <span className={`text-xs ${showDataSong}`}>{current.artist}</span>
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