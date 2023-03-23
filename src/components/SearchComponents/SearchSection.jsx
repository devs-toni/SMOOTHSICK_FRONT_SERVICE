import { v4 as uuidv4 } from 'uuid';
import { SongCard } from '../CategoriesComponents/SongCard';
import Soundbox from '../HomeComponents/Soundbox';

const SearchSection = ({ name, list }) => {

  switch (name) {
    case "Playlists":
      list = list.map(playlist => {
        return {
          name: playlist.name,
          img: playlist.thumbnail,
          artist: ""
        }
      })
      break;
    case "Albums":
      list = list.map(album => {
        return {
          name: album.name,
          img: album.imageUrl,
          artist: album.artist
        }
      })
      break;
    case "Tracks":
      list = list.map(track => {
        return {
          name: track.name,
          img: track.thumbnail,
          artist: track.artist
        }
      })
      break;
    case "Users":
      list = list.map(user => {
        return {
          name: user.name,
          img: user.profilePicture,
          artist: ""
        }
      })
      break;
    case "Artists":
      list = list.map(artist => {
        return {
          name: artist.name,
          img: artist.photoUrl,
          artist: ""
        }
      })
      break;
  }

  return (
    <>
      <h1 className='text-2xl mt-10 mb-5 font-medium'>{name}</h1>
      <div className='grid grid-cols-7'>
        {
          list.length > 0 &&
          (
            list.map(({ name, img, artist }) => {
              return (
                <Soundbox
                  key={uuidv4()}
                  section="search"
                  image={img}
                  name={name}
                  artist={artist}
                />
              )
            })
          )
        }
      </div>
    </>
  )
}

export default SearchSection