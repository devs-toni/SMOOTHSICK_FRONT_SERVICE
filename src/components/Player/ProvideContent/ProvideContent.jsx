import { useEffect, useState } from 'react'
import { usePlayer } from '../../../context/PlayerContext';
import { useUser } from '../../../context/UserContext';
import unknown from '../../../assets/imgs/UnkownAlbum.jpg';

export const ProvideContent = () => {
  const { playerState, addQueue } = usePlayer();
  const { current } = playerState
  const { queue } = playerState
  const { userState } = useUser();
  const { myTracks } = userState


  const track = queue.find((e) => e.preview === current.preview);
  const currentSongIndex = queue.indexOf(track)
  const [nextTrack, setNexTrack] = useState()
  const [prevTrack, setPrevTrack] = useState()

  useEffect(() => {
    if (currentSongIndex + 1 !== queue.length) {
      setNexTrack
        ({
          id: queue[currentSongIndex + 1]?.id,
          name: queue[currentSongIndex + 1]?.title,
          artist: queue[currentSongIndex + 1]?.artist_name,
          picture: queue[currentSongIndex + 1]?.album_cover,
          preview: queue[currentSongIndex + 1]?.preview
        })
    } else {
      setNexTrack
        ({
          id: queue[0]?.id,
          name: queue[0]?.title,
          artist: queue[0]?.artist_name,
          picture: queue[0]?.album_cover,
          preview: queue[0]?.preview
        })
    }


    if (currentSongIndex !== 0) {
      setPrevTrack
        ({
          id: queue[currentSongIndex - 1]?.id,
          name: queue[currentSongIndex - 1]?.title,
          artist: queue[currentSongIndex - 1]?.artist_name,
          picture: queue[currentSongIndex - 1]?.album_cover,
          preview: queue[currentSongIndex - 1]?.preview,
        })


    } else {
      setPrevTrack
        ({
          id: queue[queue.length - 1]?.id,
          name: queue[queue.length - 1]?.title,
          artist: queue[queue.length - 1]?.artist_name,
          picture: queue[queue.length - 1]?.album_cover,
          preview: queue[queue.length - 1]?.preview,
        })
    }
  }, [currentSongIndex, queue.length])


  return { nextTrack, prevTrack }
}
