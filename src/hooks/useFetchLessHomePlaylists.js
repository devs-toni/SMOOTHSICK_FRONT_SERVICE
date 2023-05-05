import axios from "axios";
import { useEffect, useState } from "react"

export const useFetchLessHomePlaylists = () => {

  const [lessPlaylists, setLessPlaylists] = useState([]);
  const [lessPlaylistsLoaded, setLessPlaylistsLoaded] = useState(false)

  const getAllPlaylists = () => {
    axios.get(import.meta.env.VITE_BACKEND + "playlists/more")
      .then(({ data }) => {
        setLessPlaylists(data);
        setLessPlaylistsLoaded(true);
      })
  }
  useEffect(() => {
    getAllPlaylists();
  }, [])

  return { lessPlaylists, lessPlaylistsLoaded };

}