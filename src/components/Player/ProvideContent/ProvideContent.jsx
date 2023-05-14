import { useEffect, useState } from 'react'
import { usePlayer } from '../../../context/PlayerContext';
import { useUser } from '../../../context/UserContext';

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
  const [searchQueue, setSearchQueue] = useState()


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
    }
    if (currentSongIndex !== 0) {
      setPrevTrack
        ({
          id: queue[currentSongIndex + 1]?.id,
          name: queue[currentSongIndex - 1]?.title,
          artist: queue[currentSongIndex - 1]?.artist_name,
          picture: queue[currentSongIndex - 1]?.album_cover,
          preview: queue[currentSongIndex - 1]?.preview,
        })

    }
    // SELECT THE CONTENT WHEN THE QUEUE REACHES THE END
    if (currentSongIndex + 1 === queue.length) {
      addQueue(myTracks)
      setSearchQueue({
        id: queue[currentSongIndex + 1]?.id,
        name: queue[currentSongIndex + 1]?.title,
        picture: queue[currentSongIndex + 1]?.album_cover,
        artist: queue[currentSongIndex + 1]?.artist_name,
        preview: queue[currentSongIndex + 1]?.preview,
      })
    }

  }, [currentSongIndex, queue.length])

  return { nextTrack, prevTrack, searchQueue }
}
