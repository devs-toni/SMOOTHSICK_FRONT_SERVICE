import { v4 as uuidv4 } from 'uuid';
import { FILTER_TYPES, OutputBox } from '../../index';

const SearchSection = ({ check, name, list }) => {

  switch (check) {
    case FILTER_TYPES.PLAYLISTS:
      list = list.map(playlist => {
        return {
          name: playlist.name,
          img: playlist.thumbnail,
          artist: ""
        }
      })
      break;
    case FILTER_TYPES.ALBUMS:
      list = list.map(album => {
        return {
          name: album.name,
          img: album.imageUrl,
          artist: album.artist
        }
      })
      break;
    case FILTER_TYPES.TRACKS:
      list = list.map(track => {
        return {
          name: track.name,
          img: track.thumbnail,
          artist: track.artist
        }
      })
      break;
    case FILTER_TYPES.USERS:
      list = list.map(user => {
        return {
          name: user.name,
          img: user.profilePicture,
          artist: ""
        }
      })
      break;
    case FILTER_TYPES.ARTISTS:
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
                <OutputBox
                  key={uuidv4()}
                  image={img}
                  name={name}
                  artist={artist}
                  targetClass="search"
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