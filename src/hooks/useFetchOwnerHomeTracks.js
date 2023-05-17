import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchOwnerHomeTracks = () => {

  const [ownerTracks, setOwnerTracks] = useState([]);
  const [ownerTracksLoaded, setOwnerTracksLoaded] = useState(false)

  const getAllOwnerTracks = () => {
    axios.get(import.meta.env.VITE_BACKEND + "tracks/owner")
      .then(({ data }) => {
        setOwnerTracks(data);
        setOwnerTracksLoaded(true);
      })
  }

  useEffect(() => {
    getAllOwnerTracks();
  }, [])

  return { ownerTracks, ownerTracksLoaded };

}