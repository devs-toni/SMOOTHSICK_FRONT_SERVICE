import axios from "axios";
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";

export const useFetchMyTracks = () => {

  const { authState } = useAuth();
  const [myTracks, setMyTracks] = useState([]);
  const [myTracksLoaded, setMyTracksLoaded] = useState(false)

  useEffect(() => {
    authState.token && getMyTracks();
  }, [authState.token])
  
  
  const getMyTracks = () => {
    axios.get(import.meta.env.VITE_BACKEND + "tracks/my", { headers: { "Authorization": authState.token } })
      .then(({ data }) => {
        setMyTracks(data);
        setMyTracksLoaded(true);
      })
  }

  return { myTracks, myTracksLoaded };

}