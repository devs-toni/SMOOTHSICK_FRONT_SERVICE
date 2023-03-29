import AudioPlayer from 'react-h5-audio-player';
import { usePlayer } from '../context/PlayerContext';

const Player = () => {

  const { playerState } = usePlayer();

  return (
    <div className='pt-10'>
      <AudioPlayer
        autoPlay
        src={playerState.current}
        onPlay={e => console.log(playerState.current)}
      />
    </div>
  )
}

export default Player;