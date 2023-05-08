import { useLayoutEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import { ALBUM, ARTIST, DETAILS, PLAYLIST } from "../../router/paths";
import { FaHeart, FaPlayCircle } from 'react-icons/fa';
import './HomeSongCard.css';
import './ArtistSongCard.css';
import './HomeSongBox.css';
import { FILTER_TYPES } from "../Search/filterTypes";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const HomeSongCard = ({ obj, targetClass, type, isFirstRowSection }) => {

  const { playSong } = usePlayer();
  const [canPlay, setCanPlay] = useState(false);
  const [data, setData] = useState({});
  const { authState } = useAuth();
  const { getFavourites, removeFromFavourites } = useUser();
  const [isLike, setIsLike] = useState(false);

  useLayoutEffect(() => {
    if (type == FILTER_TYPES.ARTISTS) {
      setData({
        id: obj.id,
        name: obj.name,
        picture: obj.picture,
      })
    } else if (type == FILTER_TYPES.TRACKS) {
      setCanPlay(true);
      setIsLike(obj.likes.filter(ids => ids === authState.user.id).length > 0 ? true : false)
      setData({
        id: obj.id,
        name: obj.title,
        picture: obj.album_cover,
        artist: obj.title,
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
        artist: obj.description,
        picture: obj.picture
      })
    }
  }, [])

  const toggleLike = () => {
    axios.patch(import.meta.env.VITE_BACKEND + type.toLowerCase() + "/like/" + data.id, {}, {
      headers: {
        "Authorization": `${authState.token}`
      }
    }).then(() => {
      if (data.isLike) {
        setIsLike(false)
        removeFromFavourites(data.id)
      } else
        setIsLike(true)

    })
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
            <div className={`${targetClass}__img-container--play-container`} onClick={() => playSong(data.preview)}>
              <FaPlayCircle className={`${targetClass}__img-container--play-container-play`} />
            </div>
          }
          <img
            src={data.picture}
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
            <p className={`${targetClass}__data--name`}>{data.name}</p>
            <p className={`${targetClass}__data--artist`}>{data.artist}</p>
          </div>
        }
        {
          (authState.isAuthenticated && isTrack) &&
          <div className={`${(isLike) ? "border-red-500" : "border-gray-400"} ${targetClass}__data--like`} onClick={toggleLike}>
            <FaHeart className={(isLike) ? "text-red-500" : "text-gray-600"} />
          </div>
        }
      </div>
    </NavLink>
  )
}

export default HomeSongCard