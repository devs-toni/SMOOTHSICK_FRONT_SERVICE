import axios from "axios";
import { useEffect, useState } from "react"

export const useFetchAllAlbums = () => {

  const [albums, setAlbums] = useState([]);
  const [albumsLoaded, setAlbumsLoaded] = useState(false)

  const getAllAlbums = () => {
    axios.get(import.meta.env.VITE_BACKEND + "albums", {
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