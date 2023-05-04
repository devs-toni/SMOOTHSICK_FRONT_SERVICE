import axios from "axios";
import { useEffect, useState } from "react"

export const useFetchLessHomeAlbums = () => {

  const [lessAlbums, setLessAlbums] = useState([]);
  const [lessAlbumsLoaded, setLessAlbumsLoaded] = useState(false)

  const getAllAlbums = () => {
    axios.get(import.meta.env.VITE_BACKEND + "albums/more")
      .then(({ data }) => {
        setLessAlbums(data);
        setLessAlbumsLoaded(true);
      })
  }
  useEffect(() => {
    getAllAlbums();
  }, [])

  return { lessAlbums, lessAlbumsLoaded };

}