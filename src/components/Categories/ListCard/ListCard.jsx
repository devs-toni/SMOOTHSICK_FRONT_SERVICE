import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES, PLAYLIST } from '../../../router/paths'
import { useUser } from '../../../context/UserContext'
import dfltImage from '../../../assets/imgs/UnkownAlbum.jpg';
import axios from 'axios';

const ListCard = ({ id, title }) => {
  const { userState, checktUserPlaylistsTracks } = useUser();
  const { userPlaylist } = userState;
  const [img, setImg] = useState("");

  const getPlaylistImage = async () => {
    axios.get(import.meta.env.VITE_BACKEND + "playlists/image/" + id)
      .then(({ data }) => {
        setImg(data);
      }).catch(err => console.error(err))
  }

  useEffect(() => {
    getPlaylistImage();
  }, [id])


  return (
    <Link to={`${CATEGORIES}${PLAYLIST}/${id}`}
      className="w-24 h-24 md:w-36 md:h-36 lg:h-60 lg:w-60 text-xs md:text-lg truncate rounded-lg flex flex-row items-center justify-center"
    >
      <img src={img.length > 0 ? img : dfltImage} alt="" width="" height="" />
      <span>{title}</span>
    </Link>
  )
}

export default ListCard