import axios from "axios";
import { useEffect, useState } from "react"

export const useFetchMoreHomeArtists = () => {

  const [moreArtists, setMoreArtists] = useState([]);
  const [moreArtistsLoaded, setMoreArtistsLoaded] = useState(false)
  const getAllArtists = () => {
    axios.get(import.meta.env.VITE_BACKEND + "artists/more")
      .then(({ data }) => {
        setMoreArtists(data);
        setMoreArtistsLoaded(true);
      })
  }
  useEffect(() => {
    getAllArtists();
  }, [])

  return { moreArtists, moreArtistsLoaded };

}