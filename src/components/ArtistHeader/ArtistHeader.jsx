import { Avatar } from 'flowbite-react';
import { useLanguage } from '../../context/LanguageContext';
import { usePlayer } from '../../context/PlayerContext';
import './ArtistHeader.css';
import { FaHeart, FaPlay } from "react-icons/fa";
import { useState } from 'react';
import { Audio } from 'react-loader-spinner'

export const ArtistHeader = ({ img, name, fans, isLike, description, tracks, }) => {
  const [changeIcon, setChangeIcon] = useState(<FaPlay className='' size={20} />)
  const { text } = useLanguage();
  const { addQueue, playSong } = usePlayer();
  const handleSetNewPlaylist = () => {
    playSong({
      picture: tracks[0].album_cover,
      preview: tracks[0].preview,
      name: tracks[0].title,
      artist: tracks[0].album_name
    })
    addQueue(tracks)
    setChangeIcon(
      <Audio
        height="20"
        width="20"
        color="white"
        wrapperClass='mb-1 mr-0'
      />
    )
  }
  
  console.log(tracks);
  const handlePause = () => {
    setChangeIcon(<FaPlay className='' size={20} />)
  }

  return (
    <div className='inline-flex w-full items-center justify-between'>
      <div className='flex flex-row gap-10 h-full items-center justify-start'>
        <Avatar
          img={img}
          size="xl"
        />
        <div className='flex flex-col h-full justify-start items-start gap-5'>
          <div className='flex flex-col gap-2'>
            <p className='text-3xl font-bold'>{name}</p>
            <p className='text-md text-neutral-500'>{fans} {text.details.fans}</p>
          </div>
          <div className='flex justify-center gap-5 items-center'>
            <button className='w-36 inline-flex gap-5 justify-center items-center hover:bg-deezer-dark p-3 rounded-full bg-deezer' onClick={handleSetNewPlaylist} onPauseCapture={handlePause} >
              {changeIcon}
              <p className='text-lg font-bold'>{text.details.mix}</p>
            </button>
            <FaHeart className={`artist-like ${isLike && 'isLike'}`} size={50} />
          </div>
        </div>
      </div>
      {
        description &&
        <div className='flex items-left w-[40%] justify-left'>
          <div className='h-36 p-5 flex justify-center items-center rounded-xl w-full text-xl bg-chart'>
            <p className=''>{description}</p>
          </div>
        </div>
      }
    </div>
  )
}