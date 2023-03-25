import { v4 as uuidv4 } from 'uuid';
import { Searchbox } from '../../index';

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
      <h1 className='search__title'>{name}</h1>
      <div className='search__section'>
        {
          list.length > 0 &&
          (
            list.map(({ name, img, artist }) => {
              return (
                <Searchbox
                  key={uuidv4()}

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