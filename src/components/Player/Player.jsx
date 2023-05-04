
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import { usePlayer } from '../../context/PlayerContext';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdQueueMusic } from 'react-icons/md';
import { FaRandom } from 'react-icons/fa';
import "./Player.css"



const Player = () => {

  const { playerState } = usePlayer();
  const [isPlay, setIsPlay] = useState()
  const [showDataSong, setShowDataSong] = useState("")
  const [showDataImg, setShowDataImg] = useState("")
  const [currentSong, setCurrentSong] = useState(0)

  //const track = dataState.tracks.find((e) => e.url === playerState.current);
  //const currentSongIndex = dataState.tracks.indexOf(track)


/*   const handleClickNext = () => {
    setCurrentSong(currentSong < dataState.tracks.length - 1 ? currentSong + 1 : 0);
    if (currentSongIndex + 1 === dataState.tracks.length) {
      playerState.current = dataState.tracks[0].url
    } else {
      playerState.current = dataState.tracks[currentSongIndex + 1].url
    }
    setShowDataSong("hidden")
    setShowDataImg("hidden")
  };


  const handleClickPrevious = () => {
    setCurrentSong(currentSong < dataState.tracks.length - 1 ? currentSong - 1 : 0);
    if (currentSongIndex === 0) {
      playerState.current = dataState.tracks[dataState.tracks.length - 1].url
    } else {
      playerState.current = dataState.tracks[currentSongIndex - 1].url
    }
    setShowDataSong("hidden")
    setShowDataImg("hidden")

  }; */


  const handleIsPlaying = () => {
    setIsPlay(true)
    setShowDataSong("data-track-slide")
    setShowDataImg("data-track-slideup")
  }

  const handleIsPaused = () => {
    setIsPlay(false)

    //console.log(currentSongIndex + 1 !== dataState.tracks.length);
  }


  return (
    playerState.current === null ? '' :
      <div className='pt-10 pr-6'>
        <AudioPlayer
          // showJumpControls={false}
          // layout="horizontal"
          // header=
          // {
          //   <div className={`flex items-left justify-start md:items-center md:flex-row flex-col gap-2 md:gap-4 absolute ${showDataImg}`}>
          //     <img className={`h-8 w-8 md:h-12 md:w-12 rounded-full  ${!isPlay ? '' : "animate-[spin_3s_linear_infinite] "}`} src={track.thumbnail} />
          //     <div className='hidden w-14 truncate relative select-none md:flex md:flex-col md:w-20 lg:w-40 xl:w-full '>
          //       <span className={`text-xs font-bold ${showDataSong}`}>{track.name}</span>
          //       <span className={`text-xs ${showDataSong}`}>{track.artist}</span>
          //     </div>
          //   </div>

          // }
          // footer=
          // {
          //   <div className='flex gap-3'>
          //     <AiOutlineHeart size={22} />
          //     <MdQueueMusic size={22} />
          //   </div>
          // }
          autoPlay
          src={playerState.current}
          showSkipControls
          showFilledVolume
          onPlaying={handleIsPlaying}
          onPause={handleIsPaused}
          //onClickNext={handleClickNext}
          //onClickPrevious={handleClickPrevious}
          showJumpControls={false}
          customControlsSection=
          {
            [
              <div className={` flex justify-center md:items-center md:flex-row flex-col gap-2 md:gap-4 absolute ${showDataImg}`}>
                <img className={`h-8 w-8 md:h-9 md:w-9 rounded-full  ${!isPlay ? '' : "animate-[spin_3s_linear_infinite] "}`} src={track.thumbnail} />
                <div className='hidden w-14 truncate relative select-none md:flex md:flex-col md:w-20 lg:w-40 xl:w-full '>
                  <span className={`text-xs font-bold ${showDataSong}`}>{track.name}</span>
                  <span className={`text-xs ${showDataSong}`}>{track.artist}</span>
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