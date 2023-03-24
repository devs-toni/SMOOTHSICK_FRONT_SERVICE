import AudioPlayer from 'react-h5-audio-player';

const Player = () => {

  return (
    <div>
      <AudioPlayer
        //autoPlay
        src="https://res.cloudinary.com/dmkdsujzh/video/upload/v1644587219/tracks-dev/Lessky_-_Un_Ratito_Nama__Prod__Duran_The_Coach__npuws5.mp3"
        onPlay={e => console.log('onPlay')}
      />
    </div>
  )
}

export default Player;