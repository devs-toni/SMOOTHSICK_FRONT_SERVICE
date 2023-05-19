import { useLayoutEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { usePlayer } from "../../../context/PlayerContext";
import { ALBUM, ARTIST, DETAILS, PLAYLIST } from "../../../router/paths";
import { FaPlayCircle } from 'react-icons/fa';
import './HomeBox.css';
import './ArtistBox.css';
import './HomeBoxCard.css';
import { FILTER_TYPES } from "../../Search/filterTypes";
import { Audio } from "react-loader-spinner";
import defaultImage from '../../../assets/imgs/defaultImage.png'


const BoxCard = ({ obj, targetClass, type, isFirstRowSection, less_tracks, top_tracks }) => {
  const { playSong, addQueue, playerState, addList } = usePlayer();
  const [canPlay, setCanPlay] = useState(false);
  const [data, setData] = useState({});


  useLayoutEffect(() => {
    if (type == FILTER_TYPES.ARTISTS) {
      setData({
        id: obj.id,
        name: obj.name,
        picture: obj.picture,
      })
    } else if (type == FILTER_TYPES.TRACKS) {
      setCanPlay(true);
      setData({
        id: obj.id,
        name: obj.title,
        picture: obj.album_cover,
        artist: obj.artist_name,
        preview: obj.preview,
      })

    } else if (type == FILTER_TYPES.ALBUMS) {
      setData({
        id: obj.album.id,
        name: obj.album.title,
        artist: obj.artist.name,
        picture: obj.album.cover
      })


    } else if (type == FILTER_TYPES.PLAYLISTS) {
      setData({
        id: obj.id,
        name: obj.title,
        picture: obj.picture
      })
    }
  }, [])


  const handleSetTracks = () => {
    playSong(data)
    try {
      top_tracks.find((track) => track.id === data.id)
      addQueue(top_tracks)
      addList(top_tracks)
    } catch {
      addQueue(less_tracks)
      addList(top_tracks)

    }
  }

  const isTrack = type === FILTER_TYPES.TRACKS ? true : false;
  const isArtist = type === FILTER_TYPES.ARTISTS ? true : false;
  const isAlbum = type === FILTER_TYPES.ALBUMS ? true : false;
  const isPlaylist = type === FILTER_TYPES.PLAYLISTS ? true : false;

  return (
    <NavLink to={
      isAlbum
        ?
        `${DETAILS}${ALBUM}/${data.id}`
        :
        isPlaylist
          ?
          `${DETAILS}${PLAYLIST}/${data.id}`
          :
          isArtist
          &&
          `${DETAILS}${ARTIST}/${data.id}`
    } className={`${targetClass}__link cursor-default`}>
      <div className=
        {
          `${!isFirstRowSection ? `row__${"targetClass"}--item w-20 md:w-32 lg:w-48 flex relative flex-col gap-2 md:gap-2 lg:gap-1 rounded-lg p-1 md:p-2 lg:p-1 ${isAlbum && ' bg-zinc-900'} ${isTrack && ' bg-zinc-900'} ${isPlaylist && ' bg-zinc-900'}` : `row__${targetClass}--firstItem`} `
        }>
        <div className={`${targetClass}__img-container flex justify-center items-center lg:p-3`}>
          {
            isTrack &&
            <div className="absolute flex items-center justify-center" onClick={handleSetTracks}>
              {
                playerState.isListening && playerState.current.id === data.id
                  ?
                  <Audio
                    height="45"
                    width="45"
                    color="#ef5567"
                    wrapperClass=''
                  />
                  :
                  <FaPlayCircle size={46} color='#ef5567' className="transition-all duration-300 ease-in-out opacity-0 hover:opacity-100" />
              }
            </div>
          }

          <img
            src={data.picture ? data.picture : defaultImage}
            alt={data.name}
            className={`${targetClass}__img-container--img object-cover w-16 md:w-40 rounded-md ${isArtist && 'hover:scale-110 transition ease-in-out duration-500'} cursor-pointer`}
            style={isArtist ? { borderRadius: "50%" } : {}}
          />
        </div>
        {
          !isFirstRowSection &&
          <div className={`${targetClass}__data ${isArtist && 'text-center bg-gradient-to-b from-[#ef5567] transition duration-700 hover:bg-deezer hover:cursor-pointer rounded-lg flex justify-center items-center'}`}>
            <p className={`truncate ${targetClass}__data--name w-15 text-center lg:mx-2 text-xs md:text-sm p-[0.3rem] md:p-[0.5rem] ${isAlbum && 'mr-0'}`}>{data.name}</p>
          </div>
        }
      </div>
    </NavLink>
  )
}

export default BoxCard