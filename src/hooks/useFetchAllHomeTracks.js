import axios from "axios";
import { useEffect, useState } from "react"
import { usePlayer } from "../context/PlayerContext";

export const useFetchAllHomeTracks = () => {

  const [tracks, setTracks] = useState([]);
  const [tracksLoaded, setTracksLoaded] = useState(false)

  const getAllTracks = () => {
    axios.get(import.meta.env.VITE_BACKEND + "tracks/home")
      .then(({ data }) => {
        setTracks(data);
        setTracksLoaded(true);
      })
  }

  useEffect(() => {
    getAllTracks();
  }, [])

  return { tracks, tracksLoaded };

}