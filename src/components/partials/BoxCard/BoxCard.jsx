import { useLayoutEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { usePlayer } from "../../../context/PlayerContext";
import { ALBUM, ARTIST, DETAILS, PLAYLIST } from "../../../router/paths";
import { FaHeart, FaPlayCircle } from 'react-icons/fa';
import './HomeBox.css';
import './ArtistBox.css';
import './HomeBoxCard.css';
import { FILTER_TYPES } from "../../Search/filterTypes";
import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import { Audio } from "react-loader-spinner";
import dfltImage from '../../../assets/imgs/UnkownAlbum.jpg'


import { useFetchAllHomeTracks } from "../../../hooks";

const BoxCard = ({ obj, targetClass, type, isFirstRowSection, less_tracks, top_tracks }) => {
  const { playSong, addQueue, playerState, addList } = usePlayer();
  const [canPlay, setCanPlay] = useState(false);
  const [data, setData] = useState({});
  const { authState } = useAuth();

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
    } className={`${targetClass}__link`}>
      <div className={`${!isFirstRowSection ? `row__${targetClass}--item bg-zinc-900` : `row__${targetClass}--firstItem`}`}>
        <div className={`${targetClass}__img-container`}>
          {
            isTrack &&
            <div className="absolute w-full h-full flex items-center justify-center" onClick={handleSetTracks}>
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
            src={data.picture ? data.picture : dfltImage}
            alt={data.name}
            className={`${targetClass}__img-container--img object-cover w-20`}
            style={isArtist ? { borderRadius: "50%" } : {}}
            width=""
            height=""
          />
        </div>
        {
          !isFirstRowSection &&
          <div className={`${targetClass}__data ${isArtist && 'text-center'}`}>
            <p className={`truncate ${targetClass}__data--name`}>{data.name}</p>
          </div>
        }
        {/*
          (authState.isAuthenticated && isTrack) &&
          <div className={`${(isLike) ? "border-red-500" : "border-gray-400"} ${targetClass}__data--like`} onClick={() => toggleLike(type, data, isLike, setIsLike)}>
            <FaHeart className={(isLike) ? "text-red-500" : "text-gray-600"} />
          </div>
        */}
      </div>
    </NavLink>
  )
}

export default BoxCard