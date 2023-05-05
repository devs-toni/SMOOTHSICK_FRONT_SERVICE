import axios from "axios";
import { useEffect, useState } from "react"

export const useFetchAllHomeAlbums = () => {

  const [albums, setAlbums] = useState([]);
  const [albumsLoaded, setAlbumsLoaded] = useState(false)

  const getAllAlbums = () => {
    axios.get(import.meta.env.VITE_BACKEND + "albums/home", {
      headers: { Authorization: localStorage.getItem("userToken") }
    })
      .then(({ data }) => {
        setAlbums(data);
        setAlbumsLoaded(true);
      })
  }
  useEffect(() => {
    getAllAlbums();
  }, [])

  return { albums, albumsLoaded };

}