import axios from "axios";
import { useEffect, useState } from "react"

export const useFetchLessHomeTracks = () => {

  const [lessTracks, setLessTracks] = useState([]);
  const [lessTracksLoaded, setLessTracksLoaded] = useState(false)

  const getAllTracks = () => {
    axios.get(import.meta.env.VITE_BACKEND + "tracks/more")
      .then(({ data }) => {
        setLessTracks(data);
        setLessTracksLoaded(true);
      })
  }
  useEffect(() => {
    getAllTracks();
  }, [])

  return { lessTracks, lessTracksLoaded };

}