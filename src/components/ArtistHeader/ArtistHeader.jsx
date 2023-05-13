import { Avatar } from 'flowbite-react';
import { useLanguage } from '../../context/LanguageContext';
import { usePlayer } from '../../context/PlayerContext';
import './ArtistHeader.css';
import { FaHeart, FaPlay } from "react-icons/fa";
import { useState } from 'react';
import { Audio } from 'react-loader-spinner'
import { ARTIST, DETAILS } from '../../router/paths';
import { NavLink } from 'react-router-dom';

export const ArtistHeader = ({ fans, isLike, description, tracks, type, album_name, album_picture, artist_picture, artist_name, artist_id }) => {
  const [changeIcon, setChangeIcon] = useState(<FaPlay className='' size={20} />)
  const { text } = useLanguage();
  const { addList, addQueue, playSong } = usePlayer();
  const handleSetNewPlaylist = () => {
    playSong({
      picture: tracks[0].album_cover,
      preview: tracks[0].preview,
      name: tracks[0].title,
      artist: tracks[0].artist_name
    })
    addQueue(tracks)
    addList(tracks)
    setChangeIcon(
      <Audio
        height="20"
        width="20"
        color="white"
        wrapperClass='mb-1 mr-0'
      />
    )
  }
  const handlePause = () => {
    setChangeIcon(<FaPlay className='' size={20} />)
  }

  return (
    <>
      {
        <div className='inline-flex w-full items-center justify-between'>
          <div className='flex flex-col  md:flex-row gap-10 h-full items-center justify-start'>
            <img
              src={type === "playlist" || type === "artists" ? artist_picture : album_picture}
              className='w-44 md:w-52 rounded-xl'
            />
            <div className='flex flex-col h-full justify-start items-center md:items-start gap-5'>
              <div className='flex flex-col gap-2'>
                <span className='md:text-lg lg:text-3xl font-bold truncate'>{album_name}</span>
                <div className='inline-flex w-40 md:w-full justify-left items-left '>
                  <NavLink to={`${DETAILS}${ARTIST}/${artist_id}`} className='inline-flex items-center hover:underline gap-3'>
                    {
                      type === "playlist" || type === "artists"
                        ?
                        ""
                        :
                        <Avatar img={artist_picture} size="xs" rounded />
                    }
                    <span className={`${type === "artists" || type === "playlists" ? "text-2xl font-bold" : "text-xs md:text-lg"}`}>{artist_name}</span>
                  </NavLink>
                </div>
                <span className='text-xs md:text-md text-neutral-500'>{fans} {text.details.fans}</span>
              </div>
              <div className='flex justify-center gap-5 items-center'>
                <button className='w-36 inline-flex gap-5 justify-center items-center hover:bg-deezer-dark p-2 md:p-3 rounded-full bg-deezer' onClick={handleSetNewPlaylist} onPauseCapture={handlePause} >
                  {changeIcon}
                  <p className='text-lg font-bold'>{text.details.mix}</p>
                </button>
                <FaHeart className={`artist-like ${isLike && 'isLike'}`} size={44} />
              </div>
            </div>
          </div>
          {
            description &&
            <div className='flex items-left w-[30%] justify-left'>
              <div className='h-36 p-5 flex justify-center items-center rounded-xl w-full text-md bg-chart'>
                <p>{description}</p>
              </div>
            </div>
          }
        </div>
      }

    </>
  )
}