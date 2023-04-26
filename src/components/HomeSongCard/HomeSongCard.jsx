import { useLayoutEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import { SECTIONS } from "../../context/types";
import { ALBUM, DETAILS } from "../../router/paths";
import { FaHeart } from 'react-icons/fa';
import { useAuthContext } from "../../context/AuthContext";
import './HomeSongCard.css';
import './HomeSongBox.css';

const HomeSongCard = ({ obj, targetClass, type }) => {
  const { id, name, artist, liked } = obj;
  const { playSong } = usePlayer();
  const { authState } = useAuthContext();

  const [image, setImage] = useState(null);
  const [canPlay, setCanPlay] = useState(false);

  useLayoutEffect(() => {
    if (type == SECTIONS.ARTIST) {
      setImage(obj.photoUrl)
    } else if (type == SECTIONS.TRACK) {
      setCanPlay(true);
      setImage(obj.thumbnail)
    } else if (type == SECTIONS.ALBUM) {
      setImage(obj.imageUrl)
    } else if (type == SECTIONS.PLAYLIST) {
      setImage(obj.thumbnail)
    }
  }, [])

  const isTrack = type === SECTIONS.TRACK ? true : false;
  const isArtist = type === SECTIONS.ARTIST ? true : false;

  return (
    <NavLink to={isTrack ? '' : `${DETAILS}${ALBUM}/${id}`} className="link">
      <div className={`row__${targetClass}--item bg-zinc-900 ` }>
        <div className={`${targetClass}__img-container`}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNZ_YAGEN8LMYjY_KC9mziJkg3b1z4WNnZDZrAIYv6bQ&s"
            alt={name}
            className={`${targetClass}__img-container--img object-cover`}
            style={isArtist ? { borderRadius: "50%" } : {}}
            width=""
            height=""
            onClick={isTrack ? () => playSong(obj.url) : () => { }}
          />
        </div>
        <div className={`${targetClass}__data ${isArtist && 'text-center'}`}>
          <p className={`${targetClass}__data--name`}>{name}</p>
          <p className={`${targetClass}__data--artist`}>{artist}</p>
        </div>
        {
          (targetClass === 'chart' && authState.isAuthenticated) &&
          <div className={`${liked ? "border-red-500" : "border-gray-400"} chart__data--like`}>
            <FaHeart className={liked ? "text-red-500" : "text-gray-600"} />
          </div>
        }
      </div>
    </NavLink>
  )
}

export default HomeSongCard