import AudioPlayer from 'react-h5-audio-player';

const Player = () => {

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <AudioPlayer
        src=""
        onPlay={e => console.log('onPlay')}
      />
    </div>
  )
}

export default Player